import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Article } from '../lib/articles';
import { useTranslation } from '../lib/i18n';

const formatDate = (iso: string, lang: 'ko' | 'en') => {
    const d = new Date(iso);
    return lang === 'ko'
        ? `${d.getFullYear()}년 ${d.getMonth() + 1}월`
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

export const ArticlePage: React.FC<{ article: Article }> = ({ article }) => {
    const { language } = useTranslation();
    const L = language;

    const back = () => {
        window.location.hash = '#insights';
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <article className="pt-32 pb-28 px-6">
                <div className="max-w-[680px] mx-auto">
                    <button onClick={back} className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors mb-10">
                        <ArrowLeft size={14} />
                        Insights
                    </button>

                    <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-slate-400 mb-5">
                            <span>{formatDate(article.date, L)}</span>
                            <span>·</span>
                            <span>{article.readingMinutes} min</span>
                            <span>·</span>
                            {article.tags.map(t => <span key={t}>{t}</span>)}
                        </div>
                        <h1 className="text-[30px] md:text-[38px] font-bold text-slate-900 leading-[1.2] tracking-tight mb-5">
                            {article.title[L]}
                        </h1>
                        <p className="text-[17px] text-slate-500 leading-relaxed">
                            {article.summary[L]}
                        </p>
                    </motion.header>

                    <div className="space-y-12">
                        {article.sections.map((sec, i) => (
                            <section key={i}>
                                {sec.heading && (
                                    <h2 className="text-[20px] font-bold text-slate-900 tracking-tight mb-4">{sec.heading[L]}</h2>
                                )}
                                <div className="space-y-5">
                                    {sec.paragraphs[L].map((p, j) => (
                                        <p key={j} className="text-[16px] md:text-[17px] leading-[1.85] text-slate-700">{p}</p>
                                    ))}
                                </div>
                                {sec.bullets && (
                                    <ul className="mt-6 space-y-3 border-l-2 border-slate-900 pl-5">
                                        {sec.bullets[L].map((b, j) => (
                                            <li key={j} className="text-[15px] leading-relaxed text-slate-700">{b}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[13px] text-slate-400">Solji Lee</span>
                        <button onClick={back} className="text-[13px] font-medium text-slate-900 hover:text-brand-600 transition-colors">
                            {L === 'ko' ? '다른 글 보기' : 'More writing'}
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};
