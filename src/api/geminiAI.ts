import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_GOOGLE_API_KEY tidak ditemukan di environment variables"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
});
