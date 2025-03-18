import { ChampionData } from "@/types/champion";
import { API_BASE_URL, getChampionDetailData } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

interface DetailIdProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: DetailIdProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${API_BASE_URL}/cdn/15.5.1/data/ko_KR/champion/${id}.json`,
  );
  const { data } = await response.json();
  const championsMetadata: ChampionData = data[id];

  return {
    title: `LOL DEX - ${championsMetadata.id}`,
    description: `${championsMetadata.lore}`,
  };
}

export default async function ChampionDetailIdPage({ params }: DetailIdProps) {
  const { id } = await params;
  const championsData = await getChampionDetailData(id);

  if (!championsData) {
    return <p>챔피언 상세 데이터를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="mb-4 text-4xl font-bold text-[#f55]">
        {championsData.name}
      </h1>
      <h2 className="mb-4 text-2xl text-gray-600">{championsData.title}</h2>
      <Image
        src={`${API_BASE_URL}/cdn/15.5.1/img/champion/${championsData.image.full}`}
        alt={championsData.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <p className="mt-4">{championsData.lore}</p>
      <div className="mt-6 space-y-2">
        <h3 className="text-xl font-semibold text-[#f55]">스탯</h3>
        <ul className="list-inside list-disc space-y-2">
          <li>{`공격력 : ${championsData.info.attack}`}</li>
          <li>{`방어력 : ${championsData.info.defense}`}</li>
          <li>{`마법력 : ${championsData.info.magic}`}</li>
          <li>{`난이도 : ${championsData.info.difficulty}`}</li>
        </ul>
      </div>
    </div>
  );
}
