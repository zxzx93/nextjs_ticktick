import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";

import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [], 

  //스토어에 유저 정보 추가 , 삭제
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  //전체 유저 가져와서 스토어에 추가
  fetchAllUsers: async () => {
    const res = await axios.get(`${BASE_URL}/api/users`)
    set({allUsers : res.data})

  }
});

const useAuthStore = create(devtools(persist(authStore, { name: "auth" })));

export default useAuthStore;
