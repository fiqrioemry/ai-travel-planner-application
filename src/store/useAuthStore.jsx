import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/components/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,

      login: async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Login failed:", error.message);
        }
      },

      authCheck: () => {
        set({ loading: true });
        onAuthStateChanged(auth, (currentUser) => {
          set({ user: currentUser, loading: false });
        });
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
        } catch (error) {
          console.error("Logout failed:", error.message);
        }
      },
    }),
    {
      name: "auth",
      storage: {
        getItem: (name) => sessionStorage.getItem(name),
        setItem: (name, value) => sessionStorage.setItem(name, value),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
