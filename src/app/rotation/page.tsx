"use client";

import { getChampionRotationData } from "@/utils/riotApi";
import { API_BASE_URL } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const RotationPage = () => {
  // 챔피언 로테이션 데이터 가져오기
  const {
    data: freeChampionIds,
    isPending,
    error,
  } = useQuery({
    queryKey: ["ChampionRotationData"],
    queryFn: getChampionRotationData,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) {
    return <div>오류 발생 : {error?.message || "알 수 없는 오류"}</div>;
  }

  if (!freeChampionIds || freeChampionIds.length === 0) {
    return <div>현재 무료 챔피언 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#f55]">
        챔피언 로테이션 / 이번주 무료로 플레이 할 수 있어요!
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {freeChampionIds.map((champion) => {
          return (
            <div
              key={champion.id}
              className="rounded border p-4 hover:shadow-lg"
            >
              <Link href={`/champions/${champion.id}`} className="space-y-2">
                <Image
                  src={`${API_BASE_URL}/cdn/15.5.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={100}
                  height={100}
                  className="mx-auto"
                />
                <h2 className="mt-2 text-xl font-semibold text-[#f55]">
                  {champion.name}
                </h2>
                <p className="text-gray-500">{champion.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RotationPage;
