"use server";

import { ChampionData } from "@/types/champion";
import { ChampionRotationData } from "@/types/championRotation";
import { getChampionData } from "@/utils/serverApi";
import { NextResponse } from "next/server";

// API Route (GET 함수)를 통해 서버에서 챔피언 로테이션 데이터 가져오기
export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;
  const apiRequestUrl =
    "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";

  // API-KEY가 없는 경우
  if (!apiKey) {
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 },
    );
  }

  // API 요청
  try {
    const response = await fetch(apiRequestUrl, {
      method: "GET",
      headers: {
        "X-Riot-Token": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패 : 상태 코드 ${response.status}`);
    }

    const data: ChampionRotationData = await response.json();

    if (!data.freeChampionIds) {
      throw new Error("API 응답 형식이 올바르지 않습니다.");
    }

    const { freeChampionIds } = data;

    // 챔피언 데이터 가져오기
    const champions = await getChampionData();

    if (!champions) {
      return NextResponse.json(
        { error: "챔피언 데이터를 불러올 수 없습니다." },
        { status: 500 },
      );
    }

    // 로테이션 챔피언 ID와 일치하는 챔피언만 필터링
    const freeChampionsData: ChampionData[] = freeChampionIds.map((id) =>
      Object.values(champions).find(
        (champion: ChampionData) => champion.key === id.toString(),
      ),
    );

    return NextResponse.json(freeChampionsData);
  } catch (error) {
    console.error("데이터 패치 중 에러 발생", error);

    return NextResponse.json(
      { error: "챔피언 정보를 불러오는 중 에러 발생" },
      { status: 500 },
    );
  }
}
