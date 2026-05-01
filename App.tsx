import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { SpecialLab } from './components/SpecialLab';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Recommendations } from './components/Recommendations';
import { PlaygroundInsights } from './components/PlaygroundInsights';
import { LanguageProvider } from './lib/i18n';
import { SystemicIconPage } from './components/SystemicIconPage';

type Page = 'home' | 'systemic-icon';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Support direct linking via hash
    return window.location.hash === '#systemic-icon' ? 'systemic-icon' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash === '#systemic-icon' ? 'systemic-icon' : 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToCaseStudy = () => {
    window.location.hash = '#systemic-icon';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateHome = () => {
    window.location.hash = '';
    // Small delay to let state update, then scroll to projects
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (currentPage === 'systemic-icon') {
    return (
      <LanguageProvider>
        <SpeedInsights />
        <Analytics />
        <SystemicIconPage onBack={navigateHome} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-100 selection:text-brand-900 font-sans overflow-x-hidden">
        <Navbar />
        <SpeedInsights />
        <Analytics />

        <main className="relative z-10">
          <Hero />
          <PlaygroundInsights />
          <Projects onViewCaseStudy={navigateToCaseStudy} />
          <SpecialLab />
          <About />
          <Recommendations />
        </main>

        <Contact />

        {/* Background Noise/Grid Effect - Light Mode */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cbd5e1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}>
        </div>

        {/* Soft Gradients for atmosphere */}
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-brand-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-accent-400 rounded-full blur-3xl opacity-10 translate-x-1/3 translate-y-1/3 pointer-events-none z-0"></div>
      </div>
    </LanguageProvider>
  );
};

export default App;