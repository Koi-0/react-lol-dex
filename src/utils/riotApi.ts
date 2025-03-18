// 챔피언 로테이션 데이터 가져오기

import { ChampionData } from "@/types/champion";

export const getChampionRotationData = async (): Promise<
  ChampionData[] | null
> => {
  // API 요청 (CSR 적용)
  try {
    const response = await fetch("/api/rotation");

    if (!response) {
      // fetch() 자체가 실패한 경우
      throw new Error("서버 응답이 없습니다.");
    } else if (!response.ok) {
      // HTTP 상태 코드가 200 ~ 299 범위를 벗어난 경우
      throw new Error(`HTTP 오류 발생 : ${response.status}`);
    }

    const data: ChampionData[] = await response.json();

    return data; // 챔피언 로테이션 데이터 반환
  } catch (error) {
    console.error("챔피언 로테이션 데이터를 불러오는 중 오류 발생 : ", error);
    return null;
  }
};
