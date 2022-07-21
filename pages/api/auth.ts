import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body;

    //sanity document에 동일한 ID를 가진 유저가 이미 존재하지 않는 경우에 구글 로그인 유저정보를 추가함
    client
      .createIfNotExists(user)
      .then(() => res.status(200).json("login success"));
  }
}
