import { create } from "zustand";
import { db } from "@/api/firebase";
import { persist } from "zustand/middleware";
import { chatSession } from "../api/geminiAI";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { useAuthStore } from "./useAuthStore";

const generateTemplate = (tripForm) => ({
  instruction:
    "Buatkan itinerary perjalanan liburan yang terstruktur dan menyenangkan berdasarkan parameter berikut. Itinerary harus mencakup aktivitas harian, rekomendasi tempat wisata, serta tips perjalanan yang sesuai dengan preferensi pengguna. sertakan juga referensi untuk kisaran harga tiket dengan pilihan moda transportasi yang menyesuaikan tipe dan budget",
  parameters: {
    departure: tripForm.departure,
    destination: tripForm.destination,
    duration: `${tripForm.duration} hari`,
    travelType: tripForm.travelType,
    budget: tripForm.budget,
    interest: tripForm.interest,
    activityLevel: tripForm.activityLevel,
  },
  //   output_format:
  //     "Berikan hasil dalam bentuk JSON yang mencakup:\n- summary (deskripsi singkat rencana perjalanan)\n- daily_plan: array berisi objek per hari (hari ke-1, ke-2, dst) dengan aktivitas, waktu, dan tempat\n- hotel_recommendation: list hotel\n- travel_tips: tips bermanfaat selama perjalanan",

  output_format:
    "Hanya berikan hasil dalam **JSON valid tanpa penjelasan atau teks tambahan** yang mencakup:\n- summary\n- daily_plan\n- hotel_recommendation\n- travel_tips",
});

const generatePromptText = (template) => {
  return `
    ${template.instruction}
    
    Parameter:
    - Keberangkatan: ${template.parameters.departure}
    - Tujuan: ${template.parameters.destination}
    - Durasi: ${template.parameters.duration}
    - Tipe Perjalanan: ${template.parameters.travelType}
    - Budget: ${template.parameters.budget}
    - Minat: ${template.parameters.interest}
    - Tingkat Aktivitas: ${template.parameters.activityLevel}
    
    Format Output:
    ${template.output_format}
      `.trim();
};

export const useTripStore = create(
  persist((set, get) => ({
    trip: null,
    trips: null,
    loading: false,

    saveTripResult: async (tripForm, tripResult) => {
      try {
        const user = useAuthStore.getState().user;
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
        throw error;
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
