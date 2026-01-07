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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Business Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 max-w-md w-full overflow-hidden relative"
                style={{ perspective: '1000px' }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowCard(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>

                {/* Card Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      S
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Solji Lee</h3>
                    <p className="text-brand-400 text-sm font-medium">Technical Product Designer</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    {/* Phone */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-brand-500/50 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Phone</p>
                            <p className="text-white font-mono text-sm">010-4054-1339</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard('01040541339', 'phone')}
                          className="p-2 rounded-lg bg-slate-700/50 hover:bg-brand-500/20 text-slate-400 hover:text-brand-400 transition-all"
                        >
                          {copied === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-brand-500/50 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
                            <Mail size={18} />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Email</p>
                            <p className="text-white font-mono text-sm break-all">sorji091@naver.com</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard('sorji091@naver.com', 'email')}
                          className="p-2 rounded-lg bg-slate-700/50 hover:bg-brand-500/20 text-slate-400 hover:text-brand-400 transition-all"
                        >
                          {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                    <p className="text-slate-500 text-xs">Designing Intelligence, Automating Workflows</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl"></div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};