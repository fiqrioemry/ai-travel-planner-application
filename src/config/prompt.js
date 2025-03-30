export const generateTemplate = (tripForm) => ({
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

export const generatePromptText = (template) => {
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
