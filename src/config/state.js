export const emojiMap = {
  Santai: '🛌',
  Seimbang: '🚶‍♂️',
  Padat: '🏃‍♀️',
  Kuliner: '🍽️',
  Belanja: '🛍️',
  'Wisata Alam': '🏞️',
  Sejarah: '🏛️',
  Hemat: '💸',
  Menengah: '💵',
  Mewah: '💎',
  Solo: '🧍',
  Couple: '👫',
  Family: '👨‍👩‍👧‍👦',
  '3 Hari': '📅',
  '5 Hari': '🗓️',
  '7 Hari': '📆',
  Jakarta: '🌇',
  Surabaya: '🌆',
  Bandung: '🌄',
  Medan: '🏙️',
  Makassar: '🌊',
};

const budgets = ['Hemat', 'Menengah', 'Mewah'];
const travelTypes = ['Solo', 'Couple', 'Family'];
const durations = ['3 Hari', '5 Hari', '7 Hari'];
const activityLevels = ['Santai', 'Seimbang', 'Padat'];
const interests = ['Kuliner', 'Belanja', 'Wisata Alam', 'Sejarah'];
const cities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar'];

export const fields = [
  {
    name: 'departure',
    label: 'Dari mana kamu akan berangkat?',
    options: cities,
  },
  { name: 'destination', label: 'Tujuan liburan kamu?', options: cities },
  {
    name: 'duration',
    label: 'Hampir selesai, Berapa lama kamu ingin liburan?',
    options: durations,
  },
  {
    name: 'travelType',
    label: 'Kamu akan bepergian dengan siapa?',
    options: travelTypes,
  },
  {
    name: 'budget',
    label: 'Sedikit lagi ya, pilih budget kamu',
    options: budgets,
  },
  {
    name: 'interest',
    label: ' Apa yang paling kamu minati?',
    options: interests,
  },
  {
    name: 'activityLevel',
    label: 'Terakhir nih, pilih tingkat aktivitas yang kamu inginkan',
    options: activityLevels,
  },
];

export const tripFormInitial = {
  departure: '',
  destination: '',
  duration: '',
  travelType: '',
  budget: '',
  interest: '',
  activityLevel: '',
};
