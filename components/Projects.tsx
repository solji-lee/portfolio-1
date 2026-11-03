import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, Play, Pause, Image as ImageIcon, ArrowUpRight, X, Maximize2 } from 'lucide-react';
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
    title: { ko: "기아 3D 원격 제어", en: "Kia 3D Remote Control" },
    tagline: { ko: "2D 차량 목업과 버튼 나열 대신, 내 차를 보며 직접 제어하는 경험", en: "Instead of a 2D car mock-up and a stack of buttons, control your own car while looking at it" },
    subtitle: "Kia · Hyundai · Genesis App",
    role: "Product Design • 3D Interaction",
    description: {
      ko: "기아 EV9부터 적용. 원격 제어 화면은 세단·SUV·해치백 3종 공용 2D 이미지에 버튼을 나열한 구조였음. 3D 차량 모델을 도입해 내 차의 상태 확인과 제어를 앱 위에서 바로 하게 함.",
      en: "Rolled out from the Kia EV9. The remote control screen used to be one of three shared 2D silhouettes (sedan, SUV, hatchback) with buttons stacked on top. A 3D model of the car brings status and control onto the car itself, right in the app."
    },
    impactHighlights: {
      ko: [
        "3D 모델 위에서 제어하는 새로운 경험 → EV9 오너스 카페에서 긍정적 평가",
        "기아 EV9에 최초 적용, 이후 신규 EV 차종으로 확대",
        "차종·컬러·옵션별 엣지 케이스를 아우르는 범용 UI 규칙 정의"
      ],
      en: [
        "A new way to control the car on a 3D model → well received in the EV9 owners' community",
        "First on the Kia EV9, then rolled out to new EV models",
        "Universal UI rules covering edge cases across models, colors and options"
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
          "상태 인지: 문 열림·충전 중 같은 상태가 텍스트와 버튼 색으로만 표시됨. 한눈에 안 읽히고 내 차라는 연결감이 약함",
          "단순한 화면 흐름: 단편적인 이미지와 텍스트 나열로 정보 전달. 세부 정보는 페이지 뎁스를 이동해 보여주는 단순한 흐름",
          "차종 반영 한계: 차량 색상·트림·모델을 고려하지 않고 3종류 목업으로 대체",
        ],
        en: [
          "State recognition: open doors or charging shown only as text and button colour. Hard to read at a glance, and it never feels like your car",
          "Flat screen flow: information delivered as scattered images and text. Details lived a page depth away, in a plain linear flow",
          "No room for the actual car: colour, trim and model ignored, replaced by three generic mock-ups"
        ]
      },
      solution: {
        ko: [
          "상태 인지: 도어·트렁크·공조·충전 상태를 3D 모델 위에 바로 표시. 모델이 주인공이 되도록 버튼 상태·레이아웃·색을 2D 버전과 다르게 잡음",
          "화면 흐름: 제어 페이지로 들어갈 때 카메라가 차를 축으로 돌아 페이지 간 연결이 끊기지 않음",
          "차종 반영: 차량 색상·트림·모델에 맞는 3D 모델 적용. 카메라 높이·중심점·회전 범위를 모델별 값으로 정의해 모델이 추가돼도 레이아웃이 안 깨짐",
          "모바일 환경 3D 용량 부하: 폴리곤 수·텍스처 가이드를 정해 개발 부하를 줄임. 최초 실행 웰커밍 애니메이션도 이 예산 안에서 구현"
        ],
        en: [
          "State recognition: door, trunk, climate and charging states shown directly on the 3D model. Button states, layout and colour set apart from the 2D version so the car stays the hero",
          "Screen flow: entering a control page orbits the camera around the car, so pages stay connected",
          "The actual car: a 3D model that matches colour, trim and model. Camera height, pivot and rotation range defined per model, so new models don't break the layout",
          "3D asset budget on mobile: polygon count and texture guidelines keep dev load down. The first-launch welcome animation fits inside the same budget"
        ]
      },
      impact: {
        ko: [
          "기아 EV9부터 실배포. 3D 차량 모델 + UI로 디자인 특허 출원",
          "내·외부 평가에서 상태 인지가 빨라지고 기존과 다른 제어 경험이라는 반응. EV9 오너스 카페에서도 긍정적",
          "차종별 파라미터 규칙이 이후 모델 적용 기준이 됨"
        ],
        en: [
          "Live from the Kia EV9 onwards. Design patent filed for the 3D car model + UI",
          "Internal and external reviews found state recognition faster and the control experience unlike before. Positive response in the EV9 owners' community too",
          "The per-model parameter rules became the baseline for later models"
        ]
      }
    }
  },
  {
    id: "car-remote",
    number: "Project 02",
    title: { ko: "근거리 차량 리모컨", en: "Short-range Car Remote" },
    tagline: { ko: "로그인 없이, 차 밖 30m에서도 바로 쓰는 차량 리모컨", en: "A car remote with no login, ready to use up to 30 m outside the car" },
    subtitle: "Hyundai Motor Group · Wi-Fi Remote",
    role: "Product Design • IVI Consistency",
    description: {
      ko: "Wi-Fi 연결 근거리 리모컨 앱(내비 미러링, 도어·공조·창문 제어, 미디어 컨트롤 등). 기존 모바일 앱과 후석 제어기(RSE) 사이에 포지셔닝.",
      en: "A short-range remote app over Wi-Fi (navigation mirroring, door, climate and window control, media and more). Positioned between the existing mobile app and the rear-seat unit (RSE)."
    },
    impactHighlights: {
      ko: [
        "원격제어 앱·RSE와 겹치지 않는 고유한 가치 정의",
        "Connect 차량 IVI와 같은 버튼 동작·디자인 언어로 이어지는 경험"
      ],
      en: [
        "A value of its own, overlapping neither the remote app nor RSE",
        "Same button behaviour and visual language as the Connect IVI, so the experience carries over"
      ]
    },
    tags: ["Mobile ↔ IVI Consistency", "Quick Control", "Motion"],
    
    backgroundColors: [
      "#111318", "#111318", "#111318"
    ],
    images: [
      "/remote/remote-hero.mp4", "/remote/remote-depth.jpg", "/remote/remote-states.jpg"
    ],
    details: {
      challenge: {
        ko: [
          "포지셔닝: 원격제어 앱과 RSE가 이미 있음에도 근거리 리모컨이 왜 필요한지부터 정해야 했음",
          "속도: 로그인과 긴 연결 과정을 거치면 리모컨이 아님. 핵심 기능까지 가는 시간을 최대한 줄여야 함",
          "일관성: IVI와 리모컨을 번갈아 쓰는 사용자. 버튼 동작이 조금만 달라도 헷갈림"
        ],
        en: [
          "Positioning: with the remote app and RSE already there, first job was deciding why a short-range remote was needed at all",
          "Speed: a login and a long pairing flow and it's no longer a remote. Time to the core action had to be cut hard",
          "Consistency: people switch between IVI and remote. Slightly different button behaviour is enough to confuse"
        ]
      },
      solution: {
        ko: [
          "포지셔닝: 빠른 연결, 로그인 없음, 30m 근거리. 이 세 조건으로 'RSE 없는 차의 뒷좌석 제어'와 '차박·캠핑 등 차 밖 사용' 두 맥락을 잡음",
          "IoT 리모컨 패턴: 홈에는 빠른 제어와 자주 쓰는 버튼 편집, 세부 제어는 한 뎁스 아래 배치. 가장 자주 하는 동작은 첫 화면에서 끝남",
          "IVI와 통일성: Connect 차량 IVI와 같은 버튼 동작·상태 표현·디자인 언어. 기기를 오가도 새로 배울 게 없음",
          "모션: 주행 중·정차 중·라디오 같은 핵심 정보에 모션을 붙여 글을 안 읽어도 상태가 보임"
        ],
        en: [
          "Positioning: fast pairing, no login, 30 m range. Those three set two contexts, rear-seat control in cars without RSE, and use outside the car such as camping",
          "IoT remote pattern: quick controls and editable favourites on home, detailed control one depth down. The most frequent actions end on the first screen",
          "Consistent with IVI: same button behaviour, states and visual language as the Connect IVI. Nothing to relearn when switching devices",
          "Motion: driving, parked and radio states carry motion, so the state reads without reading"
        ]
      },
      impact: {
        ko: [
          "RSE 없는 차에도 뒷좌석 제어 기능 제공",
          "IVI ↔ 리모컨 사용성 통일. 러닝 커브 낮추고 일관된 경험 전달",
          "주행·정차 상태에 따른 정보 우선순위와 제어 제한 기준 정리"
        ],
        en: [
          "Rear-seat control for cars without RSE",
          "One usability across IVI and remote: lower learning curve, consistent experience",
          "Information priority and control limits set for driving and parked states"
        ]
      }
    }
  },
  {
    id: "geo-fence",
    number: "Project 03",
    title: { ko: "Geo-fence 알림 설정", en: "Geo-fence Alert Settings" },
    tagline: { ko: "다섯 페이지, 중복 저장이던 설정을 한 화면, 한 플로우로", en: "Five pages and duplicate saves, down to one screen and one flow" },
    subtitle: "Kia · Hyundai · Genesis App · MyCar · Europe",
    role: "Product Design • Information Architecture",
    description: {
      ko: "유럽 전용 Alert Service. 발렛·Geo-fence·속도·시간·공회전 알림을 정해 두면 차가 그 조건으로 쓰일 때 알림이 오는 서비스. 백엔드 구조 때문에 플로우가 비효율적이었음.",
      en: "Europe only. Alert Service covers valet, geo-fence, speed, time-fencing and idle alerts: set them and you're notified when the car is used that way. The backend structure made the flow inefficient."
    },
    impactHighlights: {
      ko: [
        "백엔드 비효율을 UI로 극복. 저장 2번 → 1번",
        "Geo-fence 등록 화면 5개 → 3개",
        "서로 이어지는 두 입력을 한 화면으로 합쳐 사용성을 높임"
      ],
      en: [
        "Backend inefficiency solved in the UI. Two saves down to one",
        "Geo-fence registration from five screens to three",
        "Two linked inputs merged into one screen for better usability"
      ]
    },
    tags: ["Settings Flow Redesign", "Map Bottom Sheet"],
    
    backgroundColors: [
      "#111318", "#111318", "#111318"
    ],
    images: [
      "/geofence/geofence-hero.jpg", "/geofence/geofence-flow.jpg", "/geofence/geofence-onepage.jpg"
    ],
    details: {
      challenge: {
        ko: [
          "이중 저장: 백엔드 구조상 각 알림 설정 페이지에서 한 번, 전체 설정 확인 페이지에서 또 한 번 저장해야 반영됨. 어디까지 저장된 건지 알기 어려움",
          "선형 흐름: Geo-fence는 리스트 확인 → 추가 → 지도 마킹 → 이름·반경 입력 → 저장 → 전체 페이지에서 다시 저장. 하나 등록에 페이지 다섯 개",
          "반경 확인 어려움: 지도 마킹과 반경 입력이 다른 페이지라 범위가 어디까지인지 보려면 화면을 오가야 했음"
        ],
        en: [
          "Double save: the backend needed a save on each alert's page and another on the overview page. Hard to tell what was actually saved",
          "Linear flow: list → add → mark on map → enter name and radius → save → save again on the overview. Five pages for one geo-fence",
          "Hard to check the radius: map marking and radius input lived on different pages, so seeing where the boundary fell meant bouncing between screens"
        ]
      },
      solution: {
        ko: [
          "저장 1번: 각 알림 설정 페이지에서 한 번만 저장. 전체 설정 페이지는 확인 전용으로 바꿔 현재 상태만 보여줌",
          "3단계: 리스트 확인 → 추가 → 지도 위에서 마킹·이름·반경·in/out을 한 페이지에서 정하고 저장",
          "지도 위 바텀시트: 반경을 바꾸면 지도 위 범위가 즉시 바뀜. 조정하면서 결과를 봄"
        ],
        en: [
          "One save: save once on each alert's own page. The overview page became read-only and only shows current state",
          "Three steps: list → add → mark, name, radius and in/out on one map page, then save",
          "Bottom sheet over the map: change the radius and the boundary on the map updates at once. Adjust and see"
        ]
      },
      impact: {
        ko: [
          "저장 2번 → 1번, Geo-fence 등록 페이지 5개 → 3개",
          "전체 설정 페이지 역할이 '저장 전 확인'에서 '현재 상태 확인'으로 분명해짐",
          "'조정과 결과를 한 화면에'. 다른 알림 설정에도 같은 구조 적용 가능"
          // "남은 과제: 전체 설정 페이지에서 알림을 토글로 켜고 끄는 건 백엔드 제약으로 다음 단계로 남김"
        ],
        en: [
          "Two saves to one, five pages to three per geo-fence",
          "The overview page's role is now clear: current state, not a pre-save check",
          "'Adjustment and result on one screen'. The same structure applies to the other alert settings"
          // "Still open: toggling alerts on the overview page waits on a backend change"
        ]
      }
    }
  },
  {
    id: "design-system",
    number: "Project 04",
    title: { ko: "현대·기아·제네시스 통합 디자인 시스템", en: "Hyundai · Kia · Genesis Unified Design System" },
    tagline: { ko: "세 브랜드 세 벌의 파일을 하나로. 모드 전환 하나로 세 디자인 대응", en: "Three brands, three file sets, one master. One mode switch covers all three designs" },
    subtitle: "Design Ops · Multi-brand",
    role: "Design System Lead",
    description: {
      ko: "브랜드별로 따로 운영하던 디자인 파일을 Figma Variables로 토큰화해 마스터 파일 한 벌로 합침. 유럽 접근성 법(EAA)도 라이브러리 교체 없이 변수 모드(다국어, 명도 대비, 텍스트 크기 등)로 대응함.",
      en: "Design files run separately per brand, tokenised with Figma Variables and merged into one master. The European Accessibility Act (EAA) was handled with variable modes (language, contrast, text size and more) instead of a library swap."
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
          "세 벌 운영: 브랜드마다 라이브러리와 스크린 파일을 따로 관리. 단순 수정도 세 번 반복, 그만큼 실수도 늘어남",
          "디자인–개발 간극: 브랜드별 스타일 값이 코드에 흩어져 있어 디자인 변경이 개발에 반영되기까지 리드타임이 김",
          "중간에 들어온 EAA: 기존 방식이면 수백 장을 손으로 고치거나 라이브러리를 통째로 바꿔야 했음. 일정 지연 확정"
        ],
        en: [
          "Three sets to run: separate libraries and screen files per brand. Every change done three times, three chances to slip",
          "Design-to-dev gap: brand style values scattered through the code, so a design change took a long time to reach development",
          "EAA mid-project: under the old setup, hundreds of screens to hand-edit or a full library swap. A guaranteed delay"
        ]
      },
      solution: {
        ko: [
          "한 벌로 통합: 컬러·폰트·코너 라운드를 토큰화. 모드 전환으로 브랜드별 디자인이 바로 나옴",
          "공통 컴포넌트: 코드에서도 브랜드별 스타일 값만 호출하는 구조. 디자인–개발 리드타임 줄임",
          "EAA 모드: 라이브러리를 바꾸지 않고 변수만 추가해 명도 대비·텍스트 크기 이슈를 파일 안에서 바로 확인"
        ],
        en: [
          "One master: colour, type and radius tokenised. Switch a mode, get each brand's design",
          "Shared components: code calls only brand style values. Shorter design-to-dev lead time",
          "EAA mode: variables added instead of swapping libraries, contrast and text-size issues checked inside the file"
        ]
      },
      impact: {
        ko: [
          "파일 3벌 → 1벌, 관리·유지보수 리소스 66% 절감",
          "세 브랜드 앱을 동시에 업데이트하는 배포 흐름",
          "EAA 지연 없이 대응. 변수 모드 테스트 방식은 글로벌 확장 표준 매뉴얼로 채택"
        ],
        en: [
          "Three file sets to one, 66% less management and maintenance",
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

const fmtTime = (t: number) => {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60), sec = Math.floor(t % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

/* Slim play/pause + seek bar for the inline (muted, looping) video */
const VideoScrubber = ({ video, isDark }: { video: HTMLVideoElement | null, isDark: boolean }) => {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState({ cur: 0, dur: 0 });
  const fillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const v = video;
    if (fillRef.current) fillRef.current.style.width = '0%';
    setTime({ cur: 0, dur: 0 });
    if (!v) return;
    let raf = 0;
    const tick = () => {
      if (fillRef.current && v.duration) fillRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
      raf = requestAnimationFrame(tick);
    };
    const onTime = () => setTime({ cur: v.currentTime, dur: v.duration || 0 });
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onTime);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    setPlaying(!v.paused);
    onTime();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onTime);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [video]);

  const seekTo = (clientX: number) => {
    const v = video, bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    if (fillRef.current) fillRef.current.style.width = `${ratio * 100}%`;
    setTime({ cur: v.currentTime, dur: v.duration });
  };

  const toggle = () => {
    const v = video;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };

  return (
    <div
      className={`absolute bottom-3 left-3 right-3 flex items-center gap-2.5 px-2.5 h-8 rounded-full backdrop-blur-sm transition-opacity ${isDark ? 'bg-black/45 text-white/85' : 'bg-white/80 text-slate-700'} ${playing ? 'opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100' : 'opacity-100'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button aria-label={playing ? 'Pause' : 'Play'} onClick={toggle} className="w-5 h-5 flex items-center justify-center shrink-0">
        {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
      </button>
      <div
        ref={barRef}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(time.dur)}
        aria-valuenow={Math.round(time.cur)}
        className="relative flex-1 h-5 flex items-center cursor-pointer touch-none"
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); seekTo(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) seekTo(e.clientX); }}
        onPointerUp={(e) => { dragging.current = false; e.currentTarget.releasePointerCapture(e.pointerId); }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <div className={`w-full h-[3px] rounded-full ${isDark ? 'bg-white/25' : 'bg-slate-900/15'}`}>
          <div ref={fillRef} className={`h-full rounded-full ${isDark ? 'bg-white' : 'bg-slate-900'}`} style={{ width: 0 }} />
        </div>
      </div>
      <span className="font-mono text-[10px] tabular-nums shrink-0">{fmtTime(time.cur)} / {fmtTime(time.dur)}</span>
    </div>
  );
};

/* ───────────── Media viewer: manual navigation + thumbnails ───────────── */
const MediaViewer = ({ images, cropFocus, backgroundColors }: { images: string[], cropFocus?: boolean, backgroundColors?: string[] }) => {
  const [index, setIndex] = useState(0);
  const [missing, setMissing] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  // Callback ref: the exiting element's null must not clobber the entering one during the crossfade
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const videoRef = useCallback((el: HTMLVideoElement | null) => { if (el) setVideoEl(el); }, []);

  const go = (i: number) => setIndex((i + images.length) % images.length);
  const current = images[index];
  const canOpen = !missing[current];

  // Lightbox: Esc closes, arrows navigate, page scroll locked while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, images.length]);
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
        <AnimatePresence initial={false}>
          {isVideo(current) ? (
            <motion.video
              key={current}
              ref={videoRef}
              src={current}
              onClick={() => setOpen(true)}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 w-full h-full object-contain cursor-zoom-in ${cropFocus ? 'scale-110 origin-center' : ''}`}
            />
          ) : missing[current] ? (
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
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
              onClick={() => setOpen(true)}
              onError={() => setMissing(prev => ({ ...prev, [current]: true }))}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 w-full h-full object-contain cursor-zoom-in ${cropFocus ? 'scale-110 origin-center' : ''}`}
            />
          )}
        </AnimatePresence>

        {isVideo(current) && <VideoScrubber video={videoEl} isDark={isDark} />}

        {canOpen && (
          <button
            aria-label="Open full size"
            onClick={() => setOpen(true)}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-black/40 text-white/80 hover:bg-black/60' : 'bg-white/80 text-slate-700 hover:bg-white'}`}
          >
            <Maximize2 size={14} />
          </button>
        )}

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
            <div className={`absolute top-3 left-3 px-2 py-1 rounded font-mono text-[11px] tabular-nums ${isDark ? 'bg-black/40 text-white/80' : 'bg-white/70 text-slate-600'}`}>
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="lightbox"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 pb-16 md:p-10 cursor-zoom-out"
              onClick={() => setOpen(false)}
            >
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous"
                    onClick={(e) => { e.stopPropagation(); go(index - 1); }}
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    aria-label="Next"
                    onClick={(e) => { e.stopPropagation(); go(index + 1); }}
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 font-mono text-[11px] tracking-wide text-white/60 tabular-nums">
                    <button
                      aria-label="Previous"
                      onClick={(e) => { e.stopPropagation(); go(index - 1); }}
                      className="md:hidden w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span>{index + 1} / {images.length}</span>
                    <button
                      aria-label="Next"
                      onClick={(e) => { e.stopPropagation(); go(index + 1); }}
                      className="md:hidden w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              )}
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {isVideo(current) ? (
                  <video
                    src={current}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    onLoadedMetadata={(e) => { e.currentTarget.currentTime = videoEl?.currentTime ?? 0; }}
                    className="max-w-[94vw] max-h-[80vh] md:max-h-[88vh] object-contain rounded-md"
                  />
                ) : (
                  <img src={current} alt="" className="max-w-[94vw] max-h-[80vh] md:max-h-[88vh] object-contain rounded-md" />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

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
      <div className="lg:col-span-7 min-w-0">
        <div className="lg:sticky lg:top-24">
          <MediaViewer images={project.images} cropFocus={project.cropFocus} backgroundColors={project.backgroundColors} />
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 px-0.5">
            {project.tags.map(t => (
              <span key={t} className="text-[11px] font-mono tracking-wide text-slate-400">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 min-w-0">
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
