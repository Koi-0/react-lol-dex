"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center gap-6 px-2 py-6">
          <p className="text-[#f55]">
            문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <p className="text-gray-500">{error.message}</p>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
