"use client";

import { useQuery } from "@tanstack/react-query";
import { getChampionRotationData } from "@/utils/riotApi";

const RotationPage = () => {
  // 챔피언 로테이션 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["ChampionRotationData"],
    queryFn: getChampionRotationData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>데이터를 불러오는 중 오류 발생</div>;

  const champions = data
    ? data.freeChampionIds.map((id) => ({
        id,
        name: `Champion ${id}`,
        title: "Title Placeholder",
      }))
    : [];

  return (
    <div>
      <h1>챔피언 로테이션</h1>
      <div>
        {champions?.map((champion) => (
          <div key={champion.id}>
            <h2>{champion.name}</h2>
            <p>{champion.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotationPage;
