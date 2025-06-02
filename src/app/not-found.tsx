import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-gray-200">
      <div className="p-6 text-center">
        <h1 className="text-4xl mb-6">404 - Not Found</h1>

        <Link
          href="/"
          className="text-white bg-transparent border border-gray-300 hover:bg-blue-700 active:bg-blue-700 mt-6 px-4 py-2 rounded-lg mb-4 hover:scale-105 active:scale-105 transition-all duration-300"
        >
          ← Quay về trang chủ 
        </Link>
      </div>
    </div>
  );
}
