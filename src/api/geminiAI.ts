import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';

// Ambil API Key dari environment
const apiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;

// Inisialisasi Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

// Pilih model Gemini
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

// Konfigurasi generation
const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

// Buat sesi chat siap pakai
export const chatSession = model.startChat({
  generationConfig,
});
