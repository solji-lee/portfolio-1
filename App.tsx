import React, { useState, useEffect, useRef } from 'react';
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
import { PortfolioPacketCaseStudyPage } from './components/PortfolioPacketCaseStudyPage';
import { PortfolioExportPacket, fetchPortfolioPacket } from './lib/portfolioPacket';

type Route =
  | { page: 'home' }
  | { page: 'systemic-icon' }
  | { page: 'insights' }
  | { page: 'article'; slug: string }
  | { page: 'packet-case-study'; slug: string };

const routeFromHash = (): Route => {
  const h = window.location.hash.replace(/^#/, '').trim();
  if (h === 'systemic-icon') return { page: 'systemic-icon' };
  if (h === 'insights') return { page: 'insights' };
  if (h.startsWith('insights/')) return { page: 'article', slug: h.slice('insights/'.length) };
  if (h.startsWith('case-study/')) {
    const slug = decodeURIComponent(h.slice('case-study/'.length));
    if (slug) return { page: 'packet-case-study', slug };
  }
  return { page: 'home' };
};

const App: React.FC = () => {
  // Support direct linking via hash
  const [route, setRoute] = useState<Route>(routeFromHash);

  // Export packets (case studies produced by the sj_tool pipeline), loaded on demand
  const [packetMap, setPacketMap] = useState<Record<string, PortfolioExportPacket>>({});
  const [packetErrors, setPacketErrors] = useState<Record<string, string>>({});
  const [loadingSlugs, setLoadingSlugs] = useState<string[]>([]);
  const requestedSlugsRef = useRef(new Set<string>());

  useEffect(() => {
    const handleHashChange = () => {
      const next = routeFromHash();
      setRoute(next);
      if (next.page !== 'home') window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (route.page !== 'packet-case-study') return;
    const slug = route.slug;
    if (requestedSlugsRef.current.has(slug)) return;
    requestedSlugsRef.current.add(slug);

    setLoadingSlugs((prev) => [...prev, slug]);
    setPacketErrors((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });

    fetchPortfolioPacket(slug)
      .then((packet) => setPacketMap((prev) => ({ ...prev, [slug]: packet })))
      .catch((error) => {
        requestedSlugsRef.current.delete(slug);
        setPacketErrors((prev) => ({
          ...prev,
          [slug]: error instanceof Error ? error.message : 'Failed to load export packet',
        }));
      })
      .finally(() => setLoadingSlugs((prev) => prev.filter((item) => item !== slug)));
  }, [route]);

  const navigateHome = () => {
    window.location.hash = '';
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (route.page === 'packet-case-study') {
    return (
      <LanguageProvider>
        <SpeedInsights />
        <Analytics />
        <PortfolioPacketCaseStudyPage
          packet={packetMap[route.slug] || null}
          onBack={navigateHome}
          isLoading={loadingSlugs.includes(route.slug)}
          error={packetErrors[route.slug] || null}
        />
      </LanguageProvider>
    );
  }

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
