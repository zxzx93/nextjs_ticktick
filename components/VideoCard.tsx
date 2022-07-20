import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types.d";

interface Iprops {
  post: Video;
}

const VideoCard: NextPage<Iprops> = ({ post }) => {
  const [isHover, setIsHover] = useState(false); //비디오 호버 상태
  const [playing, setPlaying] = useState(false); //비디오 재생
  const [isVideoMuted, setIsVideoMuted] = useState(false); //비디오 음소거

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 cursor-pointer p-2 font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={"/"}>
              <>
                <Image
                  className="rounded-full "
                  width={62}
                  height={62}
                  src={post.postedBy.image}
                  alt="profile image"
                  layout="responsive"
                />
              </>
            </Link>
          </div>

          <div>
            <Link href={"/"}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-blod text-primary">
                  {post.postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex lg:ml-20 gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={"/"}>
            <video
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              loop
              ref={videoRef}
              src={post.video.asset.url}
              muted={isVideoMuted}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {/* 비디오 일시정지 or 재생 버튼 */}
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

              {/* 비디오 음소거 or 켜는 버튼 */}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
