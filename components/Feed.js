import { useSession } from "next-auth/react";

import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import Loading from "./Loading";

export default function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-xl xl:grid-cols-4 xl:max-w-4xl mx-auto ${
        !session && "!grid-cols-1 !max-w-md"
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
        <Loading />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20 w-[22rem]">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}
