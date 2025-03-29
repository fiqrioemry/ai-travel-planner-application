import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { persist } from "zustand/middleware";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      loading: false,
      checkingAuth: true,
      getUserProfile: async (token) => {
        try {
          const response = await callApi.getUserProfile(token);
          set({ user: response.data });
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },

      login: () =>
        useGoogleLogin({
          onSuccess: (codeResp) => GetUserProfile(codeResp),
          onError: (error) => console.log(error),
        }),

      logout: async () => {
        try {
          googleLogout();
          set({ user: null });
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
    }),

    {
      name: "auth",
      storage: {
        getItem: (name) => sessionStorage.getItem(name),
        removeItem: (name) => sessionStorage.removeItem(name),
        setItem: (name, value) => sessionStorage.setItem(name, value),
      },
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
