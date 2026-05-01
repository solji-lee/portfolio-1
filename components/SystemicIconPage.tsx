import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Sparkles, AlertTriangle, Zap, Layers, Users, BookOpen,
  HardDrive, Share2, CheckCircle2, Link2, Settings, RefreshCw, Search, ExternalLink
} from 'lucide-react';

type Lang = 'ko' | 'en';

interface SystemicIconPageProps {
  onBack: () => void;
}

const NEON_CYAN = '#00d9ff';
const NEON_PINK = '#ff006e';
const NEON_PURPLE = '#8338ec';
const NEON_GREEN = '#10b981';
const DARK_BG = '#0a0e1a';
const DARK_SURFACE = '#111827';
const DARK_ELEVATED = '#1e293b';
const MUTED = '#94a3b8';

const i18n = {
  ko: {
    back: '← 포트폴리오로',
    langToggle: 'ENGLISH',
    heroBadge: '피그마 플러그인',
    heroSubtitle: '여기저기 흩어진 오픈소스 아이콘 저장부터 디자인 시스템 관리까지,',
    heroHighlight1: '이제 기술적으로 해결하세요',
    heroConnector: '',
    heroHighlight2: '',
    heroEnd: '',
    heroFeatures: ['지능형 자동 두께 조절', '초고효율 압축', '서버리스 팀 협업'],
    problemBadge: '문제점',
    problemTitle1: '아이콘 관리의',
    problemTitle2: '혼돈',
    problems: [
      { title: '수천 개의 레이어', desc: '40,000개 이상의 아이콘 변형을 수동으로 관리하는 것은 악몽입니다' },
      { title: '저장 공간 지옥', desc: '모든 아이콘 변형이 소중한 피그마 파일 공간을 차지합니다' },
      { title: '수동 업데이트', desc: '스트로크 두께를 변경하려면 수천 개의 인스턴스를 업데이트해야 합니다' },
    ],
    alertTitle: '저장 공간 초과',
    alertDesc: '파일이 너무 큽니다',
    usage: '15.2 GB / 10 GB 사용 중',
    upgradeBtn: '업그레이드 필요',

    syncBadge: '기능 1',
    syncTitle1: '라이브러리',
    syncTitle2: '동기화 및 검색',
    syncSubtitle: '1비트 압축 기술로 40,000개 이상의 아이콘을 가볍게 관리합니다. 페이지 내의 아이콘을 한 번에 동기화하고, 빠르게 검색하여 캔버스에 삽입하세요.',
    traditional: '기존 방식',
    systemic: 'Systemic Icon',
    icons: '아이콘 수:',
    fileSize: '파일 크기:',
    compression: '압축',
    stats: [
      { value: '99.97%', label: '크기 감소' },
      { value: '40,000+', label: '지원 아이콘' },
      { value: '<1초', label: '동기화 시간' },
    ],

    weightBadge: '기능 2',
    weightTitle1: '지능형',
    weightTitle2: '선 두께 자동 조절',
    weightSubtitle: '삽입되는 아이콘의 크기에 맞춰, 사전에 설정한 규칙대로 선 두께를 실시간 유지합니다. 크기를 무리하게 키워도 시각적 일관성이 깨지지 않습니다.',
    stroke: '스트로크',
    autoAdjusted: '자동 조정됨',
    weightBottom: '한 번 규칙을 정의하면 모든 곳에 적용 —',
    weightBottomHighlight: '수동 작업 제로',

    variantBadge: '기능 3',
    variantTitle1: '선형/면형',
    variantTitle2: '스타일 통합 관리',
    variantSubtitle: '규칙 하나로 Outlined와 Filled 스타일을 쉽게 전환하며 검색하고 사용할 수 있습니다.',

    teamBadge: '기능 4',
    teamTitle1: '끊김 없는',
    teamTitle2: '팀 공유',
    teamSubtitle: '별도의 서버 없이 피그마 파일 내에서 팀원 한 명이 동기화하면 Index 데이터를 저장하여 다른 팀원들은 버튼 하나로 즉시 라이브러리를 로드할 수 있습니다.',
    sharedIndex: '공유 인덱스',
    iconsCount: '40,000+ 아이콘',
    activeNow: '현재 활동 중',
    synced: '동기화됨',
    teamFeatures: [
      { title: '인덱스 파일 공유', desc: '아이콘 인덱스를 내보내고 팀원들과 공유하세요' },
      { title: '즉시 업데이트', desc: '변경 사항이 모든 사람에게 즉시 전파됩니다' },
      { title: '버전 관리', desc: '변경 사항을 추적하고 일관성을 유지합니다' },
    ],

    guideBadge: '빠른 시작',
    guideTitle1: '',
    guideTitle2: '4단계',
    guideTitle3: '로 시작하기',
    guideSubtitle: '1분 안에 마스터하기',
    steps: [
      { title: '라이브러리 연결', desc: 'Settings에서 피그마 파일 URL 붙여넣기', details: '디자인 시스템 또는 특정 페이지에 연결' },
      { title: '규칙 설정', desc: '아이콘 접두어와 스트로크 규칙 설정', details: '자동 두께 및 filled 변형 정의' },
      { title: '아이콘 동기화', desc: '1비트 압축으로 원클릭 동기화', details: '40,000개 이상의 아이콘을 몇 초 만에 인덱싱' },
      { title: '검색 및 삽입', desc: '스마트 두께로 검색하고 삽입', details: '캔버스 크기에 맞게 자동 조정' },
    ],
    ctaTitle: '워크플로우를 최적화할 준비가 되셨나요?',
    ctaDesc: '더 스마트하게 아이콘을 관리하는 수천 명의 디자이너와 함께하세요',
    ctaButton: 'GitHub 보기',
  },
  en: {
    back: '← Portfolio',
    langToggle: '한국어',
    heroBadge: 'FIGMA PLUGIN',
    heroSubtitle: 'The high-performance icon engine for enterprise design systems.',
    heroHighlight1: 'Stop wrestling with scattered open-source icons',
    heroConnector: 'and scaling issues.',
    heroHighlight2: 'Solve it technically.',
    heroEnd: '',
    heroFeatures: ['Auto-Weight', '1-Bit Compression', 'Serverless Sharing'],
    problemBadge: 'THE PROBLEM',
    problemTitle1: 'Icon Management',
    problemTitle2: 'Chaos',
    problems: [
      { title: 'Thousands of Layers', desc: 'Managing 40,000+ icon variants manually is a nightmare' },
      { title: 'Storage Quota Hell', desc: 'Every icon variant consumes precious Figma file space' },
      { title: 'Manual Updates', desc: 'Changing stroke weight means updating thousands of instances' },
    ],
    alertTitle: 'Storage Quota Exceeded',
    alertDesc: 'Your file is too large',
    usage: '15.2 GB / 10 GB used',
    upgradeBtn: 'Upgrade Required',

    syncBadge: 'FEATURE 1',
    syncTitle1: 'Library',
    syncTitle2: 'Sync & Search',
    syncSubtitle: 'Manage 40,000+ icons directly through the plugin—no Figma library needed. Easily sync your icon components and insert them with a single click.',
    traditional: 'Traditional',
    systemic: 'Systemic Icon',
    icons: 'Icons:',
    fileSize: 'File Size:',
    compression: 'Compression',
    stats: [
      { value: '99.97%', label: 'Size Reduction' },
      { value: '40,000+', label: 'Icons Supported' },
      { value: '<1s', label: 'Sync Time' },
    ],

    weightBadge: 'FEATURE 2',
    weightTitle1: 'Intelligent',
    weightTitle2: 'Auto-Weight',
    weightSubtitle: 'Automatically scales stroke weight based on insertion size to maintain visual consistency.',
    stroke: 'Stroke',
    autoAdjusted: 'Auto-adjusted',
    weightBottom: 'Define rules once, apply everywhere —',
    weightBottomHighlight: 'zero manual work',

    variantBadge: 'FEATURE 3',
    variantTitle1: 'Unified',
    variantTitle2: 'Outlined & Filled',
    variantSubtitle: 'Toggle effortlessly between Outlined and Filled styles using your brand\'s naming rules.',

    teamBadge: 'FEATURE 4',
    teamTitle1: 'Seamless',
    teamTitle2: 'Team Sharing',
    teamSubtitle: 'Share your indexed library instantly with your team. Sync once, load everywhere without external servers.',
    sharedIndex: 'Shared Index',
    iconsCount: '40,000+ icons',
    activeNow: 'Active now',
    synced: 'Synced',
    teamFeatures: [
      { title: 'Share Index File', desc: 'Export and share your icon index with team members' },
      { title: 'Instant Updates', desc: 'Changes propagate to everyone instantly' },
      { title: 'Version Control', desc: 'Track changes and maintain consistency' },
    ],

    guideBadge: 'QUICK START',
    guideTitle1: 'Get Started in',
    guideTitle2: '4 Steps',
    guideTitle3: '',
    guideSubtitle: 'From zero to hero in under a minute',
    steps: [
      { title: 'Connect Library', desc: 'Paste your Figma file URL in Settings', details: 'Link to your design system or specific page' },
      { title: 'Set Rules', desc: 'Configure icon prefix and stroke rules', details: 'Define auto-weight and filled variants' },
      { title: 'Sync Icons', desc: 'One-click sync with 1-bit compression', details: '40,000+ icons indexed in seconds' },
      { title: 'Search & Insert', desc: 'Find and insert with smart thickness', details: 'Auto-adjusted to your canvas size' },
    ],
    ctaTitle: 'Ready to optimize your workflow?',
    ctaDesc: 'Join thousands of designers managing icons smarter',
    ctaButton: 'View on GitHub',
  },
};

const Badge = ({ children, color, icon: Icon }: { children: React.ReactNode; color: string; icon: React.ElementType }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 16px', borderRadius: 40, marginBottom: 24,
      backgroundColor: `${color}18`, border: `1px solid ${color}44`,
    }}
  >
    <Icon size={14} color={color} />
    <span style={{ fontSize: 12, fontWeight: 600, color, fontFamily: 'Orbitron, sans-serif', letterSpacing: 1 }}>{children}</span>
  </motion.div>
);

const SectionDivider = ({ color }: { color: string }) => (
  <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${color}44, transparent)` }} />
);

const navBtnStyle = (color: string): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 8,
  color, backgroundColor: `${color}11`, border: `1px solid ${color}33`,
  borderRadius: 24, padding: '8px 18px', cursor: 'pointer',
  fontSize: 13, fontWeight: 600, transition: 'background 0.2s',
  fontFamily: 'inherit',
});

const GifDemo = ({ src, alt }: { src: string; alt: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      marginTop: 56,
      borderRadius: 16,
      overflow: 'hidden',
      border: `1px solid ${MUTED}33`,
      boxShadow: `0 20px 60px -10px rgba(0,0,0,0.4)`,
      position: 'relative',
      maxWidth: 900,
      margin: '56px auto 0'
    }}
  >
    <div style={{ padding: '12px 16px', background: DARK_ELEVATED, display: 'flex', gap: 8, alignItems: 'center', borderBottom: `1px solid ${MUTED}22` }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
    </div>
    <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
  </motion.div>
);

export const SystemicIconPage: React.FC<SystemicIconPageProps> = ({ onBack }) => {
  const [language, setLanguage] = useState<Lang>('ko');
  const t = i18n[language];

  const orbitron: React.CSSProperties = { fontFamily: 'Orbitron, sans-serif' };
  const sectionPad: React.CSSProperties = { padding: '100px 32px', position: 'relative' };

  return (
    <div style={{ backgroundColor: DARK_BG, color: '#e8f4f8', fontFamily: '"DM Sans", sans-serif', minHeight: '100vh', wordBreak: 'normal' }}>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-5%', left: '15%', width: 700, height: 700, background: NEON_CYAN, opacity: 0.035, filter: 'blur(160px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '15%', width: 700, height: 700, background: NEON_PURPLE, opacity: 0.035, filter: 'blur(160px)', borderRadius: '50%' }} />
      </div>
      {/* Grid */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.025, backgroundImage: `linear-gradient(${NEON_CYAN} 1px, transparent 1px), linear-gradient(90deg, ${NEON_CYAN} 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

      {/* Fixed header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: `${DARK_BG}e0`, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${NEON_CYAN}18`,
        padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button style={navBtnStyle(NEON_CYAN)} onClick={onBack}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${NEON_CYAN}22`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${NEON_CYAN}11`; }}
        >
          <ArrowLeft size={14} /> {t.back}
        </button>
        <div style={{ ...orbitron, fontWeight: 900, color: NEON_CYAN, fontSize: 16, letterSpacing: 3 }}>SYSTEMIC ICON</div>
        <button style={navBtnStyle(NEON_CYAN)} onClick={() => setLanguage(l => l === 'ko' ? 'en' : 'ko')}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${NEON_CYAN}22`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${NEON_CYAN}11`; }}
        >
          {t.langToggle}
        </button>
      </header>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── SECTION 1: HERO ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 32px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Animated icon grid BG */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 14 }}>
              {Array.from({ length: 70 }).map((_, i) => (
                <motion.div key={i}
                  style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${NEON_CYAN}` }}
                  animate={{ opacity: [0.2, 0.9, 0.2] }}
                  transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge color={NEON_CYAN} icon={Sparkles}>{t.heroBadge}</Badge>
            <h1 style={{
              ...orbitron, fontWeight: 900,
              fontSize: 'clamp(52px, 11vw, 108px)', lineHeight: 1.0, marginBottom: 28,
              background: `linear-gradient(130deg, ${NEON_CYAN} 0%, #ffffff 50%, ${NEON_PURPLE} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Systemic Icon
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.2vw, 22px)', color: MUTED, maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.8 }}>
              {t.heroSubtitle}{' '}
              <span style={{ color: NEON_PURPLE, fontWeight: 700 }}>{t.heroHighlight1}</span>
              {' '}{t.heroConnector}{' '}
              <span style={{ color: NEON_CYAN, fontWeight: 700 }}>{t.heroHighlight2}</span>
              {t.heroEnd}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              {t.heroFeatures.map((f, i) => (
                <motion.div key={f}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, color: MUTED, fontSize: 15 }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: NEON_CYAN, boxShadow: `0 0 12px ${NEON_CYAN}` }} />
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: `${MUTED}88`, fontSize: 11, letterSpacing: 2, ...orbitron }}
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, ${MUTED}66, transparent)` }} />
          </motion.div>
        </section>

        <SectionDivider color={NEON_CYAN} />

        {/* ── SECTION 2: PROBLEM ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <Badge color="#ef4444" icon={AlertTriangle}>{t.problemBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 36 }}>
                {t.problemTitle1}<br /><span style={{ color: '#ef4444' }}>{t.problemTitle2}</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {([HardDrive, Layers, AlertTriangle] as React.ElementType[]).map((Icon, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px', borderRadius: 14, backgroundColor: DARK_SURFACE, border: '1px solid #ef444422' }}
                  >
                    <div style={{ padding: 8, borderRadius: 8, backgroundColor: '#ef444411', flexShrink: 0 }}>
                      <Icon size={18} color="#ef4444" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t.problems[i].title}</h3>
                      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{t.problems[i].desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Error popup */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 340, padding: 28, borderRadius: 20, backgroundColor: DARK_SURFACE, border: '2px solid #ef4444', boxShadow: '0 0 60px rgba(239,68,68,0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 18 }}>
                  <div style={{ padding: 8, borderRadius: '50%', backgroundColor: '#ef444420', flexShrink: 0 }}>
                    <AlertTriangle size={22} color="#ef4444" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{t.alertTitle}</h3>
                    <p style={{ fontSize: 13, color: '#f87171' }}>{t.alertDesc}</p>
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ height: 8, borderRadius: 4, backgroundColor: DARK_ELEVATED, overflow: 'hidden', marginBottom: 8 }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1.2 }}
                      style={{ height: '100%', background: 'linear-gradient(to right, #ef4444, #991b1b)' }} />
                  </div>
                  <p style={{ fontSize: 12, color: MUTED }}>{t.usage}</p>
                </div>
                <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ padding: '10px 16px', borderRadius: 8, backgroundColor: '#ef4444', color: '#fff', textAlign: 'center', fontSize: 14, fontWeight: 700 }}>
                  {t.upgradeBtn}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider color={NEON_PURPLE} />

        {/* ── SECTION 3: SYNC & SEARCH ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge color={NEON_PURPLE} icon={Layers}>{t.syncBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 16 }}>
                {t.syncTitle1} <span style={{ color: NEON_PURPLE }}>{t.syncTitle2}</span>
              </h2>
              <p style={{ fontSize: 18, color: MUTED, maxWidth: 680, margin: '0 auto 56px', lineHeight: 1.75 }}>{t.syncSubtitle}</p>
            </motion.div>

            {/* Scale comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28, marginBottom: 40, alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
                style={{ padding: 28, borderRadius: 20, backgroundColor: DARK_SURFACE, border: `1px solid ${NEON_CYAN}22` }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20, textAlign: 'center' }}>{t.traditional}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 5, marginBottom: 20 }}>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.012, duration: 0.2 }}
                      style={{ aspectRatio: '1', borderRadius: 3, border: `1px solid ${NEON_CYAN}33`, backgroundColor: DARK_ELEVATED }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: MUTED }}>{t.icons}</span>
                  <span style={{ color: NEON_CYAN, ...orbitron }}>40,000+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                  <span style={{ color: MUTED }}>{t.fileSize}</span>
                  <span style={{ color: '#f87171', ...orbitron }}>~15.2 GB</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, backgroundColor: DARK_ELEVATED, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '96%' }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }}
                    style={{ height: '100%', background: 'linear-gradient(to right, #ef4444, #991b1b)' }} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ padding: 20, borderRadius: '50%', background: `linear-gradient(135deg, ${NEON_CYAN}, ${NEON_PURPLE})`, boxShadow: `0 0 40px ${NEON_CYAN}55` }}>
                  <Zap size={30} color={DARK_BG} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{t.compression}</div>
                  <div style={{ ...orbitron, fontWeight: 700, fontSize: 22, color: '#fff' }}>1-bit</div>
                  <div style={{ fontSize: 12, color: NEON_PURPLE }}>bitmask</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
                style={{ padding: 28, borderRadius: 20, backgroundColor: DARK_SURFACE, border: `1px solid ${NEON_PURPLE}33` }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20, textAlign: 'center' }}>{t.systemic}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, height: 116 }}>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
                    style={{ width: 100, height: 100, borderRadius: 14, background: `linear-gradient(135deg, ${NEON_PURPLE}30, ${NEON_CYAN}18)`, border: `2px solid ${NEON_PURPLE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${NEON_PURPLE}44` }}>
                    <Sparkles size={28} color={NEON_PURPLE} />
                    <div style={{ ...orbitron, fontWeight: 700, color: NEON_PURPLE, fontSize: 14, marginTop: 4 }}>40K+</div>
                  </motion.div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: MUTED }}>{t.icons}</span>
                  <span style={{ color: NEON_PURPLE, ...orbitron }}>40,000+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                  <span style={{ color: MUTED }}>{t.fileSize}</span>
                  <span style={{ color: '#34d399', ...orbitron }}>~5 KB</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, backgroundColor: DARK_ELEVATED, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '1%' }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.5 }}
                    style={{ height: '100%', background: 'linear-gradient(to right, #10b981, #059669)', minWidth: 4 }} />
                </div>
              </motion.div>
            </div>

            <GifDemo src="/SI_screen_gifs/1_Sync_Search_Insert.gif" alt="Sync & Search Demo" />

          </div>
        </section>

        <SectionDivider color={NEON_CYAN} />

        {/* ── SECTION 4: AUTO-WEIGHT ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge color={NEON_CYAN} icon={Zap}>{t.weightBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 16 }}>
                {t.weightTitle1} <span style={{ color: NEON_CYAN }}>{t.weightTitle2}</span>
              </h2>
              <p style={{ fontSize: 18, color: MUTED, maxWidth: 580, margin: '0 auto 56px', lineHeight: 1.75 }}>{t.weightSubtitle}</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 24, marginBottom: 40 }}>
              {([{ size: 16, stroke: 1, label: '16px' }, { size: 24, stroke: 1.5, label: '24px' }, { size: 48, stroke: 2.5, label: '48px' }]).map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  style={{ padding: 32, borderRadius: 20, backgroundColor: DARK_SURFACE, border: `1px solid ${NEON_CYAN}22` }}
                >
                  <div style={{ ...orbitron, fontSize: 28, fontWeight: 700, color: NEON_CYAN, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 28 }}>{t.stroke}: {item.stroke}px</div>
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <svg width={item.size * 3.2} height={item.size * 3.2} viewBox={`0 0 ${item.size} ${item.size}`}
                      style={{ filter: `drop-shadow(0 0 8px ${NEON_CYAN}88)` }}>
                      <motion.circle cx={item.size / 2} cy={item.size / 2} r={item.size * 0.34}
                        fill="none" stroke={NEON_CYAN} strokeWidth={item.stroke}
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 1.2 }} />
                      <motion.line x1={item.size * 0.32} y1={item.size / 2} x2={item.size * 0.68} y2={item.size / 2}
                        stroke={NEON_CYAN} strokeWidth={item.stroke} strokeLinecap="round"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                        transition={{ delay: 0.9 + i * 0.15, duration: 0.7 }} />
                      <motion.line x1={item.size / 2} y1={item.size * 0.32} x2={item.size / 2} y2={item.size * 0.68}
                        stroke={NEON_CYAN} strokeWidth={item.stroke} strokeLinecap="round"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                        transition={{ delay: 1.0 + i * 0.15, duration: 0.7 }} />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '8px 16px', borderRadius: 24, backgroundColor: `${NEON_CYAN}10`, border: `1px solid ${NEON_CYAN}30` }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: NEON_CYAN, boxShadow: `0 0 8px ${NEON_CYAN}` }} />
                    <span style={{ fontSize: 12, color: NEON_CYAN }}>{t.autoAdjusted}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6 }}
              style={{ padding: '20px 28px', borderRadius: 16, background: `linear-gradient(135deg, ${NEON_CYAN}0a, ${NEON_PURPLE}0a)`, border: `1px solid ${NEON_CYAN}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <Zap size={20} color={NEON_CYAN} />
              <p style={{ fontSize: 17, color: '#fff', margin: 0 }}>
                {t.weightBottom} <span style={{ color: NEON_CYAN, fontWeight: 700 }}>{t.weightBottomHighlight}</span>
              </p>
            </motion.div>

            <GifDemo src="/SI_screen_gifs/2_Auto_Stroke_Demo.gif" alt="Auto Stroke Demo" />

          </div>
        </section>

        <SectionDivider color={NEON_PINK} />

        {/* ── SECTION 5: OUTLINED & FILLED VARIANTS ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge color={NEON_PINK} icon={Sparkles}>{t.variantBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 16 }}>
                {t.variantTitle1} <span style={{ color: NEON_PINK }}>{t.variantTitle2}</span>
              </h2>
              <p style={{ fontSize: 18, color: MUTED, maxWidth: 580, margin: '0 auto 56px', lineHeight: 1.75 }}>{t.variantSubtitle}</p>
            </motion.div>

            <GifDemo src="/SI_screen_gifs/3_sync_search_filled_icon.gif" alt="Outlined and Filled variants" />

          </div>
        </section>

        <SectionDivider color={NEON_GREEN} />

        {/* ── SECTION 6: TEAM SHARING ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge color={NEON_GREEN} icon={Users}>{t.teamBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 16 }}>
                {t.teamTitle1} <span style={{ color: NEON_GREEN }}>{t.teamTitle2}</span>
              </h2>
              <p style={{ fontSize: 18, color: MUTED, maxWidth: 580, margin: '0 auto 56px', lineHeight: 1.75 }}>{t.teamSubtitle}</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
              {[
                { name: 'Designer A', color: NEON_CYAN, avatar: 'DA' },
                { name: 'Designer B', color: NEON_PURPLE, avatar: 'DB' },
                { name: 'Developer', color: NEON_PINK, avatar: 'DV' },
              ].map((user, i) => (
                <motion.div key={user.name}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
                  style={{ padding: 24, borderRadius: 20, backgroundColor: DARK_SURFACE, border: `2px solid ${user.color}30` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                    <div style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', ...orbitron, fontWeight: 700, color: DARK_BG, fontSize: 14, flexShrink: 0 }}>
                      {user.avatar}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, color: '#fff', marginBottom: 2 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: MUTED }}>{t.activeNow}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, backgroundColor: DARK_ELEVATED, border: `1px solid ${user.color}20` }}>
                    <CheckCircle2 size={15} color={user.color} />
                    <span style={{ fontSize: 13, color: MUTED }}>{t.synced}</span>
                    <motion.div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: user.color, marginLeft: 'auto', boxShadow: `0 0 8px ${user.color}` }}
                      animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
                  </div>
                </motion.div>
              ))}
            </div>

            <GifDemo src="/SI_screen_gifs/4_share_load_demo.gif" alt="Team Sharing" />

          </div>
        </section>

        <SectionDivider color={NEON_CYAN} />

        {/* ── SECTION 7: GUIDE ── */}
        <section style={sectionPad}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge color={NEON_CYAN} icon={BookOpen}>{t.guideBadge}</Badge>
              <h2 style={{ ...orbitron, fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 50px)', lineHeight: 1.15, marginBottom: 16 }}>
                {language === 'en'
                  ? <>{t.guideTitle1} <span style={{ color: NEON_CYAN }}>{t.guideTitle2}</span></>
                  : <><span style={{ color: NEON_CYAN }}>{t.guideTitle2}</span>{t.guideTitle3}</>
                }
              </h2>
              <p style={{ fontSize: 18, color: MUTED, maxWidth: 500, margin: '0 auto 56px', lineHeight: 1.75 }}>{t.guideSubtitle}</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 56 }}>
              {t.steps.map((step, i) => {
                const icons: React.ElementType[] = [Link2, Settings, RefreshCw, Search];
                const colors = [NEON_CYAN, NEON_PURPLE, NEON_PINK, NEON_GREEN];
                const Icon = icons[i];
                const color = colors[i];
                return (
                  <motion.div key={step.title}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
                    style={{ position: 'relative', padding: '28px 24px', borderRadius: 20, backgroundColor: DARK_SURFACE, border: `2px solid ${color}`, boxShadow: `0 0 28px ${color}18` }}>
                    <div style={{ position: 'absolute', top: -18, right: -10, width: 40, height: 40, borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', ...orbitron, fontWeight: 900, fontSize: 17, color: DARK_BG, boxShadow: `0 0 18px ${color}` }}>
                      {i + 1}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                      <div style={{ padding: 14, borderRadius: 14, backgroundColor: `${color}18` }}>
                        <Icon size={28} color={color} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8, textAlign: 'center' }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: MUTED, marginBottom: 14, textAlign: 'center', lineHeight: 1.6 }}>{step.desc}</p>
                    <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color, textAlign: 'center' }}>{step.details}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.7 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 40, padding: '28px 40px', borderRadius: 24, background: `linear-gradient(135deg, ${NEON_CYAN}0b, ${NEON_PURPLE}0b, ${NEON_PINK}0b)`, border: `1px solid ${NEON_CYAN}20`, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{t.ctaTitle}</h3>
                <p style={{ fontSize: 14, color: MUTED }}>{t.ctaDesc}</p>
              </div>
              <motion.a href="https://github.com/solji-lee/systemic-icon" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 40, background: `linear-gradient(135deg, ${NEON_CYAN}, ${NEON_PURPLE})`, color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: `0 0 30px ${NEON_CYAN}44`, whiteSpace: 'nowrap' }}>
                {t.ctaButton} <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '48px 32px', textAlign: 'center', borderTop: `1px solid ${NEON_CYAN}0f` }}>
          <button onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: MUTED, backgroundColor: 'transparent', border: `1px solid ${MUTED}33`, borderRadius: 24, padding: '10px 22px', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = NEON_CYAN; (e.currentTarget as HTMLButtonElement).style.borderColor = `${NEON_CYAN}44`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = MUTED; (e.currentTarget as HTMLButtonElement).style.borderColor = `${MUTED}33`; }}
          >
            <ArrowLeft size={14} /> {t.back}
          </button>
          <div style={{ marginTop: 20, fontSize: 12, color: `${MUTED}55`, letterSpacing: 1 }}>
            Solji Lee — Technical Product Designer
          </div>
        </footer>

      </div>
    </div>
  );
};
