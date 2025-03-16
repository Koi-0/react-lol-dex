import { ChampionData } from "@/types/champion";
import { API_BASE_URL, getChampionDetailData } from "@/utils/serverApi";
import { Metadata } from "next";
import Image from "next/image";

interface DetailIdProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DetailIdProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${API_BASE_URL}/cdn/15.5.1/data/ko_KR/champion/${id}.json`,
  ).then((res) => res.json());
  const { data } = await response;
  const championsMetadata: ChampionData = data[id];

  return {
    title: `${championsMetadata.name} - My Riot App`,
    description: `${championsMetadata.lore}`,
  };
}

const ChampionDetailIdPage = async ({ params }: DetailIdProps) => {
  const { id } = await params;
  const championsData = await getChampionDetailData(id);

  if (!championsData) {
    return <p>챔피언 상세 데이터를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold text-[#f55]">
        챔피언 상세 페이지 / SSR
      </h1>

      <h2 className="mb-4 text-4xl font-bold text-[#f55]">
        {championsData.name}
      </h2>
      <h3 className="mb-4 text-2xl text-gray-600">{championsData.title}</h3>
      <Image
        src={`${API_BASE_URL}/cdn/15.5.1/img/champion/${championsData.image.full}`}
        alt={championsData.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <p className="mt-4 text-[#f55]">{championsData.lore}</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#f55]">스탯</h3>
        <ul className="list-inside list-disc">
          <li>{`공격력 : ${championsData.info.attack}`}</li>
          <li>{`방어력 : ${championsData.info.defense}`}</li>
          <li>{`마법력 : ${championsData.info.magic}`}</li>
          <li>{`난이도 : ${championsData.info.difficulty}`}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChampionDetailIdPage;
