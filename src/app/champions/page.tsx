import { ChampionData } from "@/types/champion";
import { API_BASE_URL, getChampionData } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";

const ChampionPage = async () => {
  const championsData = await getChampionData();

  if (!championsData) {
    return <p>챔피언 데이터를 불러오는 데 실패했습니다.</p>;
  }

  const champions: ChampionData[] = Object.values(championsData);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#f55]">챔피언 목록 / ISR</h1>
      <div className="grid grid-cols-4 gap-4">
        {champions.map((champion) => {
          return (
            <div
              key={champion.id}
              className="rounded border p-4 hover:shadow-lg"
            >
              <Link href={`/champions/${champion.id}`}>
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

export default ChampionPage;
