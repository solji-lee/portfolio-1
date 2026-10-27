import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, Play, Image as ImageIcon } from 'lucide-react';
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
}

const projects: ProjectData[] = [
  {
    id: "hyundai-3d",
    number: "Project 01",
    title: { ko: "기아 EV9 3D 원격 제어", en: "Kia EV9 3D Remote Control" },
    tagline: { ko: "공용 2D 이미지와 버튼 나열에서, 내 차를 보면서 제어하는 화면으로", en: "From a generic 2D silhouette and a stack of buttons to controlling the car while looking at it" },
    subtitle: "Kia · Hyundai · Genesis App",
    role: "Product Design • 3D Interaction",
    description: {
      ko: "EV9 전용 서비스. 세단·SUV·해치백 세 종류로 공용화돼 있던 2D 원격 제어 페이지에 3D 모델을 도입해, 차량 상태와 제어 상태를 텍스트가 아니라 눈으로 확인하게 했습니다.",
      en: "An EV9-only service. The remote control page shared one of three 2D silhouettes across all models. A 3D model replaced it, so vehicle and control states are seen, not read."
    },
    impactHighlights: {
      ko: [
        "3D 모델 + 애니메이션 UI, 디자인 특허 출원",
        "EV9 양산 탑재, 최초 실행 웰커밍 애니메이션",
        "차종별 카메라 높이·중심점·회전 범위 규칙화"
      ],
      en: [
        "Design patent filed for the 3D + animation UI",
        "Shipped on EV9, with a first-launch welcome animation",
        "Per-model camera height, pivot and rotation rules"
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
          "공용 2D 이미지 + 버튼 중심 제어: 도어·충전 같은 상태가 한눈에 안 읽힘, '내 차'라는 느낌 없음",
          "차종별 색상·크기 상이: 2D UI 안에서 높이·중심점·최대 회전 범위를 모델마다 따로 잡아야 함",
          "모바일 3D 렌더링 부하: 발열·로딩 없이 0.5초 내 반응"
        ],
        en: [
          "Generic 2D image + button-centric control: door and charging states hard to read at a glance, no sense of 'my car'",
          "Colour and size differ per model: height, pivot and max rotation had to be set per model inside one 2D layout",
          "3D rendering cost on mobile: respond within 0.5s without heat or loading"
        ]
      },
      solution: {
        ko: [
          "상태의 시각화: 도어·트렁크·공조·충전 상태를 텍스트 대신 3D 모델 위에 표시, 주행 중에도 빠르게 확인",
          "차량 중심 트랜지션: 제어 페이지 이동 시 차량을 축으로 카메라 이동, 화면 연결성 유지",
          "차종별 파라미터: 카메라 높이·중심점·회전 범위를 규칙으로 정의, 폴리곤·텍스처 가이드 수립",
          "3D 전용 UI: 버튼 state·레이아웃·플로우·색상을 2D 버전과 다르게 설계"
        ],
        en: [
          "Visualised state: door, trunk, climate and charging shown on the 3D model instead of text, quick to check even while driving",
          "Vehicle-centred transitions: camera orbits the car when entering a control page, keeping continuity",
          "Per-model parameters: camera height, pivot and rotation defined as rules, plus polygon and texture guidelines",
          "3D-specific UI: button states, layout, flow and colour designed apart from the 2D version"
        ]
      },
      impact: {
        ko: [
          "디자인 특허 출원",
          "기아 EV9 양산 서비스 탑재",
          "상태 인지 속도 향상, 첨단 브랜드 이미지 (정성 평가)"
        ],
        en: [
          "Design patent filed",
          "Shipped in the Kia EV9 production service",
          "Faster state recognition, stronger tech image (qualitative)"
        ]
      }
    }
  },
  {
    id: "car-remote",
    number: "Project 02",
    title: { ko: "근거리 차량 리모컨", en: "Short-range Car Remote" },
    tagline: { ko: "로그인 없이, 차 밖 30m에서도. 핵심 제어만 빠르게, IVI와 같은 손맛으로", en: "No login, works 30 m outside the car. Core controls only, with the same feel as the IVI" },
    subtitle: "Hyundai Motor Group · Wi-Fi Remote",
    role: "Product Design • IVI Consistency",
    description: {
      ko: "Wi-Fi 근거리 연결 리모컨. 내비 미러링, 간단 제어(도어·공조·시트 폴딩·창문), 미디어 컨트롤. 원격제어 앱과 후석 제어기(RSE) 사이의 빈 자리를 겨냥했습니다.",
      en: "A Wi-Fi short-range remote: navigation mirroring, quick controls (doors, climate, seat folding, windows) and media. Aimed at the gap between the remote-control app and the rear-seat unit (RSE)."
    },
    impactHighlights: {
      ko: [
        "원격제어 앱 · RSE와 다른 세 번째 포지셔닝",
        "Connect IVI와 동일한 버튼 인터랙션·디자인 언어",
        "주행·정차·라디오 상태를 모션으로 표현"
      ],
      en: [
        "A third position apart from the remote app and RSE",
        "Same button interaction and visual language as the Connect IVI",
        "Driving, parked and radio states expressed with motion"
      ]
    },
    tags: ["Mobile ↔ IVI Consistency", "Quick Control", "Motion"],
    backgroundColors: [
      "#111318", "#15181f", "#111318", "#15181f", "#111318"
    ],
    images: [
      "/remote/remote-1.png", "/remote/remote-2.png", "/remote/remote-3.png", "/remote/remote-4.png", "/remote/remote-5.png"
    ],
    details: {
      challenge: {
        ko: [
          "포지셔닝: 원격제어 앱, RSE가 이미 있는 상황에서 세 번째 제어 수단의 역할 정의",
          "속도: 복잡한 로그인·연결 과정을 거치면 리모컨의 의미가 없음",
          "일관성: IVI와 리모컨을 번갈아 쓰는 사용자, 버튼 동작이 조금만 달라도 혼란"
        ],
        en: [
          "Positioning: define the role of a third control surface next to the remote app and RSE",
          "Speed: a long login and pairing flow defeats the point of a remote",
          "Consistency: people switch between IVI and remote, small differences in button behaviour confuse"
        ]
      },
      solution: {
        ko: [
          "포지셔닝: 빠른 연결 · 로그인 없음 · 30m 근거리 → RSE 미제공 차량의 후석 제어, 차박·오토캠핑 등 차 밖 활용",
          "IoT 리모컨 패턴: 홈은 빠른 제어 + 자주 쓰는 버튼 편집, 세부 제어는 다음 페이지",
          "IVI 통일: Connect 차량 IVI와 같은 버튼 인터랙션·state·디자인 언어",
          "모션 그래픽: 주행 중·정차 중·라디오 등 핵심 정보에 생동감"
        ],
        en: [
          "Positioning: fast pairing, no login, 30 m range → rear-seat control for cars without RSE, outside-the-car use like camping",
          "IoT remote pattern: quick controls and editable favourites on home, detailed control one page deeper",
          "Matched to IVI: same button interaction, states and visual language as the Connect IVI",
          "Motion graphics: driving, parked and radio states brought to life"
        ]
      },
      impact: {
        ko: [
          "RSE 미제공 차량까지 후석 제어 경험 확장",
          "IVI ↔ 리모컨 간 일관된 사용성",
          "주행·정차 상태별 정보 우선순위와 제어 제한 기준 정리"
        ],
        en: [
          "Rear-seat control extended to cars without RSE",
          "Consistent usability between IVI and remote",
          "Information priority and control limits defined per driving/parked state"
        ]
      }
    }
  },
  {
    id: "geo-fence",
    number: "Project 03",
    title: { ko: "Geo-fence 알림 설정", en: "Geo-fence Alert Settings" },
    tagline: { ko: "흩어진 설정 페이지를 지도 위 한 화면으로. 조정하면서 결과를 바로 본다", en: "Scattered settings brought onto one map screen. Adjust and see the result at once" },
    subtitle: "Kia · Hyundai · Genesis App · MyCar · Europe",
    role: "Product Design • Information Architecture",
    description: {
      ko: "유럽 특화 기능. 범위(in/out)와 시간을 설정해 두면 차량 사용 시 알림이 옵니다. 자녀 통학용으로 차를 넘길 때 쓰는 기능인데, 같은 목적의 알림이 페이지와 저장 버튼마다 따로 흩어져 있었습니다.",
      en: "Europe-only. Set a boundary (in/out) and time window and get alerted when the car is used, typically after handing it to a teenager. Alerts for the same purpose were split across pages and save buttons."
    },
    impactHighlights: {
      ko: [
        "여러 알림을 한 설정 페이지에서 바로 on/off",
        "지도 위 바텀시트에서 반경·명칭·in/out 동시 설정",
        "설정 → 저장 → 확인 왕복 제거"
      ],
      en: [
        "All alerts toggled from one settings page",
        "Radius, name and in/out set together in a map bottom sheet",
        "Set → save → verify round-trips removed"
      ]
    },
    tags: ["Settings Flow Redesign", "Live Preview"],
    backgroundColors: [
      "#f4f5f7", "#eef0f3", "#f4f5f7", "#eef0f3"
    ],
    images: [
      "/geofence/geofence-1.png", "/geofence/geofence-2.png", "/geofence/geofence-3.png", "/geofence/geofence-4.png"
    ],
    details: {
      challenge: {
        ko: [
          "끊어진 연결성: 같은 목적의 Geo-fence 기능들이 별도 페이지, 별도 저장 버튼으로 관리",
          "보이지 않는 반경: 지도 위치·radius·명칭·in/out을 함께 정해야 하는데 페이지가 쪼개져 범위를 확인하려면 화면을 오가야 함"
        ],
        en: [
          "Broken continuity: geo-fence features with the same purpose managed on separate pages with separate save buttons",
          "Invisible radius: location, radius, name and in/out had to be set together, yet split pages meant bouncing between screens to see the boundary"
        ]
      },
      solution: {
        ko: [
          "설정 통합: 한 페이지에서 여러 알림을 바로 on/off",
          "지도 위 바텀시트: 반경·명칭·in/out 옵션을 조정하면 지도 위 바운드가 즉시 반영",
          "직접 조작: 숫자 입력이 아니라 지도 위 시각 피드백 중심"
        ],
        en: [
          "Unified settings: several alerts toggled from one page",
          "Bottom sheet over the map: radius, name and in/out options update the boundary on the map instantly",
          "Direct manipulation: visual feedback on the map instead of numeric input"
        ]
      },
      impact: {
        ko: [
          "페이지 이동·개별 저장 제거, 설정 단계 축소",
          "반경이 바로 보여 오설정 감소",
          "'조정과 결과를 한 화면에' → 공조·미디어 제어에도 적용 가능한 구조"
        ],
        en: [
          "Fewer steps: page hops and per-item saves removed",
          "Fewer mis-settings: the boundary is visible immediately",
          "'Adjust and result on one screen' → a structure reusable for climate and media control"
        ]
      }
    }
  },
  {
    id: "design-system",
    number: "Project 04",
    title: { ko: "현대·기아·제네시스 통합 디자인 시스템", en: "Hyundai · Kia · Genesis Unified Design System" },
    tagline: { ko: "세 브랜드, 세 벌의 파일을 한 벌로. 모드 전환으로 세 앱의 디자인 산출", en: "Three brands, three file sets, one master. Switch a mode, get all three apps" },
    subtitle: "Design Ops · Multi-brand",
    role: "Design System Lead",
    description: {
      ko: "브랜드별로 따로 운영하던 디자인 파일을 Figma Variables로 토큰화해 마스터 파일 한 벌로 통합. 프로젝트 중간에 들어온 유럽 접근성 법안(EAA) 대응도 일정 지연 없이 처리했습니다.",
      en: "Separate brand design files tokenised with Figma Variables and merged into one master. The European Accessibility Act (EAA) requirement that landed mid-project was handled without delay."
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
          "N × 3 비효율: 브랜드마다 라이브러리·스크린 파일 별도 운영, 단순 수정도 3회 반복, 휴먼 에러 증가",
          "중간에 들어온 EAA: 기존 방식이면 수백 장 수동 수정 또는 라이브러리 스왑, 일정 지연 불가피"
        ],
        en: [
          "N × 3 inefficiency: separate libraries and screen files per brand, every change done three times, more human error",
          "EAA landed mid-project: hundreds of screens to hand-edit or a full library swap under the old setup"
        ]
      },
      solution: {
        ko: [
          "변수 기반 통합 (3 → 1): 컬러·폰트·코너 라운드를 토큰화, 모드 전환으로 브랜드별 디자인 즉시 산출",
          "EAA 모드: 라이브러리 스왑 없이 변수 추가로 명도 대비·텍스트 크기 시뮬레이션",
          "공통 컴포넌트: 코드에서도 브랜드별 스타일 값만 호출하는 구조"
        ],
        en: [
          "Variable-based merge (3 → 1): colour, type and radius tokenised, brand designs output by switching a mode",
          "EAA mode: contrast and text-size simulation by adding variables, no library swap",
          "Shared components: code structure that calls only brand style values"
        ]
      },
      impact: {
        ko: [
          "파일 관리·유지보수 리소스 66% 절감",
          "세 브랜드 앱 동시 업데이트 가능한 배포 흐름",
          "EAA 지연 없이 대응, 변수 모드 테스트 방식은 글로벌 표준 매뉴얼로 채택"
        ],
        en: [
          "66% less file management and maintenance",
          "A release flow that updates all three brand apps together",
          "EAA met without delay; the variable-mode test approach adopted as the global standard"
        ]
      }
    }
  },
  // Hidden from the site. Remove `hidden` to bring one back.
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
  },
  {
    id: "design-ops-ai",
    hidden: true,
    number: "Project 06",
    title: { ko: "피그마 플러그인 & 협업 툴 혁신", en: "Figma Plugin & Tool Innovation" },
    tagline: { ko: "\"보안과 언어의 장벽을 기술로 넘다. 워크플로우를 설계하고 도구를 만드는 Design Ops.\"", en: "\"Overcoming security and language barriers with tech. DesignOps that builds tools and workflows.\"" },
    subtitle: "Internal Productivity",
    role: "Product Owner • Tool Developer",
    description: {
      ko: "32개 언어 관리와 보안망 제약을 내부 툴 개발로 해결. Lokalise-Figma 파이프라인과 Jira 연동 플러그인을 직접 설계하여 글로벌 워크플로우를 혁신했습니다.",
      en: "Solved 32-language management and security constraints by developing internal tools. Innovated global workflows by designing a Lokalise-Figma pipeline and Jira plugin firsthand."
    },
    impactHighlights: {
      ko: [
        "협업 속도 증대: 보안망 단절 해소, 기획-디자인-개발 연결",
        "AI 자동화 준비: MCP 기반 32개국어 QA 시스템 설계",
        "Design Ops 문화: 기술로 불편함을 해결하는 리더십 정착"
      ],
      en: [
        "Boosted Synergy: Connected planning, design, and dev teams despite security walls",
        "AI Automation Prep: Designed an MCP-based QA system for 32 languages",
        "DesignOps Culture: Established leadership resolving issues through tech"
      ]
    },
    tags: ["Lokalise", "MCP", "Figma Plugin"],
    backgroundColors: [
      "#1a1a1a", "#1a1a1a", "#1a1a1a", "#3a3a3a", "#2a2a2a", "#1a1a1a"
    ],
    images: [
      "/p3v1.mp4", "/p3v2.mp4", "/p3v3.mp4", "/design-ops-2.jpg", "/design-ops-5.jpg", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    ],
    details: {
      challenge: {
        ko: [
          "32개국어 검수의 한계: 글로벌 서비스 운영 시 각 언어별 UI 깨짐과 오역을 사람이 일일이 검수하는 것은 불가능에 가까웠고, 품질 리스크로 직결",
          "보안망에 갇힌 비효율: 높은 보안 정책으로 Jira-Figma 표준 연동 차단, 디자이너들이 보안망을 넘나들며 티켓 상태를 확인해야 하는 커뮤니케이션 로스 발생"
        ],
        en: [
          "Limits of 32 Language QA: Impossible to manually inspect UI breaks and mistranslations for global services, leading to quality risks",
          "Inefficiency Trapped by Security: Strict policies blocked Jira-Figma standard integration, causing communication loss as designers crossed security networks"
        ]
      },
      solution: {
        ko: [
          "Product Owner of Internal Tools: 디자인 팀 병목을 해결하는 내부 툴의 PO 역할 수행, 문제 정의부터 로직 설계까지 사내 개발팀과 협업",
          "Lokalise Pipeline & AI Vision: (Step 1) Lokalise 스트링을 Figma Variable로 자동 변환/주입하는 플러그인 개발, (Step 2 - Future) MCP(Model Context Protocol) 활용, 32개국어의 UI 오버플로우 및 문맥 오류를 AI가 자동 탐지하는 QA 자동화 시스템 준비 중",
          "Security-Compliant Jira Plugin: 보안망을 우회하지 않으면서 Jira 데이터를 안전하게 호출하는 로직 고안, 피그마 내에서 디자인과 연결된 Jira 티켓 상태를 실시간 동기화·관리하는 커스텀 플러그인 구축"
        ],
        en: [
          "Product Owner of Internal Tools: Acted as PO for internal tools to resolve design team bottlenecks, collaborating with developers from problem definition to logic design",
          "Lokalise Pipeline & AI Vision: (1) Developed a plugin automating localization string injection into Figma Variables. (2) Exploring an MCP-based QA automation system for 32 languages.",
          "Security-Compliant Jira Plugin: Designed logic to safely fetch Jira data without bypassing the firewall, syncing ticket statuses directly within Figma"
        ]
      },
      impact: {
        ko: [
          "Workflow Innovation: 보안 이슈로 단절된 기획-디자인-개발 연결 고리를 잇는 플러그인 도입으로 협업 속도 증대 및 히스토리 관리 자동화",
          "Scalability for AI: 단순 다국어 적용을 넘어 AI(LLM)가  디자인 데이터를 읽고 검수할 수 있는 'Machine Readable'한 Variable 구조 마련, 차세대 자동화 초석 구축",
          "Leadership: '불편함은 감수하는 것이 아니라 기술로 해결하는 것'이라는 Design Ops 문화를 팀 내 정착"
        ],
        en: [
          "Workflow Innovation: Reconnected planning, design, and dev teams broken by security walls, boosting synergy and automating history management",
          "Scalability for AI: Laid the foundation for next-gen automation via 'Machine Readable' variables that LLMs can digest and QA",
          "Leadership: Established a DesignOps culture that 'inconvenience is not endured, but solved with tech'"
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

        <div className="space-y-24 md:space-y-36">
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
