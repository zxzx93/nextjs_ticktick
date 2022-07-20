import axios from "axios";

import NoResult from "../components/NoResult";
import VideoCard from "../components/VideoCard";
import { Video } from "../types.d";

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

export const getServerSideProps = async () => {
  let response = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: response.data,
    },
  };
};
