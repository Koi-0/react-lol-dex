// 챔피언 데이터를 정의하는 타입
export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
  };
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
}
