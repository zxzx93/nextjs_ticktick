import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const query = await singleUserQuery(id);
    const userVideoQuery = await userCreatedPostsQuery(id);
    const userLikedVideosQuery = await userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideoQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    res.status(200).json({ user: user[0], userVideos, userLikedVideos });
  }
}
