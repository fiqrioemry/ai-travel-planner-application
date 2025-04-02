export const emojiMap: Record<string, string> = {
  Santai: "🛌",
  Seimbang: "🚶‍♂️",
  Padat: "🏃‍♀️",
  Kuliner: "🍽️",
  Belanja: "🛍️",
  "Wisata Alam": "🏞️",
  Sejarah: "🏛️",
  Hemat: "💸",
  Menengah: "💵",
  Mewah: "💎",
  Solo: "🧍",
  Couple: "👫",
  Family: "👨‍👩‍👧‍👦",
  "3 Hari": "📅",
  "5 Hari": "🗓️",
  "7 Hari": "📆",
  Jakarta: "🌇",
  Surabaya: "🌆",
  Bandung: "🌄",
  Medan: "🏙️",
  Makassar: "🌊",
};

// 🔷 Opsi form (readonly array untuk keamanan)
export const budgets = ["Hemat", "Menengah", "Mewah"] as const;
export const travelTypes = ["Solo", "Couple", "Family"] as const;
export const durations = ["3 Hari", "5 Hari", "7 Hari"] as const;
export const activityLevels = ["Santai", "Seimbang", "Padat"] as const;
export const interests = [
  "Kuliner",
  "Belanja",
  "Wisata Alam",
  "Sejarah",
] as const;
export const cities = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Makassar",
] as const;

// 🔷 Tipe bantu dari array di atas
export type Budget = (typeof budgets)[number];
export type TravelType = (typeof travelTypes)[number];
export type Duration = (typeof durations)[number];
export type ActivityLevel = (typeof activityLevels)[number];
export type Interest = (typeof interests)[number];
export type City = (typeof cities)[number];

// 🔷 Struktur field untuk form builder
export interface Field {
  name: keyof TripFormInitial;
  label: string;
  options: readonly string[];
}

export const fields: Field[] = [
  {
    name: "departure",
    label: "Dari mana kamu akan berangkat?",
    options: cities,
  },
  { name: "destination", label: "Tujuan liburan kamu?", options: cities },
  {
    name: "duration",
    label: "Hampir selesai, Berapa lama kamu ingin liburan?",
    options: durations,
  },
  {
    name: "travelType",
    label: "Kamu akan bepergian dengan siapa?",
    options: travelTypes,
  },
  {
    name: "budget",
    label: "Sedikit lagi ya, pilih budget kamu",
    options: budgets,
  },
  {
    name: "interest",
    label: "Apa yang paling kamu minati?",
    options: interests,
  },
  {
    name: "activityLevel",
    label: "Terakhir nih, pilih tingkat aktivitas yang kamu inginkan",
    options: activityLevels,
  },
];

// 🔷 Initial form state
export interface TripFormInitial {
  departure: City | "";
  destination: City | "";
  duration: Duration | "";
  travelType: TravelType | "";
  budget: Budget | "";
  interest: Interest | "";
  activityLevel: ActivityLevel | "";
}

export const tripFormInitial: TripFormInitial = {
  departure: "",
  destination: "",
  duration: "",
  travelType: "",
  budget: "",
  interest: "",
  activityLevel: "",
};
