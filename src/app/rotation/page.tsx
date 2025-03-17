"use client";

import { getChampionRotationData } from "@/utils/riotApi";
import { useQuery } from "@tanstack/react-query";

const RotationPage = () => {
  const { data } = useQuery({
    queryKey: ["ChampionRotation"],
    queryFn: getChampionRotationData,
  });

  const championsRotationData = data?.freeChampionIds;

  championsRotationData?.map(() => {});

  console.log("championsRotationData : ", championsRotationData);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#f55]">
        챔피언 로테이션 / CSR
      </h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default RotationPage;
