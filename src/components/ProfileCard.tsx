import React from "react";
import { motion } from "motion/react";
import { Github, Zap, Cpu } from "lucide-react";

interface Props {
  name?: string;
  photoUrl?: string;
}

export default function ProfileCard({ name = "Harakat", photoUrl }: Props) {
  return (
    <motion.div
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="profile-card relative w-80 h-96 flex flex-col items-center justify-start"
    >
      {/* Transparent layout: no blobs, rings or frames so the photo blends into the page */}

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start bg-transparent">
        <div className="mt-2 flex items-start justify-center w-full overflow-visible">
          <div className="profile-photo-wrapper">
            <img
              src={photoUrl || "/assets/default-avatar.jpg"}
              alt={name}
              className="profile-photo"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mt-3 text-center w-full">
          <div className="text-2xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">{name}</div>
          <div className="text-xs font-mono mt-1 text-indigo-600 dark:text-indigo-400">CS Student • Full Stack</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <a className="icon-chip" title="Projects">
            <Cpu className="w-4 h-4" />
          </a>
          <a className="icon-chip" title="Hacks">
            <Zap className="w-4 h-4" />
          </a>
          <a className="icon-chip" title="GitHub">
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
