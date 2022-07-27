import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { BASE_URL } from "../utils";

const Upload = () => {
  const router = useRouter();
  const { userProfile }: { userProfile: any } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false); //파일 타입
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileType = ["video/ogg", "video/webm", "video/mp4"];

    if (fileType.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  return (
    <div className="w-full flex h-full absolute left-0 top-[60px] mb-10 pt-10 justify-center lg:pt-20 bg-[#f8f8f8]">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center pt-6 p-14 w-[60%]">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-gray-400 text-md mt-1">
              Post a video to your account
            </p>
          </div>

          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              "로딩중..."
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      className=" rounded-xl h-[450px] mt-16 bg-black "
                      loop
                      controls
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex  flex-col items-center h-full ">
                      <div className="flex  flex-col items-center h-full ">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="font-semibold text-xl">Upload Video</p>
                      </div>

                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg
                        <br />
                        720x1280 or higher <br />
                        up to 10 miutes
                        <br />
                        Less then 2GB
                      </p>
                      <p className="bg-[#f51997] text-center mt-10  rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>

                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-red-400 mt-4 font-semibold w-[250px]">
                select a video file
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">caption</label>
          <input
            type="text"
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <label className="text-md font-medium">choose a category</label>
          <select
            className="outline-none border-2 border-gray-200 text-md  apitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none bg-white  text-gray-700 p-2 hover:bg-slate-300 text-md"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              onClick={handlePost}
              type="button"
              className="border-gray-300 rounded border-2 text-md w-28 font-medium p-2 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] rounded text-md w-28 font-medium p-2 lg:w-44 outline-none text-white"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
