import React from 'react';
import { Mail, Linkedin, Phone, BookOpen } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0f172a] py-20 print:hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Let's Build Together</h3>
          <p className="text-slate-400 text-sm">Designing Intelligence, Automating Workflows.</p>
        </div>

        <div className="flex gap-6">
          <a href="tel:01040541339" className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white">
            <Phone size={20} />
          </a>
          <a href="mailto:sorji091@naver.com" className="p-3 bg-slate-800/50 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-slate-700/50 hover:border-white">
            <Mail size={20} />
          </a>
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
    </footer>
  );
};