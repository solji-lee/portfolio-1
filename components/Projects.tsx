import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, CheckCircle2, AlertCircle, Lightbulb, Trophy, ArrowRight } from 'lucide-react';

interface ProjectDetail {
  challenge: string[];
  solution: string[];
  impact: string[];
}

interface ProjectData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  subtitle: string;
  role: string;
  description: string;
  impactHighlights: string[];
  tags: string[];
  images: string[];
  details: ProjectDetail;
}

const projects: ProjectData[] = [
  {
    id: "hyundai-3d",
    number: "Project 01",
    title: "Hyundai Immersive Remote Control",
    tagline: "\"3D 기술을 심미적 요소를 넘어, 사용성을 극대화하는 기능적 도구로 재해석하다.\"",
    subtitle: "Hyundai Motor Group",
    role: "UX/UI Design • System Architecture",
    description: "2D 평면적 제어를 넘어 Unity 기반 3D 경험을 모바일 UI에 이식했습니다. 차량의 상태를 실시간으로 시각화하여 직관성을 높였습니다.",
    impactHighlights: [
      "디자인 특허 출원: 3D 모델 & 애니메이션 결합 UI",
      "현대차 EV9 등 플래그십 전기차 실제 서비스 탑재",
      "차량 상태 인지 속도 및 브랜드 이미지 평가 획득"
    ],
    tags: ["3D Interaction", "Unity", "Patent"],
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    ],
    details: {
      challenge: [
        "기존 2D 화면의 직관성 부족 (문 개폐, 라이트 상태 등 파악 어려움)",
        "모바일 환경에서의 고품질 3D 실시간 렌더링 최적화 (발열, 속도)",
        "단순 뷰어를 넘어선 실질적 상호작용 경험 설계"
      ],
      solution: [
        "Immersive Interaction: 0.5초 이내 반응하는 실시간 동기화 애니메이션",
        "UI와 3D의 시각적 통합: 독창적 UI 구조로 화상 디자인 특허 출원",
        "Technical Directing: 폴리곤 수, 텍스처 베이킹 가이드라인 수립으로 개발 부하 절감"
      ],
      impact: [
        "특허 출원: 독자적인 UI 디자인 권리 보호",
        "양산 적용: EV9 등 주요 모델 실제 서비스 탑재",
        "정성적 성과: 인지 속도 향상 및 첨단 이미지 구현 평가"
      ]
    }
  },
  {
    id: "design-system",
    number: "Project 02",
    title: "Integrated Design System (H/K/G)",
    tagline: "\"3개 브랜드의 파편화된 리소스를 하나의 논리로 통합하여 운영 효율을 혁신하다.\"",
    subtitle: "Design Ops • Multi-brand",
    role: "Design System Lead",
    description: "현대, 기아, 제네시스 3개 브랜드의 디자인 가이드를 통합하여 클릭 한 번으로 테마 전환이 가능한 시스템을 구축했습니다.",
    impactHighlights: [
      "업무 효율 40% 증가: 디자인 티켓 처리 건수 단축",
      "개발 시간 25% 단축: 코드-디자인 토큰(JSON) 일치",
      "글로벌 규제 EAA 가이드라인 100% 충족"
    ],
    tags: ["Figma Variables", "Multi-brand", "EAA Compliance"],
    images: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop"
    ],
    details: {
      challenge: [
        "3개 브랜드의 파편화된 라이브러리로 인한 디자인/개발 리소스 3배 투입",
        "유럽 접근성 법안(EAA) 준수를 위한 엄격한 규정 대응 필요"
      ],
      solution: [
        "One System, Three Skins: 멀티 브랜드 토큰 시스템 설계",
        "Figma Variable 활용: 클릭 한 번으로 브랜드 테마 전환 환경 구축",
        "EAA Compliance: 색각 이상자 시뮬레이션 및 명도 대비 자동 검증 내재화"
      ],
      impact: [
        "업무 효율 40% 증가: 중복 작업 최소화",
        "개발 커뮤니케이션 비용 절감: 디자인 토큰 동기화",
        "글로벌 표준 준수로 유럽 시장 리스크 해소"
      ]
    }
  },
  {
    id: "design-ops-ai",
    number: "Project 03",
    title: "Design Ops & AI Tools",
    tagline: "\"반복적인 업무를 혐오합니다. 그래서 AI로 나만의 도구를 직접 개발했습니다.\"",
    subtitle: "Internal Productivity",
    role: "Figma Plugin Developer",
    description: "단순 반복 노동을 줄이기 위해 AI(Vibe Coding)를 활용하여 다국어 자동화 및 일괄 스타일 변경 플러그인을 직접 개발했습니다.",
    impactHighlights: [
      "시간 단축 90%: 다국어 적용 10시간 → 10분 단축",
      "정합성 100%: 자동화로 인한 휴먼 에러 제로 달성",
      "디자인 팀 내 엔지니어링 마인드셋 전파"
    ],
    tags: ["Vibe Coding", "Figma Plugin", "Automation"],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
    ],
    details: {
      challenge: [
        "20개 국어 텍스트 수동 복사/붙여넣기로 인한 빈번한 휴먼 에러",
        "브랜드 리뉴얼 시 수백 개 화면의 스타일 수동 교체 작업"
      ],
      solution: [
        "Vibe Coding 활용: AI를 통해 Javascript 기반 피그마 플러그인 개발",
        "Localization Plugin: CSV 연동 다국어 Variable 자동 생성",
        "Batch Styler: 특정 토큰 일괄 탐색 및 1초 업데이트 스크립트"
      ],
      impact: [
        "획기적 시간 단축: 수동 작업 대비 90% 이상 속도 향상",
        "데이터 정합성 확보: 오타 및 누락률 0% 달성",
        "팀 생산성 극대화 및 혁신 문화 확산"
      ]
    }
  }
];

const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-6 px-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
          className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-sm hover:bg-white transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-white' : 'w-1 bg-white/40'}`}
            />
          ))}
        </div>
        <button 
          onClick={() => setIndex((index + 1) % images.length)}
          className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-sm hover:bg-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ImpactTicker = ({ items }: { items: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="h-14 overflow-hidden relative bg-brand-50/30 rounded-xl px-4 flex items-center border border-brand-100/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 text-brand-700 font-bold text-[13px] md:text-sm w-full"
        >
          <Trophy size={16} className="text-brand-500 shrink-0" />
          <span className="truncate">{items[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CaseStudyAccordion = ({ title, items, icon: Icon, colorClass, isOpen, onClick }: { 
  title: string, 
  items: string[], 
  icon: any, 
  colorClass: string,
  isOpen: boolean,
  onClick: () => void
}) => {
  return (
    <div className={`mb-3 overflow-hidden transition-all duration-300 rounded-2xl border ${isOpen ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent hover:bg-slate-100/80'}`}>
      <button 
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between group text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? colorClass : 'bg-slate-200 text-slate-500'}`}>
            <Icon size={18} />
          </div>
          <span className={`font-bold text-[14px] md:text-[15px] transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-500'}`}>{title}</span>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Plus size={18} className={isOpen ? 'text-brand-500' : 'text-slate-400'} />
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-5 pb-6 pt-1 ml-11">
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 text-slate-600 text-[13px] md:text-[14px] leading-relaxed"
                  >
                    <ArrowRight size={14} className="mt-1 text-brand-300 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard: React.FC<{ project: ProjectData, align: 'left' | 'right' }> = ({ project, align }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-40 last:mb-0 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      {/* Left: Visual Display */}
      <div className="w-full lg:w-[50%] lg:sticky lg:top-28">
        <div className="aspect-[1.25/1] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] border border-slate-100 bg-white group">
          <ImageSlider images={project.images} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between px-2 gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span key={t} className="px-3 py-1 bg-white text-slate-500 text-[11px] font-bold border border-slate-100 rounded-full uppercase tracking-tight">
                {t}
              </span>
            ))}
          </div>
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{project.role.split('•')[0].trim()}</div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="w-full lg:w-[50%]">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-brand-600 font-mono text-xs font-bold tracking-widest">{project.number}</span>
            <div className="w-8 h-[2px] bg-brand-100 rounded-full" />
            <span className="text-slate-400 font-medium text-xs tracking-wide">{project.subtitle}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-brand-600 font-semibold text-[14px] md:text-[15px] leading-relaxed mb-6">
            {project.tagline}
          </p>
          
          <p className="text-slate-500 leading-relaxed text-[15px] max-w-lg mb-8">
            {project.description}
          </p>
          
          <ImpactTicker items={project.impactHighlights} />
        </div>

        <div className="space-y-1">
          <CaseStudyAccordion 
            title="The Challenge" 
            items={project.details.challenge} 
            icon={AlertCircle} 
            colorClass="bg-red-50 text-red-500"
            isOpen={openSection === 'challenge'}
            onClick={() => toggleSection('challenge')}
          />
          <CaseStudyAccordion 
            title="The Solution" 
            items={project.details.solution} 
            icon={Lightbulb} 
            colorClass="bg-indigo-50 text-brand-600"
            isOpen={openSection === 'solution'}
            onClick={() => toggleSection('solution')}
          />
          <CaseStudyAccordion 
            title="The Impact" 
            items={project.details.impact} 
            icon={CheckCircle2} 
            colorClass="bg-emerald-50 text-emerald-600"
            isOpen={openSection === 'impact'}
            onClick={() => toggleSection('impact')}
          />
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[11px] mb-4 bg-brand-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-100/50">
            <Trophy size={14} className="animate-bounce" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Featured Case Studies</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl leading-relaxed">
            심미성을 넘어 <span className="text-brand-600 font-bold underline decoration-brand-200 decoration-2 underline-offset-4">데이터와 시스템</span>으로 <br/>
            복잡한 비즈니스 문제를 해결한 기록들입니다.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              align={idx % 2 === 0 ? 'left' : 'right'} 
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
};