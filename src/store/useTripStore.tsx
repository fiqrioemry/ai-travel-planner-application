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
import { persist } from "zustand/middleware";
import { chatSession } from "@/api/geminiAI";
import { useAuthStore } from "./useAuthStore";
import globalApi, { GeoapifyResponse } from "@/api/globalApi";
import { generatePromptText, generateTemplate } from "@/config/prompt";

export interface TripSelection {
  departure: string;
  destination: string;
  duration: number;
  travelType: string;
  budget: string;
  interest: string;
  activityLevel: string;
}

export interface Activity {
  time: string;
  location: string;
  activity: string;
  estimated_cost: string;
  recomendations?: string[];
  notes?: string;
}

export interface DailyPlan {
  day: string;
  transportation: string;
  activities: Activity[];
}

export interface Hotel {
  name: string;
  type: string;
  price_range: string;
  notes: string;
}

export interface TripData {
  summary: string;
  daily_plan: DailyPlan[];
  hotel_recommendation: Hotel[];
  travel_tips: string[];
}

export interface Trip {
  id?: string;
  tripSelection: TripSelection;
  tripData: TripData;
  email?: string;
  userId?: string;
  createdAt: Date | { seconds: number };
}

// 🔷 State & Actions
interface TripStoreState {
  trip: Trip | null | [];
  trips: Trip[] | null;
  location: GeoapifyResponse | null;
  loading: boolean;
  searching: boolean;

  getPlaceName: (query: string) => Promise<void>;
  saveTripResult: (
    tripForm: TripSelection,
    tripResult: TripData
  ) => Promise<string | undefined>;
  generateNewTrip: (formData: TripSelection) => Promise<void>;
  getUserTrips: () => Promise<Trip[]>;
  fetchWikipediaImage: (placeName: string) => Promise<string | null>;
  getTripDetail: (tripId: string) => Promise<void>;
}

export const useTripStore = create<TripStoreState>()(
  persist(
    (set, get) => ({
      trip: null,
      trips: null,
      location: null,
      loading: false,
      searching: false,

      getPlaceName: async (query: string) => {
        try {
          const location = await globalApi.getPlaceName(query);
          set({ location });
        } catch (error) {
          console.log(error);
        }
      },

      saveTripResult: async (
        tripForm: TripSelection,
        tripResult: TripData
      ): Promise<string | undefined> => {
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

      generateNewTrip: async (formData: TripSelection) => {
        set({ loading: true });

        const template = generateTemplate(formData);
        const prompt = generatePromptText(template);

        try {
          const result = await chatSession.sendMessage(prompt);
          const response = result.response.text();

          const start = response.indexOf("{");
          const end = response.lastIndexOf("}") + 1;
          const jsonText = response.slice(start, end);
          const parsed: TripData = JSON.parse(jsonText);

          const tripId = await get().saveTripResult(formData, parsed);

          if (tripId) {
            window.location.replace(`/trip/${tripId}`);
          }
        } catch (error) {
          console.error("Generate Trip Error:", error);
        } finally {
          set({ loading: false });
        }
      },

      getUserTrips: async (): Promise<Trip[]> => {
        const user = useAuthStore.getState().user;
        try {
          const q = query(
            collection(db, "trips"),
            where("userId", "==", user?.uid)
          );
          const querySnapshot = await getDocs(q);
          const trips: Trip[] = [];

          querySnapshot.forEach((docSnap) => {
            trips.push({
              id: docSnap.id,
              ...(docSnap.data() as Omit<Trip, "id">),
            });
          });

          set({ trips });
          return trips;
        } catch (error) {
          console.error("Error fetching user trips:", error);
          return [];
        }
      },

      fetchWikipediaImage: async (
        placeName: string
      ): Promise<string | null> => {
        try {
          const data = await globalApi.getPlaceImage(placeName);
          const page = Object.values(data.query.pages)[0];
          return page.original?.source || null;
        } catch (err) {
          console.error("Wikipedia fetch error:", err);
          return null;
        }
      },

      getTripDetail: async (tripId: string): Promise<void> => {
        try {
          const documentRef = doc(db, "trips", tripId);
          const result = await getDoc(documentRef);

          if (result.exists()) {
            set({ trip: result.data() as Trip });
          } else {
            console.warn("Trip not found");
            set({ trip: [] });
          }
        } catch (error) {
          console.error("Get Trip Detail Error:", error);
          set({ trip: [] });
        }
      },
    }),
    {
      name: "trip-store",
    }
  )
);
