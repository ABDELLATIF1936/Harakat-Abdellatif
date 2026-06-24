import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, User, Bot, CornerDownLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant IA d'Alexandre. Je connais tout son parcours académique, ses projets (NeuroInsight, ArchiVault, EcoDeploy), ses certifications (AWS, GCP) et ses expériences chez Criteo. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Quel est le parcours d'Alexandre ?",
    "Quels sont ses projets principaux ?",
    "Quelles sont ses compétences ?",
    "Comment le contacter ?",
  ];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setHasError(false);

    try {
      // Build session history for the API call
      const historyPayload = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!res.ok) {
        throw new Error("Impossible d'obtenir une réponse du serveur.");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div id="ai-chat-assistant-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="pointer-events-auto mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[520px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header with deep charcoal background and gold border */}
            <div className="bg-slate-900 dark:bg-slate-950 p-4 shrink-0 flex items-center justify-between border-b border-indigo-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 dark:border-slate-950 rounded-full" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm sm:text-base leading-tight">
                    Assistant Virtuel IA
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider text-indigo-400/90 leading-none mt-0.5 uppercase">
                    Double numérique d'Alexandre
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 dark:hover:bg-slate-800/80 text-slate-400 hover:text-white transition cursor-pointer"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body with matching subtle gold shadows and offsets */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/40 scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${
                    m.role === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs border ${
                      m.role === "user"
                        ? "bg-slate-900 dark:bg-slate-800 text-indigo-400 border-indigo-500/25"
                        : "bg-white dark:bg-slate-850 text-slate-705 dark:text-slate-350 border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-indigo-600 text-white dark:bg-indigo-700/95 rounded-tr-none border border-indigo-500/30 shadow-sm"
                          : "bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-150/60 dark:border-slate-800/80 rounded-tl-none shadow-xs"
                      }`}
                    >
                      {m.content}
                    </div>
                    <span className="block text-[10px] font-mono text-slate-400 dark:text-slate-500 text-right px-1">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-100 dark:border-slate-800">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-800/80 p-3.5 px-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {hasError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/15 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs text-center space-y-2">
                  <p>Une erreur s'est produite lors de la génération de la réponse.</p>
                  <button
                    onClick={() => {
                      if (messages.length > 1) {
                        const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
                        if (lastUserMsg) {
                          setMessages(prev => prev.filter(m => m.id !== lastUserMsg.id));
                          handleSendMessage(lastUserMsg.content);
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-rose-50 hover:dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 font-semibold cursor-pointer transition active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Réessayer
                  </button>
                </div>
              )}

              {/* Suggestions with refined gold-hover transitions */}
              {messages.length === 1 && !isLoading && !hasError && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    Questions suggérées :
                  </p>
                  <div className="flex flex-col gap-1.5 items-start">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-left py-2 px-3.5 rounded-xl bg-white hover:bg-indigo-50/50 dark:bg-slate-850 hover:dark:bg-indigo-950/20 text-xs font-semibold text-slate-700 hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-400 border border-slate-200/60 hover:border-indigo-300/60 dark:border-slate-800/80 dark:hover:border-indigo-850/40 transition shadow-sm cursor-pointer w-full"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Form footer */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <div className="relative flex items-center">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Posez une question à l'assistant..."
                  rows={1}
                  className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-850 focus:bg-white focus:dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 focus:border-indigo-500 focus:dark:border-indigo-500 rounded-2xl text-sm focus:outline-none dark:text-white resize-none max-h-24 scrollbar-none transition-all pr-12 shadow-inner"
                  style={{ minHeight: "44px" }}
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className={`absolute right-2 p-2 rounded-xl transition cursor-pointer ${
                    inputValue.trim() && !isLoading
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  }`}
                  title="Envoyer le message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between px-1.5 pt-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                <span>Propulsé par Gemini 3.5 Flash</span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  Entrée pour envoyer
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing floating launcher button utilizing exact primary theme colors */}
      <motion.button
        id="ai-chat-assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-14 w-14 rounded-full bg-slate-900 hover:bg-slate-850 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-indigo-400 dark:text-slate-950 shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center transition cursor-pointer hover:scale-110 active:scale-95 border-2 border-indigo-500/30 dark:border-indigo-500/50"
        title="Ouvrir le chat interactif"
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-duration-1000"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
