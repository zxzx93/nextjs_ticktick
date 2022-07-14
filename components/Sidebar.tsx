import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import { client } from "../utils/client";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const userProfile = false;

  return (
    <div className="">
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>

      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href={"/"}>
              <div className="normalLink">
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For you
                </span>
              </div>
            </Link>
          </div>

          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                로그인 후 좋아요와 댓글을 남길 수 있습니다.
              </p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#f51997] border-[1px] font-semiboid px-6 py-3 rounded-md outline-none border-[#f51997] w-full mt-3 hover:text-white hover:bg-[#f51997] cursor-pointer"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
