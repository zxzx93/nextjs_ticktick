import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [alreadyLiked, setAlreadyLiked] = useState(false); //좋아요 초기값 안 누른 상태

  //MEMO: 사용자와 같은 아이디를 가진 좋아요 배열 (이미 좋아요를 누른 경우 필터 시킴)
  let filterLikes = likes?.filter((item: any) => 
    item._ref === userProfile?._id
  );
  
  //MEMO: 이미 좋아요 눌렀을 경우 length가 1개 이상이라 alreadyLiked 상태값 true로 바꿔줌
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className={`flex gap-6`}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
