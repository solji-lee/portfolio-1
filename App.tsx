import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Recommendations } from './components/Recommendations';
import { LanguageProvider } from './lib/i18n';
import { SystemicIconPage } from './components/SystemicIconPage';
import { InsightsPage } from './components/InsightsPage';
import { ArticlePage } from './components/ArticlePage';
import { findArticle } from './lib/articles';

type Route =
  | { page: 'home' }
  | { page: 'systemic-icon' }
  | { page: 'insights' }
  | { page: 'article'; slug: string };

const routeFromHash = (): Route => {
  const h = window.location.hash;
  if (h === '#systemic-icon') return { page: 'systemic-icon' };
  if (h === '#insights') return { page: 'insights' };
  if (h.startsWith('#insights/')) return { page: 'article', slug: h.slice('#insights/'.length) };
  return { page: 'home' };
};

const App: React.FC = () => {
  // Support direct linking via hash
  const [route, setRoute] = useState<Route>(routeFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const next = routeFromHash();
      setRoute(next);
      if (next.page !== 'home') window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateHome = () => {
    window.location.hash = '';
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (route.page === 'article') {
    const article = findArticle(route.slug);
    return (
      <LanguageProvider>
        <SpeedInsights />
        <Analytics />
        <Navbar />
        {article ? <ArticlePage article={article} /> : <InsightsPage />}
      </LanguageProvider>
    );
  }

  if (route.page === 'insights') {
    return (
      <LanguageProvider>
        <SpeedInsights />
        <Analytics />
        <Navbar />
        <InsightsPage />
      </LanguageProvider>
    );
  }

  if (route.page === 'systemic-icon') {
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
      <div className="min-h-screen bg-white text-slate-800 selection:bg-slate-900 selection:text-white font-sans overflow-x-clip">
        <Navbar />
        <SpeedInsights />
        <Analytics />

        <main>
          <Hero />
          <Projects />
          <Recommendations />
        </main>

        <Contact />
      </div>
    </LanguageProvider>
  );
};

export default App;
