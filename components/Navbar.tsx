import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={(e) => scrollToSection(e, 'top')} 
          className="flex items-center gap-2 group text-left"
        >
          <div className="p-2 rounded bg-slate-100 group-hover:bg-brand-500 transition-colors">
            <Code2 size={20} className="text-brand-600 group-hover:text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            SOLJI<span className="text-brand-600">.DESIGN</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-brand-600 rounded-full transition-colors shadow-lg shadow-slate-200"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-brand-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-left text-slate-600 hover:text-brand-600 font-medium"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="text-left text-slate-600 hover:text-brand-600 font-medium"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};