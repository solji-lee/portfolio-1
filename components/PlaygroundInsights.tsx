import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Figma, BookOpen, Newspaper, ArrowUpRight, Globe, Lightbulb } from 'lucide-react';
import { getInsightsData, InsightItem } from '../lib/insightsData';
import { useTranslation } from '../lib/i18n';

// Icon name to component mapping
const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
    Globe, BookOpen, Figma, Github, Newspaper, ExternalLink, ArrowUpRight
};

const resolveIcon = (name: string) => iconMap[name] || Globe;

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
    })
};

export const PlaygroundInsights: React.FC = () => {
    const { t, language } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [allData, setAllData] = useState<InsightItem[]>([]);

    const filters = [
        { id: 'all', label: t('insights.filter.all') },
        { id: 'article', label: t('insights.filter.article') },
        { id: 'resource', label: t('insights.filter.resource') },
        { id: 'press', label: t('insights.filter.press') }
    ];

    useEffect(() => {
        setAllData(getInsightsData());
    }, []);

    const filteredData = allData
        .filter(item => !item.hidden)
        .filter(item => activeFilter === 'all' ? true : item.type === activeFilter)
        .slice(0, 6);

    return (
        <section id="insights" className="py-24 md:py-32 bg-white border-t border-slate-200 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* 헤더 섹션 */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[11px] mb-4 bg-brand-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-100/50">
                        <Lightbulb size={14} />
                        <span>{t('insights.badge')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                        {t('insights.title')}
                    </h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed max-w-2xl">
                        {t('insights.desc')}
                    </p>
                </motion.header>

                {/* 필터 탭 */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200"
                >
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === filter.id
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* 벤토 그리드 레이아웃 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item, i) => (
                        <motion.div
                            key={item.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group relative flex flex-col bg-white border border-slate-200 hover:border-brand-200 hover:shadow-lg rounded-2xl p-6 transition-all duration-300 col-span-1"
                        >
                            {/* 카드 상단: 태그 */}
                            <div className="flex items-start mb-4">
                                <div className="flex flex-nowrap gap-2 overflow-hidden max-h-[28px]">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-md border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 본문 콘텐츠 */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">
                                    {language === 'en' ? item.titleEn : item.titleKo}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {language === 'en' ? item.descriptionEn : item.descriptionKo}
                                </p>
                            </div>

                            {/* 하단 링크 영역 */}
                            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-100">
                                {item.links.map((link, idx) => {
                                    const Icon = resolveIcon(link.iconName);
                                    return (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-brand-50 text-sm font-medium rounded-lg border border-slate-200 hover:border-brand-200 transition-colors group/link"
                                        >
                                            <Icon size={16} className={
                                                link.platform === 'Figma' ? 'text-pink-500' :
                                                    link.platform === 'Github' ? 'text-slate-800' :
                                                        'text-slate-400 group-hover/link:text-brand-500'
                                            } />
                                            <span className="flex items-center gap-1 text-slate-600 group-hover/link:text-brand-600">
                                                {link.lang} <span className="text-slate-400 text-[10px] hidden sm:inline">({link.platform})</span>
                                            </span>
                                            <ArrowUpRight size={14} className="text-slate-300 group-hover/link:text-brand-400" />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
