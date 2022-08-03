import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const { pathname } = useRouter();
   const [showSidebar, setShowSidebar] = useState<Boolean>(true);

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? "activeLink" : "normalLink"}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts/>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
