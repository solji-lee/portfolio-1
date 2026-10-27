import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../lib/i18n';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Insights lives on its own page
    if (id === 'insights') {
      if (window.location.hash !== '#insights') window.location.hash = '#insights';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top' && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Section is on the home page: go home, then scroll once it has rendered
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.insights'), id: 'insights' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <button
      onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
      className={`font-mono text-[11px] tracking-[0.12em] text-slate-500 hover:text-slate-900 transition-colors ${className}`}
      aria-label="Toggle language"
    >
      <span className={language === 'ko' ? 'text-slate-900' : ''}>KO</span>
      <span className="mx-1.5 text-slate-300">/</span>
      <span className={language === 'en' ? 'text-slate-900' : ''}>EN</span>
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/85 backdrop-blur-md border-b border-slate-200' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        <button onClick={(e) => go(e, 'top')} className="text-[15px] font-semibold tracking-tight text-slate-900">
          Solji Lee
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => go(e, link.id)}
              className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <LangToggle className="pl-2" />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-5">
          <LangToggle />
          <button className="p-1 text-slate-700" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => go(e, link.id)}
                  className="text-left py-3 text-[15px] text-slate-700 hover:text-slate-900 border-b border-slate-100 last:border-0"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
