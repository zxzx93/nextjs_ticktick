import axios from "axios";

import NoResult from "../components/NoResult";
import VideoCard from "../components/VideoCard";
import { Video } from "../types.d";
import { BASE_URL } from "../utils";
import { topics } from "../utils/constants";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResult text={"No videos"} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let res = null;
  if (topic) {
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    res = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: res.data,
    },
  };
};
