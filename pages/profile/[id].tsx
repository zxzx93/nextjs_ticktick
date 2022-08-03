import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;

  const [showUserVideos, setShowUserVideos] = useState(true); //비디오, 좋아요 메뉴 버튼
  const [videosList, setVideosList] = useState<Video[]>([]); //비디오 리스트

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";


  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            className="rounded-full"
            alt="user profile image"
            width={120}
            height={120}
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className=" md:text-2xl tracking-wider flex items-center text-md font-bold text-primary lowercase gap-1">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400 " />
          </p>
          <p className="text-gray-400 capitalize text-xs">{user.userName}</p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResult text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  let res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};
