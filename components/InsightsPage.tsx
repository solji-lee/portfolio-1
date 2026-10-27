import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { getInsightsData, InsightItem } from '../lib/insightsData';
import { articles } from '../lib/articles';
import { useTranslation } from '../lib/i18n';
import { Eyebrow } from './Eyebrow';

const formatDate = (iso: string | undefined, lang: 'ko' | 'en') => {
    if (!iso) return '';
    const d = new Date(iso);
    return lang === 'ko'
        ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

/**
 * Insights page (hash route: #insights).
 * Site-hosted articles first, then external articles from insightsData (articles only).
 */
export const InsightsPage: React.FC = () => {
    const { t, language } = useTranslation();
    const L = language;
    const [external, setExternal] = useState<InsightItem[]>([]);

    useEffect(() => {
        const load = () => setExternal(getInsightsData().filter(i => !i.hidden && i.type === 'article'));
        load();
        const onStorage = (e: StorageEvent) => { if (e.key === 'solji-insights-data-v2') load(); };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const goHome = () => {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <section className="pt-32 pb-28 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <button onClick={goHome} className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors mb-12">
                        <ArrowLeft size={14} />
                        {L === 'ko' ? '홈' : 'Home'}
                    </button>

                    <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16 grid lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-7">
                            <Eyebrow>{t('insights.badge')}</Eyebrow>
                            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.1]">{t('insights.title')}</h1>
                        </div>
                        <p className="lg:col-span-5 text-slate-500 text-[15px] leading-relaxed">{t('insights.desc')}</p>
                    </motion.header>

                    <div className="border-t border-slate-200">
                        {/* Site-hosted articles */}
                        {articles.map((a, i) => (
                            <motion.a
                                key={a.slug}
                                href={`#insights/${a.slug}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-slate-200 hover:bg-slate-50/70 transition-colors -mx-4 px-4 rounded-md"
                            >
                                <div className="md:col-span-3 font-mono text-[11px] tracking-wide text-slate-400 pt-1.5 flex flex-wrap gap-x-3">
                                    <span>{formatDate(a.date, L)}</span>
                                    <span>{a.readingMinutes} min</span>
                                </div>
                                <div className="md:col-span-8">
                                    <h2 className="text-[20px] md:text-[22px] font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-brand-600 transition-colors">{a.title[L]}</h2>
                                    <p className="text-[14px] text-slate-500 leading-relaxed mb-3">{a.summary[L]}</p>
                                    <div className="flex flex-wrap gap-x-3 font-mono text-[11px] text-slate-400">{a.tags.map(tg => <span key={tg}>{tg}</span>)}</div>
                                </div>
                                <div className="md:col-span-1 hidden md:flex justify-end pt-2 text-slate-300 group-hover:text-slate-900 transition-colors">
                                    <ArrowRight size={18} />
                                </div>
                            </motion.a>
                        ))}

                        {/* External articles */}
                        {external.map((item, i) => {
                            const primary = item.links[0];
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (articles.length + i) * 0.06, duration: 0.4 }}
                                    className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-slate-200 -mx-4 px-4"
                                >
                                    <div className="md:col-span-3 font-mono text-[11px] tracking-wide text-slate-400 pt-1.5 flex flex-wrap gap-x-3">
                                        <span>{formatDate(item.createdAt, L)}</span>
                                        {primary && <span>{primary.platform}</span>}
                                    </div>
                                    <div className="md:col-span-8">
                                        <h2 className="text-[20px] md:text-[22px] font-bold text-slate-900 tracking-tight leading-snug mb-2">
                                            {L === 'en' ? item.titleEn : item.titleKo}
                                        </h2>
                                        <p className="text-[14px] text-slate-500 leading-relaxed mb-4">
                                            {L === 'en' ? item.descriptionEn : item.descriptionKo}
                                        </p>
                                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                                            {item.links.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-[13px] font-medium text-slate-900 hover:text-brand-600 transition-colors"
                                                >
                                                    {link.platform} <span className="text-slate-400 font-normal">({link.lang})</span>
                                                    <ArrowUpRight size={13} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {articles.length + external.length === 0 && (
                        <p className="text-slate-400 text-sm pt-8">{L === 'ko' ? '아직 공개된 글이 없습니다.' : 'Nothing published yet.'}</p>
                    )}
                </div>
            </section>
        </div>
    );
};
