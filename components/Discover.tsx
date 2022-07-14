import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  return (
    <div className="xl:border-b-2 xl:order-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 xl:block hidden">
        Popular Topics
      </p>

      <div className="flex gap-3 flex-wrap">
        {topics.map((value) => (
          <Link href={`/?topic=${value.name}`} key={value.name}>
            <div className="topicStyle">
              <span className="font-blod t xl:text-md text-2xl ">
                {value.icon}
              </span>
              <span className="font-medium hidden text-md xl:block capitalize">
                {value.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
