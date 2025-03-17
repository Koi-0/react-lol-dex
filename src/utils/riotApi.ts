// 챔피언 로테이션 데이터 가져오기

import { ChampionRotationData } from "@/types/championRotation";

export const apiKey = process.env.NEXT_PUBLIC_RIOT_API_KEY;
export const apiRequestUrl =
  "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

export const getChampionRotationData =
  async (): Promise<ChampionRotationData | null> => {
    // API 요청 (CSR 적용)
    try {
      const response = await fetch(`${apiRequestUrl}?api_key=${apiKey}`);

      if (!response) {
        // 응답 객체가 아예 존재하지 않는 경우 또는 fetch 자체가 실패한 경우
        throw new Error("서버 응답이 없습니다.");
      } else if (!response.ok) {
        // 응답 객체는 존재하지만 HTTP 상태 코드가 정상 범위(200~299)가 아닌 경우
        throw new Error(`HTTP 오류 발생 : ${response.status}`);
      }

      const data = await response.json();

      return data; // 챔피언 로테이션 데이터 반환
    } catch (error) {
      console.error("챔피언 로테이션 데이터를 불러오는 중 오류 발생 : ", error);
      return null;
    }
  };
