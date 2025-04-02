import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { create } from "zustand";
import toast from "react-hot-toast";
import { auth } from "@/api/firebase";
import { persist } from "zustand/middleware";

// 🔷 Type untuk state
interface AuthState {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  authCheck: () => void;
  logout: () => Promise<void>;
}

// 🔷 Store dengan middleware persist
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      login: async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
          toast.success("Login berhasil");
        } catch (error: any) {
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
        } catch (error: any) {
          console.error("Logout Gagal:", error.message);
        }
      },
    }),
    {
      name: "auth",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        removeItem: (name) => sessionStorage.removeItem(name),
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
      },
      partialize: (state) => ({
        user: state.user,
        login: state.login,
        logout: state.logout,
        loading: state.loading,
        authCheck: state.authCheck,
      }),
    }
  )
);
