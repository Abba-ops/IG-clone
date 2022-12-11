import { signOut, useSession } from "next-auth/react";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-8">
      <img
        className="w-16 h-16 rounded-full p-[2px] cursor-pointer"
        src={session?.user?.image}
        alt={session?.user?.username}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-medium">
          <span className="cursor-pointer">{session?.user?.username}</span>{" "}
          <CheckBadgeIcon
            title="Verified"
            className="h-4 inline text-blue-400"
          />
        </h2>
        <h3 className="text-sm text-gray-400">{session?.user?.username}</h3>
      </div>
      <button onClick={signOut} className="text-blue-500 text-xs font-medium">
        Switch
      </button>
    </div>
  );
}
