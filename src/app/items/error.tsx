"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-2 py-6">
      <p className="text-[#f55]">
        아이템 정보를 불러오는 중 오류가 발생했습니다.
      </p>
      <p className="text-gray-500">{error.message}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            startTransition(() => {
              refresh();
              reset();
            })
          }
        >
          Try again
        </button>
        <Link href={"/"}>
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
