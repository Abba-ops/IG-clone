import { useEffect, useState } from "react";

import { faker } from "@faker-js/faker";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [];

    function createRandomUser() {
      return {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        company: faker.company.companyName(),
        avatar: faker.image.avatar(),
      };
    }

    Array.from({ length: 5 }).forEach(() => {
      suggestions.push(createRandomUser());
    });
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-3 ml-8">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">
          Suggestions For You
        </h3>
        <button className="text-gray-900 font-semibold text-xs">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full p-[2px] cursor-pointer"
            src={profile.avatar}
            alt={profile.username}
          />
          <div className="flex-1 ml-3">
            <h2 className="font-semibold text-sm cursor-pointer">
              {profile.username}
            </h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company}
            </h3>
          </div>
          <button className="text-blue-500 font-medium text-xs">Follow</button>
        </div>
      ))}
      <p className="text-gray-400 text-xs mt-7 cursor-pointer">
        About<span> . </span>Help<span> . </span>Press<span> . </span>API
        <span> . </span>Jobs<span> . </span>Privacy<span> . </span>Terms
        <span> . </span>Locations<span> . </span>Language
      </p>
      <p className="text-gray-400 mt-4 text-xs cursor-pointer uppercase">
        &copy; 2022 INSTAGRAM CLONE FROM JK
      </p>
    </div>
  );
}
