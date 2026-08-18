import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

import {
  Profile,
  Education,
  ExperiencePro,
  ExperienceBenevole,
  Project,
  Skill,
  Certificate,
  Testimonial,
  ContactMessage,
} from "./src/types";

// Database Connection Manager - MYSQL ONLY (No local fallback)
let pool: mysql.Pool | null = null;
let isUsingMySQL = false;
let dbStatusMessage = "Non initialisâ”œÂ®";
let initializationAttempted = false;

// Export for API status endpoint
export function getDBStatus() {
  return { isUsingMySQL, message: dbStatusMessage };
}

/**
 * Lazy initialization: ensures MySQL pool and env are configured.
 * Safe to call multiple times; only initializes once.
 */
async function ensureInitialized(): Promise<void> {
  if (initializationAttempted) {
    if (!pool || !isUsingMySQL) {
      throw new Error("Ã”Ã˜Ã® MySQL pool is not available. Check your environment variables.");
    }
    return;
  }
  initializationAttempted = true;

  // Gracefully load .env file (might not exist on Vercel)
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
    }
  } catch (err) {
    console.warn("Ã”ÃœÃ¡Â´Â©Ã… Could not load .env file (expected on Vercel):", err);
  }

  // Cleanup: Remove legacy local database file
  try {
    const LOCAL_DB_PATH = path.join(process.cwd(), "db_local.json");
    if (fs.existsSync(LOCAL_DB_PATH)) {
      fs.unlinkSync(LOCAL_DB_PATH);
      console.log("  Removed legacy db_local.json (MySQL only mode enabled)");
    }
  } catch (err) {
    console.warn("  Could not remove db_local.json:", err);
  }

  // Read credentials from environment (Vercel env vars or .env)
  const mysqlHost = process.env.MYSQL_HOST;
  const mysqlUser = process.env.MYSQL_USER;
  const mysqlPassword = process.env.MYSQL_PASSWORD || "";
  const mysqlDatabase = process.env.MYSQL_DATABASE;
  const mysqlPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

  if (!mysqlHost || !mysqlUser || !mysqlDatabase) {
    const msg = "Ã”Ã˜Ã® MySQL credentials are REQUIRED. Set MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE in your environment.";
    console.error(msg);
    dbStatusMessage = msg;
    throw new Error(msg);
  }

  const mysqlMaxAllowedPacket = process.env.MYSQL_MAX_ALLOWED_PACKET
    ? parseInt(process.env.MYSQL_MAX_ALLOWED_PACKET, 10)
    : 64 * 1024 * 1024;
  let mysqlPacketConfigSupported = true;

  async function configureMySQLPacketSize() {
    if (!pool) return;

    const logCurrentValue = async (label: string) => {
      try {
        const [rows] = await pool!.query(`SHOW ${label} VARIABLES LIKE 'max_allowed_packet'`);
        const result = (rows as any[])[0];
        if (result) {
          console.log(`Ã”Ã¤â•£Â´Â©Ã… MySQL ${label} max_allowed_packet: ${result.Value}`);
        }
      } catch (err: any) {
        console.warn(`Ã”ÃœÃ¡Â´Â©Ã… Unable to read MySQL ${label} max_allowed_packet:`, err.message || err);
      }
    };

    await logCurrentValue("GLOBAL");
    await logCurrentValue("SESSION");

    try {
      await pool.query(`SET SESSION max_allowed_packet = ${mysqlMaxAllowedPacket}`);
      if (process.env.MYSQL_SET_GLOBAL_MAX_ALLOWED_PACKET === "true") {
        try {
          await pool.query(`SET GLOBAL max_allowed_packet = ${mysqlMaxAllowedPacket}`);
        } catch (innerErr: any) {
          console.warn("Ã”ÃœÃ¡Â´Â©Ã… Unable to set GLOBAL max_allowed_packet; insufficient privileges.", innerErr.message || innerErr);
        }
      }

      await logCurrentValue("GLOBAL");
      await logCurrentValue("SESSION");
      console.log(`Ã”Â£Ã  MySQL max_allowed_packet configuration applied (session request ${mysqlMaxAllowedPacket})`);
    } catch (err: any) {
      const message = err.message || err;
      if (String(message).includes("read-only")) {
        mysqlPacketConfigSupported = false;
        console.warn("Ã”ÃœÃ¡Â´Â©Ã… MySQL session max_allowed_packet is read-only on this server. Skipping per-connection session configuration.", message);
      } else {
        console.warn("Ã”ÃœÃ¡Â´Â©Ã… Could not set MySQL max_allowed_packet:", message);
      }
    }
  }

  try {
    pool = mysql.createPool({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase,
      port: mysqlPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    pool.on("connection", (connection: mysql.PoolConnection) => {
      if (!mysqlPacketConfigSupported) {
        return;
      }

      connection.query(
        `SET SESSION max_allowed_packet = ${mysqlMaxAllowedPacket}`,
        (err: any) => {
          if (err) {
            console.warn("Ã”ÃœÃ¡Â´Â©Ã… Unable to set session max_allowed_packet on new connection:", err.message || err);
            mysqlPacketConfigSupported = false;
          }
        }
      );
    });

    isUsingMySQL = true;
    dbStatusMessage = `Connectâ”œÂ® â”œÃ¡ MySQL (${mysqlHost}:${mysqlPort}, bd: ${mysqlDatabase})`;
    console.log("Ã”Â£Ã  MySQL pool initialized successfully");
  } catch (err: any) {
    console.error("Ã”Ã˜Ã® CRITICAL: Failed to initialize MySQL pool:", err);
    dbStatusMessage = `â”œÃ«chec de connexion MySQL: ${err.message}`;
    throw new Error(`MySQL connection failed: ${err.message}`);
  }
}

// Set up MySQL schema tables (REQUIRED)
export async function initializeDatabase() {
  await ensureInitialized();
  if (!pool || !isUsingMySQL) {
    throw new Error("Ã”Ã˜Ã® MySQL pool is not initialized. Cannot proceed.");
  }

  try {
    // configureMySQLPacketSize is already called within ensureInitialized
    console.log("Â­Æ’Ã´Ã¯ Creating/verifying MySQL database tables...");

    // Helper to add missing columns without relying on MySQL 8+ syntax
    async function ensureProfileColumn(columnName: string, definition: string) {
      const [existingColumns] = await pool!.query(
        `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [process.env.MYSQL_DATABASE, "portfolio_profile", columnName]
      ) as any[];
      if (existingColumns.length === 0) {
        await pool!.query(`ALTER TABLE portfolio_profile ADD COLUMN ${columnName} ${definition};`);
      }
    }

    // Create Profile Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_profile (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        bio TEXT,
        photoUrl LONGTEXT,
        cvUrl LONGTEXT,
        email VARCHAR(255),
        phone VARCHAR(255),
        location VARCHAR(255),
        status VARCHAR(255),
        github VARCHAR(255),
        linkedin VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure schema can store full profile PDFs and the status field for older installs
    await ensureProfileColumn("photoUrl", "LONGTEXT NULL");
    await ensureProfileColumn("cvUrl", "LONGTEXT NULL");
    await ensureProfileColumn("status", "VARCHAR(255) DEFAULT NULL");
    await pool.query(`ALTER TABLE portfolio_profile MODIFY COLUMN photoUrl LONGTEXT NULL;`);
    await pool.query(`ALTER TABLE portfolio_profile MODIFY COLUMN cvUrl LONGTEXT NULL;`);

    // Create Education Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_education (
        id VARCHAR(50) PRIMARY KEY,
        school VARCHAR(255) NOT NULL,
        degree VARCHAR(255),
        period VARCHAR(100),
        location VARCHAR(255),
        description TEXT,
        grade VARCHAR(255),
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Experience Pro Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_experience_pro (
        id VARCHAR(50) PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        period VARCHAR(100),
        location VARCHAR(255),
        description TEXT,
        logoUrl LONGTEXT,
        tags TEXT,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Experience Benevole Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_experience_benevole (
        id VARCHAR(50) PRIMARY KEY,
        organization VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        period VARCHAR(100),
        location VARCHAR(255),
        description TEXT,
        tags TEXT,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Projects Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        longDescription TEXT,
        imageUrl LONGTEXT,
        imageUrls LONGTEXT,
        githubUrl VARCHAR(255),
        demoUrl VARCHAR(255),
        tags TEXT,
        challenges TEXT,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Skills Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_skills (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        level INT DEFAULT 0,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Certificates Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_certificates (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        issuer VARCHAR(255),
        issueDate VARCHAR(100),
        credentialUrl VARCHAR(255),
        imageUrl LONGTEXT,
        impactProfessionnel LONGTEXT,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Testimonials Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_testimonials (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        company VARCHAR(255),
        feedback TEXT,
        rating INT DEFAULT 5,
        avatarUrl LONGTEXT,
        visible TINYINT(1) DEFAULT 1,
        \`order\` INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create Messages Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_messages (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        date VARCHAR(100),
        \`read\` TINYINT(1) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'new'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Add missing 'order' columns to existing tables for migration
    const tablesToAddOrder = [
      'portfolio_education',
      'portfolio_experience_pro',
      'portfolio_experience_benevole',
      'portfolio_projects',
      'portfolio_skills',
      'portfolio_certificates',
      'portfolio_testimonials'
    ];

    for (const tableName of tablesToAddOrder) {
      try {
        const [columns] = await pool.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = 'order'`,
          [process.env.MYSQL_DATABASE, tableName]
        ) as any[];
        
        if (columns.length === 0) {
          await pool.query(`ALTER TABLE ${tableName} ADD COLUMN \`order\` INT DEFAULT 0`);
        }
      } catch (err: any) {
        // Column might already exist, continue
      }
    }
    try {
      const [certColumns] = await pool.query(
        `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'portfolio_certificates' AND COLUMN_NAME = 'impactProfessionnel'`,
        [process.env.MYSQL_DATABASE]
      ) as any[];
      if (certColumns.length === 0) {
        await pool.query(`ALTER TABLE portfolio_certificates ADD COLUMN impactProfessionnel LONGTEXT`);
      }
    } catch (err: any) {
      // Column might already exist, continue
    }
    console.log("All MySQL tables checked/created successfully.");
    console.log("Database schema ready. No automatic seeding performed - please populate via admin dashboard.");
  } catch (err: any) {
    console.error("Ã”Ã˜Ã® Failed to initialize MySQL schema tables:", err);
    throw new Error(`Database initialization failed: ${err.message}`);
  }
}

// EXPORTED DATA CONTROLLER - MySQL ONLY
export async function getPortfolioData() {
  await ensureInitialized();
  if (!pool || !isUsingMySQL) {
    throw new Error("Ã”Ã˜Ã® MySQL pool is not available");
  }

  try {
    // 1. Profile
    const [profiles] = await pool.query("SELECT * FROM portfolio_profile LIMIT 1") as any[];
    const profile: Profile = profiles[0] ? {
      name: profiles[0].name,
      title: profiles[0].title,
      bio: profiles[0].bio,
      photoUrl: profiles[0].photoUrl,
      cvUrl: profiles[0].cvUrl,
      email: profiles[0].email,
      phone: profiles[0].phone,
      location: profiles[0].location,
      status: profiles[0].status || "",
      linkedin: profiles[0].linkedin,
      github: profiles[0].github,
    } : {
      name: "Portfolio",
      title: "",
      bio: "",
      photoUrl: "",
      cvUrl: "",
      email: "",
      phone: "",
      location: "",
      status: "",
      linkedin: "",
      github: "",
    };

    // 2. Education
    const [eduRows] = await pool.query("SELECT * FROM portfolio_education ORDER BY `order` ASC") as any[];
    const educationList: Education[] = eduRows.map((r: any) => ({
      id: r.id,
      school: r.school,
      degree: r.degree,
      period: r.period,
      location: r.location,
      description: r.description,
      grade: r.grade || undefined,
      visible: Boolean(r.visible),
      order: r.order || 0,
    }));

    // 3. Experience Pro
    const [expProRows] = await pool.query("SELECT * FROM portfolio_experience_pro ORDER BY `order` ASC") as any[];
    const experienceProList: ExperiencePro[] = expProRows.map((r: any) => {
      let tags: string[] = [];
      try {
        tags = JSON.parse(r.tags || "[]");
      } catch {
        tags = r.tags ? r.tags.split(",").map((t: string) => t.trim()) : [];
      }
      return {
        id: r.id,
        company: r.company,
        role: r.role,
        period: r.period,
        location: r.location,
        description: r.description,
        logoUrl: r.logoUrl || undefined,
        tags,
        visible: Boolean(r.visible),
        order: r.order || 0,
      };
    });

    // 4. Experience Benevole
    const [expBeneRows] = await pool.query("SELECT * FROM portfolio_experience_benevole ORDER BY `order` ASC") as any[];
    const experienceBenevoleList: ExperienceBenevole[] = expBeneRows.map((r: any) => {
      let tags: string[] = [];
      try {
        tags = JSON.parse(r.tags || "[]");
      } catch {
        tags = r.tags ? r.tags.split(",").map((t: string) => t.trim()) : [];
      }
      return {
        id: r.id,
        organization: r.organization,
        role: r.role,
        period: r.period,
        location: r.location || undefined,
        description: r.description,
        tags,
        visible: Boolean(r.visible),
        order: r.order || 0,
      };
    });

    // 5. Projects
    const [projRows] = await pool.query("SELECT * FROM portfolio_projects ORDER BY `order` ASC") as any[];
    const projectList: Project[] = projRows.map((r: any) => {
      let tags: string[] = [];
      let imageUrls: string[] = [];
      try {
        tags = JSON.parse(r.tags || "[]");
      } catch {
        tags = r.tags ? r.tags.split(",").map((t: string) => t.trim()) : [];
      }
      try {
        imageUrls = JSON.parse(r.imageUrls || "[]");
      } catch {
        imageUrls = r.imageUrls ? r.imageUrls.split(",").map((t: string) => t.trim()) : [];
      }
      return {
        id: r.id,
        title: r.title,
        description: r.description,
        longDescription: r.longDescription,
        imageUrl: r.imageUrl,
        imageUrls,
        githubUrl: r.githubUrl,
        demoUrl: r.demoUrl,
        tags,
        challenges: r.challenges,
        visible: Boolean(r.visible),
        order: r.order || 0,
      };
    });

    // 6. Skills
    const [skillRows] = await pool.query("SELECT * FROM portfolio_skills ORDER BY `order` ASC") as any[];
    const skillList: Skill[] = skillRows.map((r: any) => ({
      id: r.id,
      name: r.name,
      category: r.category as any,
      level: r.level,
      visible: Boolean(r.visible),
      order: r.order || 0,
    }));

    // 7. Certificates
    const [certRows] = await pool.query("SELECT * FROM portfolio_certificates ORDER BY `order` ASC") as any[];
    const certificateList: Certificate[] = certRows.map((r: any) => ({
      id: r.id,
      name: r.name,
      issuer: r.issuer,
      issueDate: r.issueDate,
      credentialUrl: r.credentialUrl,
      imageUrl: r.imageUrl,
      impactProfessionnel: r.impactProfessionnel || "",
      visible: Boolean(r.visible),
      order: r.order || 0,
    }));

    // 8. Testimonials
    const [testRows] = await pool.query("SELECT * FROM portfolio_testimonials ORDER BY `order` ASC") as any[];
    const testimonialList: Testimonial[] = testRows.map((r: any) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      company: r.company,
      feedback: r.feedback,
      rating: r.rating || 5,
      avatarUrl: r.avatarUrl,
      visible: Boolean(r.visible),
      order: r.order || 0,
    }));

    return {
      status: dbStatusMessage,
      isMySQL: true,
      profile,
      educationList,
      experienceProList,
      experienceBenevoleList,
      projectList,
      skillList,
      certificateList,
      testimonialList,
    };
  } catch (err: any) {
    console.error("Ã”Ã˜Ã® Failed to read from MySQL database:", err);
    throw new Error(`Database read error: ${err.message}`);
  }
}

export async function savePortfolioData(dataset: {
  profile?: Profile;
  educationList?: Education[];
  experienceProList?: ExperiencePro[];
  experienceBenevoleList?: ExperienceBenevole[];
  projectList?: Project[];
  skillList?: Skill[];
  certificateList?: Certificate[];
  testimonialList?: Testimonial[];
}) {
  await ensureInitialized();
  if (!pool || !isUsingMySQL) {
    throw new Error("Ã”Ã˜Ã® MySQL pool is not available");
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Profile Save
    if (dataset.profile) {
      const p = dataset.profile;
      await connection.query(
        `INSERT INTO portfolio_profile (id, name, title, bio, photoUrl, cvUrl, email, phone, location, status, github, linkedin)
         VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         name = VALUES(name), title = VALUES(title), bio = VALUES(bio), photoUrl = VALUES(photoUrl),
         cvUrl = VALUES(cvUrl), email = VALUES(email), phone = VALUES(phone), location = VALUES(location),
         status = VALUES(status), github = VALUES(github), linkedin = VALUES(linkedin)`,
        [p.name, p.title, p.bio, p.photoUrl, p.cvUrl, p.email, p.phone, p.location, p.status || null, p.github, p.linkedin]
      );
    }

    // 2. Education Save (Replace entire list or sync dynamically)
    if (dataset.educationList) {
      await connection.query("DELETE FROM portfolio_education");
      for (const edu of dataset.educationList) {
        await connection.query(
          `INSERT INTO portfolio_education (id, school, degree, period, location, description, grade, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [edu.id, edu.school, edu.degree, edu.period, edu.location, edu.description, edu.grade || null, edu.visible ? 1 : 0, edu.order || 0]
        );
      }
    }

    // 3. Experience Pro Save
    if (dataset.experienceProList) {
      await connection.query("DELETE FROM portfolio_experience_pro");
      for (const exp of dataset.experienceProList) {
        await connection.query(
          `INSERT INTO portfolio_experience_pro (id, company, role, period, location, description, logoUrl, tags, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [exp.id, exp.company, exp.role, exp.period, exp.location, exp.description, exp.logoUrl || null, JSON.stringify(exp.tags), exp.visible ? 1 : 0, exp.order || 0]
        );
      }
    }

    // 4. Experience Benevole Save
    if (dataset.experienceBenevoleList) {
      await connection.query("DELETE FROM portfolio_experience_benevole");
      for (const bene of dataset.experienceBenevoleList) {
        await connection.query(
          `INSERT INTO portfolio_experience_benevole (id, organization, role, period, location, description, tags, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [bene.id, bene.organization, bene.role, bene.period, bene.location || null, bene.description, JSON.stringify(bene.tags), bene.visible ? 1 : 0, bene.order || 0]
        );
      }
    }

    // 5. Projects Save
    if (dataset.projectList) {
      await connection.query("DELETE FROM portfolio_projects");
      for (const proj of dataset.projectList) {
        await connection.query(
          `INSERT INTO portfolio_projects (id, title, description, longDescription, imageUrl, imageUrls, githubUrl, demoUrl, tags, challenges, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            proj.id,
            proj.title,
            proj.description,
            proj.longDescription,
            proj.imageUrl,
            JSON.stringify(proj.imageUrls || []),
            proj.githubUrl,
            proj.demoUrl,
            JSON.stringify(proj.tags),
            proj.challenges,
            proj.visible ? 1 : 0,
            proj.order || 0
          ]
        );
      }
    }

    // 6. Skills Save
    if (dataset.skillList) {
      await connection.query("DELETE FROM portfolio_skills");
      for (const sk of dataset.skillList) {
        await connection.query(
          `INSERT INTO portfolio_skills (id, name, category, level, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sk.id, sk.name, sk.category, sk.level, sk.visible ? 1 : 0, sk.order || 0]
        );
      }
    }

    // 7. Certificates Save
    if (dataset.certificateList) {
      await connection.query("DELETE FROM portfolio_certificates");
      for (const cert of dataset.certificateList) {
        await connection.query(
          "INSERT INTO portfolio_certificates (id, name, issuer, issueDate, credentialUrl, imageUrl, impactProfessionnel, visible, `order`)"
          + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            cert.id,
            cert.name,
            cert.issuer,
            cert.issueDate,
            cert.credentialUrl,
            cert.imageUrl,
            cert.impactProfessionnel || "",
            cert.visible ? 1 : 0,
            cert.order || 0,
          ]
        );
      }
    }

    // 8. Testimonials Save
    if (dataset.testimonialList) {
      await connection.query("DELETE FROM portfolio_testimonials");
      for (const test of dataset.testimonialList) {
        await connection.query(
          `INSERT INTO portfolio_testimonials (id, name, role, company, feedback, rating, avatarUrl, visible, \`order\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [test.id, test.name, test.role, test.company, test.feedback, test.rating, test.avatarUrl, test.visible ? 1 : 0, test.order || 0]
        );
      }
    }

    await connection.commit();
    console.log("Ã”Â£Ã  Data saved to MySQL database successfully");
    return { success: true, savedTo: "mysql", status: dbStatusMessage };
  } catch (err: any) {
    await connection.rollback();
    console.error("Ã”Ã˜Ã® Failed to save to MySQL database:", err);
    throw new Error(`Database save error: ${err.message}`);
  } finally {
    connection.release();
  }
}

// MESSAGES API CONTROLLERS - MySQL ONLY
export async function getContactMessages() {
  await ensureInitialized();
  if (!pool || !isUsingMySQL) {
    throw new Error("Ã”Ã˜Ã® MySQL pool is not available");
  }

  try {
    const [rows] = await pool.query("SELECT * FROM portfolio_messages ORDER BY date DESC") as any[];
    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      message: r.message,
      date: r.date,
      read: Boolean(r.read),
      status: r.status as any,
    }));
  } catch (err) {
    console.error("Ã”Ã˜Ã® Failed to fetch messages from MySQL:", err);
    throw new Error(`Failed to fetch messages: ${err}`);
  }
}

export async function saveContactMessages(messages: ContactMessage[]) {
  await ensureInitialized();
  if (!pool || !isUsingMySQL) {
    throw new Error("Ã”Ã˜Ã® MySQL pool is not available");
  }

  try {
    await pool.query("DELETE FROM portfolio_messages");
    for (const msg of messages) {
      await pool.query(
        `INSERT INTO portfolio_messages (id, name, email, subject, message, date, \`read\`, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [msg.id, msg.name, msg.email, msg.subject, msg.message, msg.date, msg.read ? 1 : 0, msg.status]
      );
    }
    console.log("Ã”Â£Ã  Messages saved to MySQL");
    return { success: true };
  } catch (err: any) {
    console.error("Ã”Ã˜Ã® Failed to save messages to MySQL:", err);
    throw new Error(`Failed to save messages: ${err}`);
  }
}
