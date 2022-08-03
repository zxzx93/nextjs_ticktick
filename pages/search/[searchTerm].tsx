import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import { useRouter } from "next/router";

import { BASE_URL } from "../../utils";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import useAuthStore from "../../store/authStore";
import { Video, IUser } from "../../types";

const Search = ({ videos }: { videos: Video[] }) => {
  const { searchTerm }: any = useRouter().query;
  const { allUsers } = useAuthStore();

  const [isAccounts, setIsAccounts] = useState(false);

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w=full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex gap-3 p-2 cursor-poiner font-semibold rounded border-b-2  border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      className="rounded-full"
                      alt="user profile image"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex items-center text-md font-bold text-primary lowercase gap-1">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400 " />
                    </p>
                    <p className="text-gray-400 capitalize text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult text={`No vidoe results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex-wrap flex gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResult text={`No vidoe results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};
