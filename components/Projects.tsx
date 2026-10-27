import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, Play, Image as ImageIcon, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { Eyebrow } from './Eyebrow';

interface ProjectDetail {
  challenge: { ko: string[]; en: string[] };
  solution: { ko: string[]; en: string[] };
  impact: { ko: string[]; en: string[] };
}

interface ProjectData {
  id: string;
  number: string;
  title: { ko: string; en: string };
  tagline: { ko: string; en: string };
  subtitle: string;
  role: string;
  description: { ko: string; en: string };
  impactHighlights: { ko: string[]; en: string[] };
  tags: string[];
  images: string[];
  details: ProjectDetail;
  cropFocus?: boolean;
  backgroundColors?: string[];
  hidden?: boolean;
  articleSlug?: string;
}

const projects: ProjectData[] = [
  {
    id: "hyundai-3d",
    number: "Project 01",
    title: { ko: "기아 EV9 3D 원격 제어", en: "Kia EV9 3D Remote Control" },
    tagline: { ko: "공용 2D 이미지와 버튼 나열 대신, 내 차를 보면서 제어하는 화면", en: "Instead of a shared 2D silhouette and a stack of buttons, a screen where you control the car while looking at it" },
    subtitle: "Kia · Hyundai · Genesis App",
    role: "Product Design • 3D Interaction",
    description: {
      ko: "EV9 전용. 원격 제어 화면은 세단·SUV·해치백 3종 공용 2D 이미지에 버튼을 나열한 구조였음. 여기에 3D 모델을 넣어 도어·트렁크·공조·충전 상태를 차 위에서 바로 보이게 함.",
      en: "EV9 only. The remote control screen was one of three shared 2D silhouettes with buttons stacked on top. A 3D model replaced it, so door, trunk, climate and charging states show on the car itself."
    },
    impactHighlights: {
      ko: [
        "3D 모델 + 애니메이션 UI, 디자인 특허 출원",
        "EV9 양산 적용, 최초 실행 웰커밍 애니메이션",
        "차종별 카메라 높이·중심점·회전 범위 규칙 정의"
      ],
      en: [
        "Design patent filed for the 3D + animation UI",
        "Shipped on EV9, welcome animation on first launch",
        "Per-model rules for camera height, pivot and rotation range"
      ]
    },
    tags: ["3D Interaction", "Real-time Status", "Motion"],
    cropFocus: true,
    backgroundColors: [
      "#1a1a1a", "#252525", "#1f1f1f", "#2d2d2d", "#1a1a1a", "#252525", "#1f1f1f"
    ],
    images: [
      "/video1.mov", "/video2.mov", "/video3.mov", "/input_file_0.png", "/input_file_1.png", "/input_file_2.png", "/input_file_4.png"
    ],
    details: {
      challenge: {
        ko: [
          "공용 2D 이미지: 문 열림, 충전 중 같은 상태가 텍스트와 버튼 색으로만 표시돼 한눈에 안 들어옴. 내 차 같지도 않음",
          "차종별 형상 차이: 모델마다 색·크기·비율이 달라 같은 2D 레이아웃 안에서 카메라 높이, 중심점, 회전 한계를 모델별로 따로 잡아야 했음",
          "모바일 3D 부하: 발열·로딩 없이 0.5초 안에 상태 변화가 보여야 함"
        ],
        en: [
          "Shared 2D image: open doors or charging shown only as text and button colour, hard to read at a glance, and it never looks like your car",
          "Every model differs: colour, size and proportions change per model, so camera height, pivot and rotation limits had to be set one by one inside the same 2D layout",
          "3D on a phone: state changes must appear within 0.5 s with no heat or loading"
        ]
      },
      solution: {
        ko: [
          "상태 시각화: 도어·트렁크·공조·충전 상태를 텍스트 대신 3D 모델 위에 표시. 주행 중에도 흘깃 보면 읽힘",
          "차량 중심 트랜지션: 제어 페이지로 들어갈 때 카메라가 차를 축으로 돌아 화면이 끊기지 않음",
          "차종별 파라미터: 카메라 높이·중심점·회전 범위를 모델별 값으로 정의. 모델이 추가돼도 레이아웃이 안 깨짐. 폴리곤·텍스처 가이드로 개발 부하 줄임",
          "3D 전용 UI: 모델이 주인공이 되도록 버튼 상태, 레이아웃, 플로우, 색을 2D 버전과 다르게 잡음"
        ],
        en: [
          "State on the model: door, trunk, climate and charging shown on the 3D car instead of text. A glance while driving is enough",
          "Car-centred transitions: entering a control page orbits the camera around the car, so the screen never cuts",
          "Per-model parameters: camera height, pivot and rotation range defined per model. New models don't break the layout. Polygon and texture guidelines keep dev load down",
          "UI built for 3D: button states, layout, flow and colour set apart from the 2D version so the model stays the hero"
        ]
      },
      impact: {
        ko: [
          "디자인 특허 출원",
          "기아 EV9 양산 탑재",
          "내부 평가: 상태 인지 빨라짐, 기술 브랜드 이미지에 기여"
        ],
        en: [
          "Design patent filed",
          "Shipped in the Kia EV9",
          "Internal review: faster state recognition, stronger tech image"
        ]
      }
    }
  },
  {
    id: "design-system",
    number: "Project 04",
    title: { ko: "현대·기아·제네시스 통합 디자인 시스템", en: "Hyundai · Kia · Genesis Unified Design System" },
    tagline: { ko: "세 브랜드 세 벌의 파일을 한 벌로. 모드 전환 하나로 세 앱 디자인이 나옴", en: "Three brands, three file sets, one master. Switch a mode and all three apps come out" },
    subtitle: "Design Ops · Multi-brand",
    role: "Design System Lead",
    description: {
      ko: "브랜드별로 따로 굴리던 디자인 파일을 Figma Variables로 토큰화해 마스터 파일 한 벌로 합침. 프로젝트 중간에 들어온 유럽 접근성 법안(EAA) 대응도 일정 지연 없이 처리.",
      en: "Design files run separately per brand, tokenised with Figma Variables and merged into one master. The European Accessibility Act (EAA) requirement that landed mid-project was handled with no schedule slip."
    },
    impactHighlights: {
      ko: [
        "파일 3벌 → 1벌, 관리 리소스 66% 절감",
        "공통 컴포넌트로 세 앱 동시 업데이트",
        "EAA 모드 변수로 접근성 검증을 파일 안에서"
      ],
      en: [
        "Three file sets → one, 66% less maintenance",
        "Shared components update all three apps at once",
        "EAA mode variables check accessibility inside the file"
      ]
    },
    tags: ["Design System", "Figma Variables", "Multi-brand"],
    
    backgroundColors: [
      "#1a1a1a", "#1a1a1a", "#1a1a1a", "#f5f5f5", "#f8f8f8", "#f0f0f0", "#f5f5f5"
    ],
    images: [
      "/p2v1.mp4", "/p2v2.mp4", "/p2v3.mp4", "/design-system-1.png", "/design-system-2.png", "/design-system-3.png", "/design-system-4.png"
    ],
    details: {
      challenge: {
        ko: [
          "N × 3: 브랜드마다 라이브러리와 스크린 파일을 따로 운영. 단순 수정도 세 번 반복, 그만큼 실수도 늘어남",
          "중간에 들어온 EAA: 기존 방식이면 수백 장을 손으로 고치거나 라이브러리를 통째로 바꿔야 했음. 일정 지연 확정"
        ],
        en: [
          "N × 3: separate libraries and screen files per brand. Every change done three times, three chances to slip",
          "EAA mid-project: under the old setup, hundreds of screens to hand-edit or a full library swap. A guaranteed delay"
        ]
      },
      solution: {
        ko: [
          "변수 기반 통합(3 → 1): 컬러·폰트·코너 라운드를 토큰화. 모드 전환으로 브랜드별 디자인이 바로 나옴",
          "EAA 모드: 라이브러리를 바꾸지 않고 변수만 추가해 명도 대비·텍스트 크기 이슈를 파일 안에서 바로 확인",
          "공통 컴포넌트: 코드에서도 브랜드별 스타일 값만 호출하는 구조. 디자인–개발 리드타임 줄임"
        ],
        en: [
          "Variable-based merge (3 → 1): colour, type and radius tokenised. Switch a mode, get each brand's design",
          "EAA mode: variables added instead of swapping libraries, contrast and text-size issues checked inside the file",
          "Shared components: code calls only brand style values. Shorter design-to-dev lead time"
        ]
      },
      impact: {
        ko: [
          "파일 관리·유지보수 리소스 66% 절감",
          "세 브랜드 앱 동시 업데이트 가능한 배포 흐름",
          "EAA 지연 없이 대응. 변수 모드 테스트 방식은 글로벌 확장 표준 매뉴얼로 채택"
        ],
        en: [
          "66% less file management and maintenance",
          "A release flow that updates all three brand apps together",
          "EAA met without delay. The variable-mode test became the standard manual for global rollout"
        ]
      }
    }
  },
  {
    id: "design-ops-ai",
    hidden: true,
    number: "Project 05",
    title: { ko: "32개 언어 디자인 워크플로우", en: "32-language Design Workflow" },
    tagline: { ko: "32개 언어 검수와 끊어진 Jira 연동, 디자인 팀이 직접 만든 플러그인으로 해결", en: "32-language QA and a severed Jira link, fixed with plugins the design team built" },
    subtitle: "Hyundai Motor Group · Internal Tools",
    role: "Product Owner • Tool Design",
    description: {
      ko: "글로벌 앱은 32개 언어로 나감. 언어별 UI 깨짐을 사람이 다 볼 수 없었고, 보안 정책 때문에 Jira–Figma 연동도 막혀 있었음. 둘 다 내부 도구로 풀기로 하고 기획부터 로직 설계까지 PO로 참여, 사내 개발팀과 함께 만듦.",
      en: "The app ships in 32 languages. Nobody could check every layout break by eye, and security policy blocked the Jira–Figma integration. Both became internal tools. I was product owner from spec to logic design, building with the in-house dev team."
    },
    impactHighlights: {
      ko: [
        "Lokalise 스트링 → Figma Variables 자동 주입 플러그인",
        "보안 정책 안에서 동작하는 Jira 연동 플러그인",
        "MCP 기반 32개 언어 AI QA 준비 중"
      ],
      en: [
        "Plugin that injects Lokalise strings into Figma Variables",
        "Jira plugin that works within security policy",
        "MCP-based AI QA across 32 languages in progress"
      ]
    },
    tags: ["Design Ops", "Figma Plugin", "Localization"],
    articleSlug: "design-ops-inside-the-firewall",
    backgroundColors: [
      "#1a1a1a", "#1a1a1a", "#1a1a1a", "#3a3a3a", "#2a2a2a"
    ],
    images: [
      "/p3v1.mp4", "/p3v2.mp4", "/p3v3.mp4", "/design-ops-2.jpg", "/design-ops-5.jpg"
    ],
    details: {
      challenge: {
        ko: [
          "32개 언어 검수: 언어별 UI 깨짐·오역을 사람이 눈으로 확인. 놓친 건 QA에서 되돌아옴",
          "보안망 단절: Jira–Figma 표준 연동이 막혀 디자이너가 보안망 안팎을 오가며 티켓 확인"
        ],
        en: [
          "32-language QA: layout breaks and mistranslations checked by eye. Misses came back from QA",
          "Firewall gap: the standard Jira–Figma integration blocked, designers crossing networks just to check a ticket"
        ]
      },
      solution: {
        ko: [
          "Lokalise 파이프라인: 번역 스트링을 Figma Variables로 자동 변환·주입. 모드 전환으로 32개 언어를 화면에서 바로 봄",
          "Jira 플러그인: 보안 정책이 허용하는 범위에서 티켓 데이터를 호출. 피그마 안에서 디자인에 연결된 티켓 상태를 봄",
          "AI QA(진행 중): MCP로 LLM이 언어별 오버플로우·문맥 오류를 먼저 걸러내는 구조"
        ],
        en: [
          "Lokalise pipeline: translation strings converted and injected as Figma Variables. Switch a mode, see any of 32 languages on screen",
          "Jira plugin: ticket data fetched within what security policy allows. Ticket status visible on the design inside Figma",
          "AI QA (in progress): an LLM via MCP flags per-language overflow and context errors first"
        ]
      },
      impact: {
        ko: [
          "QA에서 돌아오던 다국어 이슈를 디자인 단계에서 잡음",
          "기획–디자인–개발 연결 복구, 히스토리 자동 기록",
          "'불편은 기술로 푼다'는 팀 습관"
        ],
        en: [
          "Localisation issues caught at design time instead of QA",
          "Planning–design–dev link restored, history recorded on its own",
          "A team habit: fix friction with tools"
        ]
      }
    }
  },
  // Hidden from the site. Remove `hidden` to bring it back.
  {
    id: "systemic-icon",
    hidden: true,
    number: "Project 04",
    title: { ko: "Systemic Icon", en: "Systemic Icon" },
    tagline: { ko: "\"혼자서도 대기업 규모의 아이콘 시스템을 운용할 수 있다면?\"", en: "\"What if one designer could run an enterprise-scale icon system alone?\"" },
    subtitle: "Side Project • Intelligent IconOps",
    role: "Technical Designer • Developer",
    description: {
      ko: "디자이너가 아이콘 삽입 크기를 바꿀 때마다 선 두께를 수동으로 조정해야 하는 문제를 해결했습니다. Auto-Weight 엔진이 삽입 규칙을 기억하고, 피그마 5MB 용량 한계 내에서 4만 개 이상의 아이콘을 팀 전체가 버튼 하나로 동기화합니다.",
      en: "Solved the pain of manually re-adjusting stroke weights every time an icon is resized. The Auto-Weight engine remembers insertion rules automatically, while the whole team syncs 40,000+ icons in one click—all within Figma's 5MB storage limit."
    },
    impactHighlights: {
      ko: [
        "피그마 저장 용량 한계(5MB) 극복: 4만개 아이콘 인덱싱",
        "지능형 Auto-Weight 엔진으로 픽셀 완벽 대응",
        "128바이트 초경량 데이터 포맷으로 팀 동기화 혁신"
      ],
      en: [
        "Overcame Figma's 5MB limit: Indexed 40,000+ icons",
        "Pixel-perfect response via Auto-Weight engine",
        "Ultra-light 128-byte data format for team sync innovation"
      ]
    },
    tags: ["Figma Plugin", "IconOps", "Data Compression", "React"],
    backgroundColors: ["#0a0e1a", "#1e1b4b", "#1a1a1a"],
    images: ["/SI_screen_gifs/2_Auto_Stroke_Demo.gif", "/systemic-icon-mockup.png"],
    details: {
      challenge: {
        ko: [
          "피그마 플러그인의 5MB 데이터 저장 용량 제한으로 대규모 아이콘 뱅크 운영 불가",
          "아이콘 삽입 시마다 시스템에 맞는 선 두께(Stroke)를 일일이 수동 조절해야 하는 번거로움",
          "Outline/Filled 등 다양한 스타일 파편화로 인한 관리 복잡성"
        ],
        en: [
          "Inability to operate large icon banks due to Figma plugin's 5MB storage limit",
          "Manual stroke adjustment for every inserted icon to match system rules",
          "Management complexity due to fragmented styles (Outline/Filled)"
        ]
      },
      solution: {
        ko: [
          "1비트 비트마스크 압축 알고리즘: 데이터 크기를 혁신적으로 절감하여 4만 개 아이콘 수용",
          "지능형 Auto-Weight 엔진: 삽입 크기를 감지하여 선 두께(1px, 1.5px 등) 실시간 자동 설정",
          "Unified Naming System: 아웃라인과 필드 타입을 단일 규칙으로 통합 관리하는 로직 구현"
        ],
        en: [
          "1-bit Bitmask Compression: Reduced data size to accommodate 40,000+ icons",
          "Auto-Weight Engine: Real-time stroke adjustment based on insertion size",
          "Unified Naming System: Consolidated Outline/Filled styles under a single rule"
        ]
      },
      impact: {
        ko: [
          "아이콘 관리 리소스 90% 이상 절감: 4만 개 아이콘의 즉각적인 인덱싱 및 검색",
          "디자인 일관성 확보: 시스템화 된 선 두께 강제로 휴먼 에러 원천 차단",
          "팀 협업 생산성 향상: 비트마스크 기반의 초고속 동기화로 협업 병목 해소"
        ],
        en: [
          "90%+ Reduction in Icon Management: Instant indexing and search of 40,000+ icons",
          "Guaranteed Design Consistency: Forced system stroke rules eliminate human error",
          "Enhanced Team Synergy: Ultra-fast bitmask-based sync resolved collaboration bottlenecks"
        ]
      }
    }
  }
];

const isVideo = (src: string) => src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');

/* ───────────── Media viewer: manual navigation + thumbnails ───────────── */
const MediaViewer = ({ images, cropFocus, backgroundColors }: { images: string[], cropFocus?: boolean, backgroundColors?: string[] }) => {
  const [index, setIndex] = useState(0);
  const [missing, setMissing] = useState<Record<string, boolean>>({});

  const go = (i: number) => setIndex((i + images.length) % images.length);
  const current = images[index];
  const bg = backgroundColors?.[index] ?? '#e2e8f0';
  const isDark = (() => {
    const hex = bg.replace('#', '');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
  })();

  return (
    <div>
      <div
        className="relative aspect-[4/3] rounded-lg overflow-hidden group transition-colors duration-500 border border-slate-200/80"
        style={{ backgroundColor: bg }}
      >
        <AnimatePresence mode="wait">
          {isVideo(current) ? (
            <motion.video
              key={current}
              src={current}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 w-full h-full object-contain ${cropFocus ? 'scale-110 origin-center' : ''}`}
            />
          ) : missing[current] ? (
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              <div className={`w-12 h-12 rounded-lg border border-dashed flex items-center justify-center ${isDark ? 'border-slate-600' : 'border-slate-300'}`}>
                <ImageIcon size={20} />
              </div>
              <div className="text-[11px] font-mono tracking-wider uppercase">Image pending</div>
              <code className={`text-[11px] font-mono px-2 py-1 rounded ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>public{current}</code>
            </motion.div>
          ) : (
            <motion.img
              key={current}
              src={current}
              onError={() => setMissing(prev => ({ ...prev, [current]: true }))}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 w-full h-full object-contain ${cropFocus ? 'scale-110 origin-center' : ''}`}
            />
          )}
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
            <div className={`absolute bottom-3 right-3 px-2 py-1 rounded font-mono text-[11px] tabular-nums ${isDark ? 'bg-black/40 text-white/80' : 'bg-white/70 text-slate-600'}`}>
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {images.map((src, i) => {
            const active = i === index;
            const thumbBg = backgroundColors?.[i] ?? '#e2e8f0';
            return (
              <button
                key={src + i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`relative shrink-0 w-[72px] aspect-[4/3] rounded-md overflow-hidden border transition-all ${active ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                style={{ backgroundColor: thumbBg }}
              >
                {isVideo(src) ? (
                  <>
                    <video src={src} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={10} className="text-slate-900 ml-[1px]" fill="currentColor" />
                      </span>
                    </span>
                  </>
                ) : missing[src] ? (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-slate-400">{i + 1}</span>
                ) : (
                  <img
                    src={src}
                    alt=""
                    onError={() => setMissing(prev => ({ ...prev, [src]: true }))}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ───────────── Problem / Approach / Result (collapsed by default) ───────────── */
const DetailBlock = ({ index, title, items }: { index: string, title: string, items: string[] }) => (
  <div className="grid grid-cols-[auto_1fr] gap-x-5 md:gap-x-7">
    <div className="font-mono text-[11px] tracking-[0.18em] text-slate-400 tabular-nums pt-[2px]">{index}</div>
    <div>
      <h4 className="text-[13px] font-semibold text-slate-900 tracking-tight mb-2.5">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => {
          const colon = item.indexOf(':');
          const label = colon > 0 ? item.slice(0, colon) : null;
          const body = colon > 0 ? item.slice(colon + 1).trim() : item;
          return (
            <li key={i} className="text-[13.5px] leading-[1.65] text-slate-600">
              {label && <span className="font-semibold text-slate-900">{label} · </span>}
              {body}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const { language } = useTranslation();
  const [open, setOpen] = useState(false);
  const L = language === 'ko'
    ? { problem: '문제', approach: '접근', result: '결과', highlights: '요약', toggle: '펼치기' }
    : { problem: 'Problem', approach: 'Approach', result: 'Result', highlights: 'Highlights', toggle: 'Expand' };

  return (
    <article className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Grid cell stretches to the row; the inner wrapper sticks while the text column scrolls */}
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-24">
          <MediaViewer images={project.images} cropFocus={project.cropFocus} backgroundColors={project.backgroundColors} />
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 px-0.5">
            {project.tags.map(t => (
              <span key={t} className="text-[11px] font-mono tracking-wide text-slate-400">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-mono text-[11px] tracking-[0.18em] text-slate-900">{project.number.replace('Project ', '')}</span>
          <span className="w-6 h-px bg-slate-300" />
          <span className="text-[12px] text-slate-400">{project.subtitle}</span>
        </div>

        <h3 className="text-[26px] md:text-[30px] font-bold text-slate-900 leading-[1.2] tracking-tight mb-3">
          {project.title[language]}
        </h3>
        <p className="text-[15px] md:text-[16px] text-slate-800 leading-relaxed mb-4 font-medium">
          {project.tagline[language]}
        </p>
        <p className="text-[14px] text-slate-500 leading-[1.75] mb-7">
          {project.description[language]}
        </p>

        <div className="border-y border-slate-200 py-4">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-slate-400 mb-2.5">{L.highlights}</div>
          <ul className="space-y-1.5">
            {project.impactHighlights[language].map((h, i) => (
              <li key={i} className="flex gap-3 text-[13.5px] text-slate-800 leading-relaxed">
                <span className="mt-[9px] w-1 h-1 rounded-full bg-slate-900 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-label={L.toggle}
          className="group w-full flex items-center justify-between py-4 border-b border-slate-200 text-slate-900 hover:text-brand-600 transition-colors"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-slate-500 group-hover:text-brand-600 transition-colors">
            {L.problem} · {L.approach} · {L.result}
          </span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>

        {project.articleSlug && (
          <a
            href={`#insights/${project.articleSlug}`}
            className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-medium text-slate-900 hover:text-brand-600 transition-colors"
          >
            {language === 'ko' ? '자세한 글 보기' : 'Read the full story'} <ArrowUpRight size={14} />
          </a>
        )}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-7 space-y-8">
                <DetailBlock index="01" title={L.problem} items={project.details.challenge[language]} />
                <DetailBlock index="02" title={L.approach} items={project.details.solution[language]} />
                <DetailBlock index="03" title={L.result} items={project.details.impact[language]} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export const Projects: React.FC<{ onViewCaseStudy?: () => void }> = () => {
  const { t } = useTranslation();
  const visible = projects.filter(p => !p.hidden);

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <Eyebrow>{t('projects.badge')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.1]">{t('projects.title')}</h2>
        </div>

        <div className="space-y-32 md:space-y-56">
          {visible.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={{ ...project, number: `Project ${String(idx + 1).padStart(2, '0')}` }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
