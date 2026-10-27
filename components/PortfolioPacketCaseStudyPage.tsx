import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  ExternalLink,
  Github,
  Layers3,
  Link2,
  Sparkles,
} from 'lucide-react';
import {
  PortfolioExportPacket,
  getPacketActionLinks,
  getPacketHeroAssetSrc,
  getPacketInlineAssetSrc,
} from '../lib/portfolioPacket';

interface PortfolioPacketCaseStudyPageProps {
  packet: PortfolioExportPacket | null;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

function SectionVisual({
  title,
  imageSrc,
  alt,
}: {
  title: string;
  imageSrc: string | null;
  alt: string;
}) {
  if (!imageSrc) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-[0_28px_80px_-28px_rgba(15,23,42,0.65)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-200">
          <Sparkles size={12} />
          Visual Placeholder
        </div>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-300">Section</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight">{title}</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            `sj_tool`의 export packet은 연결됐지만, 이 슬롯에 브라우저가 접근 가능한 이미지가 아직 연결되지 않았습니다.
            `portfolio-1/public` 경로에 최종 비주얼을 두고 packet의 `filePath`를 그 경로로 맞추면 자동으로 노출됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_72px_-30px_rgba(15,23,42,0.38)]">
      <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function DetailBody({ body }: { body: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-8 text-slate-600">
      {body
        .split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => {
          if (paragraph.startsWith('- ')) {
            return (
              <div key={`${paragraph}-${index}`} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <p className="flex-1">{paragraph.replace(/^- /, '')}</p>
              </div>
            );
          }

          if (/^\d+\.\s/.test(paragraph)) {
            return (
              <div key={`${paragraph}-${index}`} className="flex gap-3">
                <span className="mt-1 min-w-7 text-sm font-black text-slate-900">
                  {paragraph.match(/^\d+/)?.[0]}
                </span>
                <p className="flex-1">{paragraph.replace(/^\d+\.\s*/, '')}</p>
              </div>
            );
          }

          return <p key={`${paragraph}-${index}`}>{paragraph}</p>;
        })}
    </div>
  );
}

export const PortfolioPacketCaseStudyPage: React.FC<PortfolioPacketCaseStudyPageProps> = ({
  packet,
  onBack,
  isLoading,
  error,
}) => {
  if (isLoading && !packet) {
    return (
      <div className="min-h-screen bg-[#faf8f4] px-6 py-8 text-slate-800">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </button>
          <div className="mt-24 rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-[0_24px_72px_-36px_rgba(15,23,42,0.25)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">Loading Packet</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">케이스 스터디를 불러오는 중</h1>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              `sj_tool`의 export API에서 최신 packet을 읽고 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!packet) {
    return (
      <div className="min-h-screen bg-[#faf8f4] px-6 py-8 text-slate-800">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </button>
          <div className="mt-24 rounded-[32px] border border-rose-200 bg-white p-10 shadow-[0_24px_72px_-36px_rgba(15,23,42,0.25)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">Packet Missing</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">케이스 스터디 packet을 찾지 못했습니다.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              {error || 'sj_tool에서 packet을 export한 뒤 다시 시도해주세요.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const heroAssetSrc = getPacketHeroAssetSrc(packet);
  const actionLinks = getPacketActionLinks(packet);

  return (
    <div className="min-h-screen bg-[#faf8f4] text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#faf8f4]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500 md:inline-flex">
            <Layers3 size={14} />
            {packet.meta.contentSource === 'actual' ? 'Actual Portfolio Draft' : 'Generated Draft'}
          </div>
        </div>
      </header>

      <main className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-600">
                <BookOpenText size={14} />
                Brunch → Portfolio Packet
              </div>
              <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-tight text-slate-900 md:text-7xl">
                {packet.detailPage.title}
              </h1>
              {packet.detailPage.subtitle && (
                <p className="mt-5 max-w-2xl text-xl font-medium leading-9 text-slate-500 md:text-2xl">
                  {packet.detailPage.subtitle}
                </p>
              )}
              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600">{packet.detailPage.summary}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {packet.meta.portfolioPlacement.map((placement) => (
                  <span
                    key={placement}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500"
                  >
                    {placement}
                  </span>
                ))}
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {packet.meta.status}
                </span>
              </div>

              {actionLinks.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {actionLinks.map((link) => {
                    const Icon = link.label === 'GitHub' ? Github : ExternalLink;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
                      >
                        <Icon size={15} />
                        {link.label}
                        <ArrowUpRight size={14} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <SectionVisual
                title={packet.detailPage.title}
                imageSrc={heroAssetSrc}
                alt={packet.assets.portfolioHero?.alt || packet.detailPage.title}
              />
            </motion.div>
          </section>

          <section className="mt-14 rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_72px_-36px_rgba(15,23,42,0.2)] md:px-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Context</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">이 packet이 담는 것</h2>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  `sj_tool`에서 브런치 원고, 포트폴리오 draft, 비주얼 슬롯, GitHub/demo 링크를 합쳐 만든 단일 소비 포맷입니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Source</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{packet.sourceSlug}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Exported</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {new Date(packet.exportedAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Linked Idea</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{packet.meta.linkedIdea || '—'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Visual Pack</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{packet.paths.manifest}</p>
                </div>
              </div>
            </div>
          </section>

          {packet.detailPage.intro && (
            <section className="mx-auto mt-14 max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-500">Intro</p>
              <p className="mt-6 text-xl leading-10 text-slate-700 md:text-2xl">
                {packet.detailPage.intro}
              </p>
            </section>
          )}

          <section className="mt-20 space-y-20">
            {packet.detailPage.sections.map((section, index) => {
              const inlineAssetSrc = getPacketInlineAssetSrc(packet, index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={section.id}
                  className={`grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start ${
                    !isEven ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  <SectionVisual
                    title={section.title}
                    imageSrc={inlineAssetSrc}
                    alt={packet.assets.inline[index]?.alt || section.title}
                  />

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                      <Link2 size={13} />
                      Section {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                      {section.title}
                    </h3>
                    <div className="mt-6">
                      <DetailBody body={section.body} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {(packet.links.builds.length > 0 || packet.links.linkedin.some((item) => item.externalUrl)) && (
            <section className="mt-20 rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_72px_-36px_rgba(15,23,42,0.2)] md:px-10">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Builds</p>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">연결된 제작물</h2>
                  <div className="mt-6 space-y-4">
                    {packet.links.builds.map((build) => (
                      <div key={build.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{build.displayName}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                              {build.artifactType}
                            </p>
                          </div>
                          {build.portfolioFeatured && (
                            <span className="rounded-full bg-indigo-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                              featured
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {build.repoUrl && (
                            <a
                              href={build.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                            >
                              <Github size={14} />
                              GitHub
                            </a>
                          )}
                          {build.demoUrl && (
                            <a
                              href={build.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                            >
                              <ExternalLink size={14} />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Social Drafts</p>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">LinkedIn 연결 상태</h2>
                  <div className="mt-6 space-y-4">
                    {packet.links.linkedin
                      .filter((item) => item.externalUrl)
                      .map((item) => (
                        <a
                          key={item.slug}
                          href={item.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-300"
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                              {item.variant}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors group-hover:text-slate-900">
                            보기
                            <ArrowUpRight size={15} />
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
