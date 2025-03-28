import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      loading: false,
      checkingAuth: true,

      setAccessToken: (accessToken) => set({ accessToken }),

      authCheck: async () => {
        try {
          const { user } = await callApi.authCheck();
          set({ user });
        } catch {
          set({ user: null });
        } finally {
          set({ checkingAuth: false });
        }
      },

      login: async (formData) => {
        set({ loading: true });
        try {
          const { message, accessToken, user } = await callApi.login(formData);
          set({ user, accessToken });
          toast.success(message);
        } catch (error) {
          toast.error(error.message);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          const { message } = await callApi.logout();
          toast.success(message);
          set({ user: null, accessToken: null });
        } catch (error) {
          console.log(error.message);
        }
      },

      register: async (formData) => {
        set({ loading: true });
        try {
          const { message } = await callApi.register(formData);
          toast.success(message);
        } catch (error) {
          toast.error(error.message);
        } finally {
          set({ loading: false });
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
