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
  cropFocus?: boolean;
  backgroundColors?: string[];
}

const projects: ProjectData[] = [
  {
    id: "hyundai-3d",
    number: "Project 01",
    title: "기아차 3D 원격 제어 UXUI",
    tagline: "\"3D 기술을 심미적 요소를 넘어, 사용성을 극대화하는 기능적 도구로 재해석하다.\"",
    subtitle: "Hyundai Motor Group",
    role: "UX/UI Design • System Architecture",
    description: "2D 평면적 제어를 넘어 glTF 기반 3D 경험을 모바일 UI에 이식했습니다. 차량의 상태(도어, 트렁크, 공조, 충전)를 실시간으로 시각화하여 직관성을 높였습니다.",
    impactHighlights: [
      "디자인 특허 출원: 3D 모델 & 애니메이션 결합 UI",
      "현대차 EV9 등 플래그십 전기차 실제 서비스 탑재",
      "차량 상태 인지 속도 및 브랜드 이미지 평가 획득"
    ],
    tags: ["3D Interaction", "glTF", "Real-time Sync"],
    cropFocus: true,
    backgroundColors: [
      "#1a1a1a",  // Battery Charging - very dark
      "#252525",  // Climate Control - slightly lighter
      "#1f1f1f",  // Speed Dynamics - dark
      "#2d2d2d",  // Image 3 - medium dark
      "#1a1a1a"   // Trunk Control - very dark
    ],
    images: [
      "/video1.mov",
      "/video2.mov",
      "/video3.mov",
      "/input_file_0.png",
      "/input_file_1.png",
      "/input_file_2.png",
      "/input_file_4.png"
    ],
    details: {
      challenge: [
        "기존 2D 화면의 직관성 부족 (문 개폐, 라이트 상태 등 파악 어려움)",
        "모바일 환경에서의 고품질 3D 실시간 렌더링 최적화 (발열, 속도)",
        "단순 뷰어를 넘어선 실질적 상호작용 경험 설계"
      ],
      solution: [
        "Immersive Interaction: 0.5초 이내 반응하는 실시간 동기화 애니메이션",
        "다양한 상태 제어: 도어/트렁크 개폐, 공조 및 배터리 충전 상태의 3D 시각화",
        "Technical Directing: 폴리곤 수 및 텍스처 가이드라인 수립으로 개발 부하 절감"
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
    title: "통합 디자인 시스템 구축 (H/K/G)",
    tagline: "\"3개 브랜드, 3벌의 파일을 '하나의 시스템'으로 통합하여 개발 효율과 규제 대응 속도를 혁신하다.\"",
    subtitle: "Design Ops • Multi-brand",
    role: "Design System Lead",
    description: "현대, 기아, 제네시스 3개 브랜드의 디자인 파일을 Figma Variables로 통합하여 단 1벌의 마스터 파일로 운영. 모드 전환만으로 3개 브랜드 디자인을 즉시 산출하고, 갑작스러운 EAA 규제에도 지연 없이 대응했습니다.",
    impactHighlights: [
      "파일 관리 리소스 66% 절감: 3벌 → 1벌 통합",
      "개발 생산성 향상: 공통 컴포넌트로 동시 업데이트 가능",
      "민첩한 리스크 관리: EAA 대응 프로세스 표준화"
    ],
    tags: ["Figma Variables", "Multi-brand", "EAA Compliance"],
    backgroundColors: [
      "#2a2a2a",  // Figma Variables view - dark
      "#f5f5f5",  // Design framework diagram - light
      "#1a1a1a",  // Multi-brand screens - very dark
      "#f8f8f8",  // System architecture - very light
      "#f0f0f0"   // Stakeholder workflow - light gray
    ],
    images: [
      "/p2v1.mp4",
      "/p2v2.mp4",
      "/p2v3.mp4",
      "/design-system-1.png",
      "/design-system-2.png",
      "/design-system-3.png",
      "/design-system-4.png"
    ],
    details: {
      challenge: [
        "리소스의 파편화 (N x 3의 비효율): 3개 브랜드가 각각 별도의 디자인 라이브러리와 3벌의 스크린 파일을 운영하여 단순 수정에도 3번 반복 작업 필요, 휴먼 에러 발생 확률 증가",
        "프로젝트 중간에 떨어진 'EAA 규제': 유럽 접근성 법안(EAA) 준수 요건 추가로, 기존 방식으로는 수백 장의 스크린을 수동 조절하거나 별도 라이브러리 스왑이 필요한 일정 지연 불가피 상황"
      ],
      solution: [
        "Variable 기반의 파일 통합 (3 to 1): Figma Variables로 브랜드별 컬러·폰트·코너 라운드를 토큰화하여 3벌의 파일을 1벌의 마스터 파일로 통합, 모드 전환만으로 3개 브랜드 디자인 즉시 산출",
        "EAA 대응 시뮬레이션 시스템: 별도 라이브러리 스왑 없이 'EAA Mode' 배리어블 추가로 명도 대비·텍스트 크기 이슈를 즉시 시뮬레이션 및 수정, 수동 작업 0으로 단축",
        "개발 공통 컴포넌트(Common Component) 구축: 코드 레벨에서도 공통 컴포넌트 구조 수립, 브랜드별 스타일 값(CSS/Theme)만 호출하는 방식으로 디자인-개발 리드타임 최소화"
      ],
      impact: [
        "운영 효율 극대화: 3벌의 디자인 원본 파일을 1벌로 통합하여 파일 관리 및 유지보수 리소스 66% 절감",
        "개발 생산성 향상: 공통 컴포넌트 도입으로 중복 코딩 방지, 3사 브랜드 앱의 동시 업데이트 가능한 배포 파이프라인 구축 기여",
        "민첩한 리스크 관리: 갑작스러운 EAA 이슈에도 프로젝트 지연 없이 대응 완료, 배리어블 모드 기반 테스트 프로세스는 글로벌 확장 시 표준 매뉴얼로 채택"
      ]
    }
  },
  {
    id: "design-ops-ai",
    number: "Project 03",
    title: "피그마 플러그인 & 협업 툴 혁신",
    tagline: "\"보안과 언어의 장벽을 기술로 넘다. 워크플로우를 설계하고 도구를 만드는 Design Ops.\"",
    subtitle: "Internal Productivity",
    role: "Product Owner • Tool Developer",
    description: "32개 언어 관리와 보안망 제약을 내부 툴 개발로 해결. Lokalise-Figma 파이프라인과 Jira 연동 플러그인을 직접 설계하여 글로벌 워크플로우를 혁신했습니다.",
    impactHighlights: [
      "협업 속도 증대: 보안망 단절 해소, 기획-디자인-개발 연결",
      "AI 자동화 준비: MCP 기반 32개국어 QA 시스템 설계",
      "Design Ops 문화: 기술로 불편함을 해결하는 리더십 정착"
    ],
    tags: ["Lokalise", "MCP", "Figma Plugin"],
    backgroundColors: [
      "#4a4a4a",  // Lokalise Variables - medium gray
      "#3a3a3a",  // Jira-Figma Sync - dark gray
      "#5a5a5a",  // Icon Changer - lighter gray
      "#f5f5f5",  // Lokalise Plugin setup - light
      "#2a2a2a",  // LokaVarLink - very dark
      "#1a1a1a"   // Original image - darkest
    ],
    images: [
      "/design-ops-1.jpg",
      "/design-ops-2.jpg",
      "/design-ops-3.jpg",
      "/design-ops-4.jpg",
      "/design-ops-5.jpg",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    ],
    details: {
      challenge: [
        "32개국어 검수의 한계: 글로벌 서비스 운영 시 각 언어별 UI 깨짐과 오역을 사람이 일일이 검수하는 것은 불가능에 가까웠고, 품질 리스크로 직결",
        "보안망에 갇힌 비효율: 높은 보안 정책으로 Jira-Figma 표준 연동 차단, 디자이너들이 보안망을 넘나들며 티켓 상태를 확인해야 하는 커뮤니케이션 로스 발생"
      ],
      solution: [
        "Product Owner of Internal Tools: 디자인 팀 병목을 해결하는 내부 툴의 PO 역할 수행, 문제 정의부터 로직 설계까지 사내 개발팀과 협업",
        "Lokalise Pipeline & AI Vision: (Step 1) Lokalise 스트링을 Figma Variable로 자동 변환/주입하는 플러그인 개발, (Step 2 - Future) MCP(Model Context Protocol) 활용, 32개국어의 UI 오버플로우 및 문맥 오류를 AI가 자동 탐지하는 QA 자동화 시스템 준비 중",
        "Security-Compliant Jira Plugin: 보안망을 우회하지 않으면서 Jira 데이터를 안전하게 호출하는 로직 고안, 피그마 내에서 디자인과 연결된 Jira 티켓 상태를 실시간 동기화·관리하는 커스텀 플러그인 구축"
      ],
      impact: [
        "Workflow Innovation: 보안 이슈로 단절된 기획-디자인-개발 연결 고리를 잇는 플러그인 도입으로 협업 속도 증대 및 히스토리 관리 자동화",
        "Scalability for AI: 단순 다국어 적용을 넘어 AI(LLM)가  디자인 데이터를 읽고 검수할 수 있는 'Machine Readable'한 Variable 구조 마련, 차세대 자동화 초석 구축",
        "Leadership: '불편함은 감수하는 것이 아니라 기술로 해결하는 것'이라는 Design Ops 문화를 팀 내 정착"
      ]
    }
  }
];

const ImageSlider = ({ images, cropFocus, backgroundColors }: { images: string[], cropFocus?: boolean, backgroundColors?: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isVideo = (src: string) => {
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
    setIsVideoPlaying(false);
    setIsVideoLoaded(false);
  };

  // Intersection Observer to detect when slider is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        // Reset to first slide when coming into view
        if (inView && index !== 0) {
          setIndex(0);
          setIsVideoPlaying(false);
          setIsVideoLoaded(false);
        }
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-advance timer - only when in viewport AND content is ready
  useEffect(() => {
    if (images.length === 0 || !isInView) return;

    const currentIsVideo = isVideo(images[index]);

    // For videos: wait until loaded AND playing, or if playing has ended
    if (currentIsVideo && (!isVideoLoaded || isVideoPlaying)) {
      return;
    }

    const timer = setTimeout(() => {
      goToNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [images.length, index, isVideoPlaying, isVideoLoaded, isInView]);

  const handleVideoStart = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoEnded = () => {
    goToNext();
  };

  const currentBgColor = backgroundColors && backgroundColors[index] ? backgroundColors[index] : '#e2e8f0';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden group transition-colors duration-700"
      style={{ backgroundColor: currentBgColor }}
    >
      <AnimatePresence mode="wait">
        {isVideo(images[index]) ? (
          <motion.video
            key={index}
            ref={videoRef}
            src={images[index]}
            autoPlay
            loop={false}
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoaded}
            onPlay={handleVideoStart}
            onEnded={handleVideoEnded}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ${cropFocus ? 'scale-110 origin-center' : ''}`}
            style={cropFocus ? { objectPosition: 'center center' } : {}}
          />
        ) : (
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ${cropFocus ? 'scale-110 origin-center' : ''}`}
            style={cropFocus ? { objectPosition: 'center center' } : {}}
          />
        )}
      </AnimatePresence>


      <div className="absolute inset-x-0 bottom-6 px-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
          className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full text-slate-800 shadow-md hover:bg-white transition-all transform active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2 bg-slate-900/20 backdrop-blur-md px-3 py-1.5 rounded-full">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full text-slate-800 shadow-md hover:bg-white transition-all transform active:scale-90"
        >
          <ChevronRight size={20} />
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
    <div className={`mb-2 overflow-hidden transition-all duration-300 rounded-xl border ${isOpen ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent hover:bg-slate-100/80'}`}>
      <button
        onClick={onClick}
        className="w-full px-4 py-3 flex items-center justify-between group text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? colorClass : 'bg-slate-200 text-slate-500'}`}>
            <Icon size={16} />
          </div>
          <span className={`font-bold text-[13px] md:text-[14px] transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-500'}`}>{title}</span>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Plus size={16} className={isOpen ? 'text-brand-500' : 'text-slate-400'} />
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
            <div className="px-4 pb-4 pt-0 ml-9">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-2.5 text-slate-600 text-[13px] md:text-[14px] leading-relaxed"
                  >
                    <ArrowRight size={14} className="mt-1 text-brand-400 shrink-0" />
                    <span className="text-slate-700">
                      {(() => {
                        const colonIndex = item.indexOf(':');
                        if (colonIndex > 0) {
                          const label = item.substring(0, colonIndex + 1);
                          const content = item.substring(colonIndex + 1);
                          return (
                            <>
                              <strong className="font-bold text-slate-900">{label}</strong>
                              {content}
                            </>
                          );
                        }
                        return item;
                      })()}
                    </span>
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
    <div className={`flex flex-col lg:flex-row gap-4 lg:gap-24 items-start ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      {/* Left: Visual Display */}
      <div className="w-full lg:w-[50%] lg:sticky lg:top-32 order-2 lg:order-1">
        <div className="aspect-[1.25/1] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] border border-slate-100 bg-white group">
          <ImageSlider images={project.images} cropFocus={project.cropFocus} backgroundColors={project.backgroundColors} />
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
      <div className="w-full lg:w-[50%] py-4 order-1 lg:order-2">
        <div className="mb-0 lg:mb-10">
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

          <p className="text-slate-500 leading-relaxed text-[15px] max-w-lg mb-2 lg:mb-8">
            {project.description}
          </p>

          <ImpactTicker items={project.impactHighlights} />
        </div>
      </div>

      {/* Challenge/Solution/Impact Accordions - Separate container for mobile ordering */}
      <div className="w-full lg:w-[50%] order-3 lg:order-2">
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
    <section id="projects" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32 md:mb-48 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[11px] mb-4 bg-brand-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-100/50">
            <Trophy size={14} className="animate-bounce" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Featured Case Studies</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl leading-relaxed">
            심미성을 넘어 <span className="text-brand-600 font-bold underline decoration-brand-200 decoration-2 underline-offset-4">데이터와 시스템</span>으로 <br />
            복잡한 비즈니스 문제를 해결한 기록들입니다.
          </p>
        </div>

        <div className="space-y-32 md:space-y-48">
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