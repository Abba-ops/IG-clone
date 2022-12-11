import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Story from "./Story";

export default function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [];

    function createRandomUser() {
      return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      };
    }

    Array.from({ length: 15 }).forEach(() => {
      suggestions.push(createRandomUser());
    });
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-7 shadow-sm border-gray-300 border md:rounded-lg rounded-none overflow-x-scroll scrollbar-none">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}
