import { useRouter } from "next/router";

export default function EnableLocation() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-lg mb-8">Enable Location</h1>
      <p>Please enable location services.</p>
      <button
        onClick={() => {
          router.reload();
        }}
        className="text-white bg-blue-700 mt-8 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Refresh
      </button>
    </div>
  );
}
