import { ItemData } from "@/types/item";
import { API_BASE_URL, getItemData } from "@/utils/serverApi";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "LOL DEX - 아이템 목록",
  description:
    "리그 오브 레전드의 모든 아이템 정보를 확인하고 최적의 빌드를 구성하세요.",
};

export default async function Itempage() {
  const itemData = await getItemData();

  if (!itemData) {
    return <p>아이템 데이터를 불러오는 데 실패했습니다.</p>;
  }

  const items: ItemData[] = Object.values(itemData);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-[#f55]">아이템 목록 / SSG</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item, index) => {
          return (
            <div key={index} className="rounded border p-4 hover:shadow-lg">
              <Image
                src={`${API_BASE_URL}/cdn/15.5.1/img/item/${item.image.full}`}
                alt={item.name}
                width={100}
                height={100}
                className="mx-auto"
              />
              <h2 className="mt-2 text-xl font-semibold text-[#f55]">
                {item.name}
              </h2>
              <p className="text-gray-500">{item.plaintext}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
