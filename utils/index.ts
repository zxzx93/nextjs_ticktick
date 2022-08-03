import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Decode {
  name: string;
  picture: string;
  sub: string;
}

export const createOrGetUser = async (res: any, addUser: any) => {
  const decode: Decode = jwt_decode(res.credential); //사용자의 jwt token decode
  const { name, picture, sub } = decode;
  const user = { _id: sub, _type: "user", userName: name, image: picture };

  addUser(user); //sustand store에 추가
  await axios.post(`${BASE_URL}/api/auth`, user);
};
