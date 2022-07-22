import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";

const authStore = (set: any) => ({
  userProfile: null,

  //스토어에 유저 정보 추가 , 삭제
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(devtools(persist(authStore, { name: "auth" })));

export default useAuthStore;
