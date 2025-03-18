import { ChampionData } from "@/types/champion";
import { ItemData } from "@/types/item";

// 기본 URL (라이엇 API의 데이터 드래곤 서버)
export const API_BASE_URL = "https://ddragon.leagueoflegends.com";

// 하루(86400초) : ISR 캐싱을 위해 사용
export const ONE_DAY_SECONDS = 60 * 60 * 24;

// 최신 버전 가져오기 (라이엇 API에서 버전 정보를 가져옴)
export async function getLatestVersion() {
  const response = await fetch(`${API_BASE_URL}/api/versions.json`);
  const data: string[] = await response.json();

  return data[0];
}

// 최신 버전의 챔피언 데이터 가져오기
export async function getChampionData() {
  // API 요청 (ISR 적용)
  const version = await getLatestVersion();
  const championDetailUrl = `${API_BASE_URL}/cdn/${version}/data/ko_KR/champion.json`;

  try {
    const response = await fetch(championDetailUrl, {
      next: { revalidate: ONE_DAY_SECONDS },
    });

    const { data }: { data: ChampionData } = await response.json();

    return data;
  } catch (error) {
    console.log("챔피언 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
}

// 최신 버전의 챔피언 상세 데이터 가져오기
export async function getChampionDetailData(id: string) {
  // API 요청 (SSR 적용)
  const version = await getLatestVersion();
  const championDetailUrl = `${API_BASE_URL}/cdn/${version}/data/ko_KR/champion/${id}.json`;

  try {
    const response = await fetch(championDetailUrl, {
      cache: "no-store",
    });

    const {
      data,
    }: {
      data: {
        [championName: string]: ChampionData;
      };
    } = await response.json();

    return data[id];
  } catch (error) {
    console.log("챔피언 상세 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
}

// 최신 버전의 아이템 데이터 가져오기
export async function getItemData() {
  // API 요청 (SSG 적용)
  const version = await getLatestVersion();
  const itemUrl = `${API_BASE_URL}/cdn/${version}/data/ko_KR/item.json`;

  try {
    const response = await fetch(itemUrl, {
      cache: "force-cache",
    });

    const { data }: { data: ItemData } = await response.json();

    return data;
  } catch (error) {
    console.log("아이템 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
}
