import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface Iprops {
  text: string;
  emptyComment?: boolean;
}

const NoResult = ({ text, emptyComment }: Iprops) => {

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {emptyComment ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
