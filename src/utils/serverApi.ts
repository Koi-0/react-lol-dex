import { ChampionData } from "@/types/champion";
import { ItemData } from "@/types/item";

// 기본 URL (라이엇 API의 데이터 드래곤 서버)
export const API_BASE_URL = "https://ddragon.leagueoflegends.com";

// 하루(86400초) : ISR 캐싱을 위해 사용
const ONE_DAY_SECONDS = 60 * 60 * 24;

// 최신 버전 가져오기 (라이엇 API에서 버전 정보를 가져옴)
export const getLatestVersion = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/api/versions.json`);
  const data: string[] = await response.json();

  return data[0]; // 가장 최신 버전 반환
};

// 최신 버전의 챔피언 데이터 가져오기
export const getChampionData = async (): Promise<ChampionData | null> => {
  // API 요청 (ISR 적용)
  const version = await getLatestVersion(); // 최신 버전 정보 가져오기
  const championUrl = `${API_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`;

  try {
    const response = await fetch(championUrl, {
      next: { revalidate: ONE_DAY_SECONDS },
    });

    const { data } = await response.json();

    return data; // 챔피언 데이터 반환
  } catch (error) {
    console.log("챔피언 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
};

// 아이템 데이터 가져오기
export const getItemData = async (): Promise<ItemData | null> => {
  // API 요청 (SSG 적용)
  const version = await getLatestVersion(); // 최신 버전 정보 가져오기
  const itemUrl = `${API_BASE_URL}/cdn/${version}/data/ko_KR/item.json`;

  try {
    const response = await fetch(itemUrl, {
      cache: "force-cache",
    });

    const { data } = await response.json();

    return data; // 아이템 데이터 반환
  } catch (error) {
    console.log("아이템 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
};
