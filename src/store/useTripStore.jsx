import {
  doc,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { create } from "zustand";
import { db } from "@/api/firebase";
import globalApi from "@/api/globalApi";
import { persist } from "zustand/middleware";
import { chatSession } from "@/api/geminiAI";
import { useAuthStore } from "./useAuthStore";
import { generatePromptText, generateTemplate } from "@/config/prompt";

export const useTripStore = create(
  persist((set, get) => ({
    trip: null,
    trips: null,
    location: null,
    loading: false,
    searching: false,

    getPlaceName: async (query) => {
      try {
        const location = await globalApi.getPlaceName(query);
        set({ location });
      } catch (error) {
        console.log(error);
      }
    },

    saveTripResult: async (tripForm, tripResult) => {
      const user = useAuthStore.getState().user;
      try {
        const docRef = await addDoc(collection(db, "trips"), {
          tripSelection: tripForm,
          tripData: tripResult,
          email: user?.email,
          userId: user?.uid,
          createdAt: new Date(),
        });

        return docRef.id;
      } catch (error) {
        console.error("Error saving trip:", error);
      }
    },

    generateNewTrip: async (formData) => {
      set({ loading: true });

      const template = generateTemplate(formData);

      const prompt = generatePromptText(template);
      try {
        const result = await chatSession.sendMessage(prompt);

        const response = result.response.text();

        const start = response.indexOf("{");

        const end = response.lastIndexOf("}") + 1;

        const jsonText = response.slice(start, end);

        const parsed = JSON.parse(jsonText);

        const tripId = await get().saveTripResult(formData, parsed);

        window.location.replace(`/trip/${tripId}`);
      } catch (error) {
        console.error("Generate Trip Error:", error);
      } finally {
        set({ loading: false });
      }
    },

    getUserTrips: async () => {
      const user = useAuthStore.getState().user;
      try {
        const result = query(
          collection(db, "trips"),
          where("userId", "==", user?.uid)
        );

        const trips = [];

        const querySnapshot = await getDocs(result);

        querySnapshot.forEach((doc) => {
          trips.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        set({ trips });
        return trips;
      } catch (error) {
        console.error("Error fetching user trips:", error);
        return [];
      }
    },

    fetchWikipediaImage: async (placeName) => {
      try {
        const data = await globalApi.getPlaceImage(placeName);
        const page = Object.values(data.query.pages)[0];
        return page.original?.source || null;
      } catch (err) {
        console.error("Wikipedia fetch error:", err);
        return null;
      }
    },

    getTripDetail: async (tripId) => {
      try {
        const documentId = doc(db, "trips", tripId);
        const result = await getDoc(documentId);

        if (result.exists()) {
          set({ trip: result.data() });
        } else {
          console.warn("Trip not found");
          set({ trip: [] });
        }
      } catch (error) {
        console.error("Generate Trip Error:", error);
        set({ trip: [] });
      }
    },
  }))
);
