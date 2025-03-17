// 서버 로직

import { ChampionRotationData } from "@/types/championRotation";
import { apiKey, apiRequestUrl } from "@/utils/riotApi";
import { ONE_DAY_SECONDS } from "@/utils/serverApi";
import { NextResponse } from "next/server";

export async function GET() {
  // API KEY가 없는 경우 에러 발생
  if (!apiKey) {
    return NextResponse.json(
      { error: "API 요청 중 에러 발생" },
      { status: 500 },
    );
  }

  // Riot Games API 호출
  try {
    const response = await fetch(apiRequestUrl, {
      method: "GET",
      headers: {
        "X-Riot-Token": apiKey,
      },
      next: {
        revalidate: ONE_DAY_SECONDS,
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패 : 상태 코드 ${response.status}`);
    }

    const data: ChampionRotationData[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("데이터 패치 중 에러 발생", error);

    return NextResponse.json(
      { error: "챔피언 정보를 불러오는 중 에러 발생" },
      { status: 500 },
    );
  }
}
