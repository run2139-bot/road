export type Difficulty = "초급" | "중급" | "상급";
export type Category = "해안" | "업힐" | "평지";

export interface Course {
  id: string;
  name: string;
  region: string;
  description: string;
  distance: number; // km
  elevationGain: number; // m
  duration: string;
  difficulty: Difficulty;
  category: Category;
  highlights: string[];
  /** [거리(km), 고도(m)] */
  profile: [number, number][];
}

export const courses: Course[] = [
  {
    id: "haeundae-ganjeolgot",
    name: "해운대-간절곶",
    region: "해운대구 ~ 울주군",
    description:
      "동해안 해안도로를 따라 달리는 부산 대표 장거리 코스. 기장 죽성·일광 해안 풍경이 일품이며 돌아올 때는 맞바람에 유의하세요.",
    distance: 62,
    elevationGain: 640,
    duration: "3시간 30분",
    difficulty: "상급",
    category: "해안",
    highlights: ["동해안 오션뷰", "죽성성당", "간절곶 일출"],
    profile: [[0, 5], [6, 20], [12, 55], [18, 30], [24, 70], [30, 40], [36, 90], [42, 45], [48, 110], [55, 35], [62, 15]],
  },
  {
    id: "yunsan-uphill",
    name: "윤산 업힐",
    region: "남구 · 금정구",
    description:
      "짧지만 평균 경사도가 높은 업힐 훈련 코스. 반복 인터벌 훈련에 최적이며 정상에서 도심 전망을 즐길 수 있습니다.",
    distance: 14,
    elevationGain: 420,
    duration: "1시간 10분",
    difficulty: "중급",
    category: "업힐",
    highlights: ["평균 경사 6%", "도심 전망", "인터벌 훈련"],
    profile: [[0, 20], [2, 60], [4, 130], [6, 240], [7, 330], [9, 240], [11, 120], [13, 50], [14, 20]],
  },
  {
    id: "oncheoncheon-suyeonggang",
    name: "온천천-수영강",
    region: "동래구 ~ 해운대구",
    description:
      "신호 없이 이어지는 하천 자전거도로. 초보자와 회복 라이딩에 좋은 평탄한 코스입니다.",
    distance: 28,
    elevationGain: 60,
    duration: "1시간 30분",
    difficulty: "초급",
    category: "평지",
    highlights: ["벚꽃길", "자전거 전용도로", "센텀시티 야경"],
    profile: [[0, 18], [4, 14], [8, 11], [12, 8], [16, 6], [20, 5], [24, 4], [28, 3]],
  },
  {
    id: "eden-valley",
    name: "에덴벨리",
    region: "사하구 · 강서구",
    description:
      "낙동강변을 지나 에덴벨리 방면으로 오르는 완만한 업힐 코스. 한적한 도로와 낙동강 풍경이 매력입니다.",
    distance: 36,
    elevationGain: 380,
    duration: "2시간 10분",
    difficulty: "중급",
    category: "업힐",
    highlights: ["낙동강 전망", "한적한 도로", "완만한 업힐"],
    profile: [[0, 8], [5, 12], [10, 40], [15, 110], [20, 210], [24, 280], [28, 150], [32, 50], [36, 10]],
  },
  {
    id: "gadeokdo",
    name: "가덕도",
    region: "강서구 가덕도",
    description:
      "신항과 바다를 끼고 달리는 섬 일주 코스. 바람이 강한 날이 많아 풍속 확인이 필수이며, 노을 명소로 유명합니다.",
    distance: 45,
    elevationGain: 520,
    duration: "2시간 40분",
    difficulty: "상급",
    category: "해안",
    highlights: ["바다 노을", "섬 일주", "대항 어촌마을"],
    profile: [[0, 6], [6, 45], [12, 120], [18, 60], [24, 150], [30, 80], [36, 130], [41, 40], [45, 8]],
  },
];

export const difficulties: Difficulty[] = ["초급", "중급", "상급"];
export const categories: Category[] = ["해안", "업힐", "평지"];
