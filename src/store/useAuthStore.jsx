import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { create } from "zustand";
import toast from "react-hot-toast";
import { auth } from "@/api/firebase";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,

      login: async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
          toast.success("Login berhasil");
        } catch (error) {
          console.error("Login Gagal:", error.message);
        }
      },

      authCheck: () => {
        onAuthStateChanged(auth, (currentUser) => {
          set({ user: currentUser, loading: false });
        });
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
          toast.success("Logout berhasil");
        } catch (error) {
          console.error("Logout Gagal:", error.message);
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
        user: state.user,
      }),
    }
  )
);
