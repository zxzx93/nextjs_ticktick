import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;

    /* MEMO: setIfMissing = set()이랑 비슷함, likes 배열 끝에 _key: uuid(), _ref: userId 값이 들어감
     */
    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
