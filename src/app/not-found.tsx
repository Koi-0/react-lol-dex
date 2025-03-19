import Link from "next/link";

const NotFound = async () => (
  <div className="flex flex-col items-center justify-center gap-6 px-2 py-6">
    <p className="text-[#f55]">Not Found</p>
    <p className="text-gray-500">Could not find requested resource</p>
    <Link href={"/"}>
      <button>Go Home</button>
    </Link>
  </div>
);

export default NotFound;
