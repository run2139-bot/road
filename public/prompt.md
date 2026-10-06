요청: 부산 지역 로드바이크 라이딩 코스 추천 웹사이트를 만들어줘.

[스택 및 설정]
- Next.js (App Router, TypeScript, Tailwind CSS, ESLint) 기반으로 현재 디렉토리에 설치
- 필요한 패키지 설치: lucide-react, recharts, clsx, tailwind-merge
- 스포티한 다크모드 테마 세팅 (배경: #020617, primary: #00f2fe / #00ff87)

[주요 기능 및 구성]
1. Header & Hero:
   - "부산 로드바이크 라이딩 코스 추천" 타이틀
   - 오늘 부산 날씨/풍속 위젯
2. Course List & Filter System:
   - 부산 대표 코스 5개 mockData 생성 (해운대-간절곶, 윤산 업힐, 온천천-수영강, 에덴벨리, 가덕도)
   - 난이도(초/중/상급), 카테고리(해안/업힐/평지), 거리 슬라이더, 검색창 필터링
3. Detail Modal & Elevation Chart:
   - 코스 카드 클릭 시 열리는 상세 모달
   - Recharts를 활용한 고도 프로필(Elevation Profile) 그래프
   - GPX 다운로드 버튼 (public/gpx/sample.gpx 연동)
4. Bookmark:
   - LocalStorage 기반 코스 북마크 기능 (Hydration 에러 방지 처리)

[마무리]
- `npm run build`를 실행해 에러가 없는지 검증/수정
- Git 초기화 후 "feat: initialize Busan road bike course recommendation site" 메시지로 첫 커밋 생성
