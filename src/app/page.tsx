import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#f55]">
          리그 오브 레전드 정보 앱
        </h1>
        <p className="mt-4 text-gray-500">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
      </div>
      <div className="mt-[60px] flex justify-center">
        <div className="flex justify-center gap-10">
          <Link
            href={"/champions"}
            className="flex flex-col items-center gap-6 text-amber-400"
          >
            <div>
              <Image
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_2.jpg"
                }
                alt="Picture of the author"
                width={400}
                height={300}
              />
            </div>
            챔피언 목록 보기
          </Link>
          <Link
            href={"/items"}
            className="flex flex-col items-center gap-6 text-amber-400"
          >
            <div>
              <Image
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Elise_3.jpg"
                }
                alt="Picture of the author"
                width={400}
                height={300}
              />
            </div>
            아이템 목록 보기
          </Link>
          <Link
            href={"/rotation"}
            className="flex flex-col items-center gap-6 text-amber-400"
          >
            <div>
              <Image
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_2.jpg"
                }
                alt="Picture of the author"
                width={400}
                height={300}
              />
            </div>
            금주 로테이션 확인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
