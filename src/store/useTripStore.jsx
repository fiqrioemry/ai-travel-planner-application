import { create } from "zustand";
import { db } from "@/api/firebase";
import { persist } from "zustand/middleware";
import { chatSession } from "../api/geminiAI";
import {
  doc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { useAuthStore } from "./useAuthStore";
import geopify from "../api/Geopify";

const generateTemplate = (tripForm) => ({
  instruction: `
Buatkan itinerary liburan selama ${tripForm.duration} yang **terstruktur, menyenangkan, dan realistis** berdasarkan parameter berikut. Hasilkan prompt / tulisan dalam bahasa Indonesia yang mudah dipahami.

Pastikan itinerary mencakup:
- Aktivitas harian yang seimbang sesuai tingkat aktivitas pengguna
- Rekomendasi tempat wisata, kuliner, dan budaya lokal
- Estimasi harga tiket masuk tempat wisata (dalam Rupiah)
- Moda transportasi yang sesuai dengan budget dan tipe perjalanan
- Rekomendasi hotel atau penginapan sesuai preferensi
- Tips perjalanan berguna untuk destinasi tersebut

Tujuan dari itinerary ini adalah untuk membantu traveler merencanakan liburan dengan mudah dan hemat waktu, tanpa perlu riset tambahan.
`.trim(),

  parameters: {
    departure: tripForm.departure,
    destination: tripForm.destination,
    duration: `${tripForm.duration} hari`,
    travelType: tripForm.travelType,
    budget: tripForm.budget,
    interest: tripForm.interest,
    activityLevel: tripForm.activityLevel,
  },

  output_format: `
Berikan hasil dalam **format JSON valid (bukan teks biasa)**, ditulis dalam **bahasa Indonesia**, tanpa penjelasan tambahan, dan mencakup bagian berikut:

- summary: ringkasan perjalanan
- daily_plan: array harian dengan:
  - day (contoh: "Hari ke-1")
  - transportation (contoh: "Kereta, Taksi Online")
  - activities: array berisi aktivitas harian, setiap aktivitas harus memiliki:
    - time: waktu pelaksanaan (contoh: "Pagi", "Siang", "Sore", "Malam" diikuti dengan keterangan estimasi waktu misal "Pagi, 07.00am - 09.00am")
    - location: nama lokasi atau area kegiatan
    - activity: deskripsi aktivitas (contoh: "Mengunjungi Taman Mini")
    - recomendations : berisikan hal hal yang direkomendasikan untuk dijelajahi disekitaran lokasi contoh dalam bentuk sepertiini ["kuliner warung ibu tuti", "miniatur monas",'miniatur menara eifel"]
    - estimated_cost: estimasi biaya (contoh: "Rp100.000")
    - notes (opsional): catatan tambahan (contoh: "Disarankan datang pagi agar tidak ramai")
- hotel_recommendation: array rekomendasi hotel dengan:
  - name
  - type (contoh: "Hotel Budget", "Hotel Mewah", "Homestay")
  - price_range (contoh: "Rp300.000 - Rp500.000/malam")
  - notes: alasan dan keunggulan hotel disampaikan dalam bentuk deskripsi yang detail dan informatif
- travel_tips: array tips perjalanan berguna

Contoh struktur JSON tidak perlu ditampilkan. Langsung hasil akhir dalam format JSON.
`.trim(),
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
    location: null,
    loading: false,
    searching: false,

    getPlaceName: async (query) => {
      try {
        const location = await geopify.getPlaceName(query);
        set({ location });
      } catch (error) {
        console.log(error);
      }
    },

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

    getUserTrips: async () => {
      try {
        const user = useAuthStore.getState().user;
        const q = query(
          collection(db, "trips"),
          where("userId", "==", user?.uid)
        );

        const querySnapshot = await getDocs(q);
        const trips = [];

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
