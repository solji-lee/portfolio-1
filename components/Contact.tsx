import React, { useState } from 'react';
import { Mail, Linkedin, Phone, BookOpen, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [copied, setCopied] = useState<'phone' | 'email' | null>(null);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer id="contact" className="bg-[#0f172a] py-20 print:hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Let's Build Together</h3>
          <p className="text-slate-400 text-sm">Designing Intelligence, Automating Workflows.</p>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => setShowCard(true)}
            className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white"
          >
            <Phone size={20} />
          </button>
          <button
            onClick={() => setShowCard(true)}
            className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white"
          >
            <Mail size={20} />
          </button>
          <a href="https://www.linkedin.com/in/solji/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white">
            <Linkedin size={20} />
          </a>
          <a href="https://brunch.co.kr/@sorji091" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white">
            <BookOpen size={20} />
          </a>
        </div>
      </div>

      <div className="mt-12 text-center text-slate-600 text-xs font-mono">
        © 2024 Solji Lee. All rights reserved. <br />
        Built with React, Tailwind, and Framer Motion.
      </div>

      {/* Business Card Popup */}
      <AnimatePresence>
        {showCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCard(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              {/* Business Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowCard(false)}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all"
                >
                  <X size={16} />
                </button>

                {/* Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-5 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      S
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-0.5">Solji Lee</h3>
                    <p className="text-brand-600 text-xs font-medium">Technical Product Designer</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2.5">
                    {/* Phone */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-brand-300 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 flex-1">
                          <div className="p-1.5 bg-brand-100 rounded-md text-brand-600">
                            <Phone size={16} />
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] uppercase tracking-wide font-medium">Phone</p>
                            <p className="text-slate-900 font-mono text-sm font-medium">010-4054-1339</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard('01040541339', 'phone')}
                          className="p-1.5 rounded-md bg-white hover:bg-brand-50 text-slate-500 hover:text-brand-600 transition-all border border-slate-200"
                        >
                          {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-brand-300 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="p-1.5 bg-brand-100 rounded-md text-brand-600 flex-shrink-0">
                            <Mail size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-slate-500 text-[10px] uppercase tracking-wide font-medium">Email</p>
                            <p className="text-slate-900 font-mono text-sm font-medium truncate">sorji091@naver.com</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard('sorji091@naver.com', 'email')}
                          className="p-1.5 rounded-md bg-white hover:bg-brand-50 text-slate-500 hover:text-brand-600 transition-all border border-slate-200 flex-shrink-0 ml-2"
                        >
                          {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-slate-400 text-[10px] font-medium">Designing Intelligence, Automating Workflows</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};