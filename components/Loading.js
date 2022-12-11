import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="grid my-4 place-items-center">
      <ArrowPathIcon className="h-8 text-gray-500 animate-spin border-2 p-1 rounded-full hover:scale-125 cursor-pointer transition-all duration-1000 ease-out" />
    </div>
  );
}
