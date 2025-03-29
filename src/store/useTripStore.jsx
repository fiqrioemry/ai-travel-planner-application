import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTripStore = create(
  persist((set) => ({
    trip: null,
    trips: null,
    loading: false,

    createNewTrip: async (formData) => {
      try {
        console.log("test", formData);
        set({ loading: true });
      } catch (error) {
        console.error(error.message);
      }
    },

    getAllTrips: async (formData) => {
      try {
        console.log("test", formData);
      } catch (error) {
        console.error(error.message);
      }
    },

    getTripDetail: async (formData) => {
      try {
        console.log("test", formData);
      } catch (error) {
        console.error(error.message);
      }
    },
  }))
);
