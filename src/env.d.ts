/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_ID: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_GEOPIFY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
