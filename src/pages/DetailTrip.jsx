import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useTripStore } from "@/store/useTripStore";

const emojiMap = {
  Padat: "🏃‍♂️",
  Seimbang: "🚶",
  Santai: "🛌",
  Hemat: "💸",
  Menengah: "💵",
  Mewah: "💎",
  Solo: "🧍",
  Couple: "👫",
  Family: "👨‍👩‍👧‍👦",
  Sejarah: "🏛️",
  Kuliner: "🍽️",
  Belanja: "🛍️",
  "Wisata Alam": "🏞️",
};

const DetailTrip = () => {
  const { tripId } = useParams();
  const { getTripDetail, trip } = useTripStore();
  const [image, setImage] = useState(null);

  const fetchWikipediaImage = async (placeName) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=pageimages|description&titles=${encodeURIComponent(
          placeName
        )}&piprop=original`
      );

      const data = await res.json();
      const page = Object.values(data.query.pages)[0];

      return {
        title: page.title,
        description: page.description || "No description available.",
        image: page.original?.source || null,
      };
    } catch (error) {
      console.error("Wikipedia fetch error:", error);
      return {
        title: placeName,
        description: "Gagal mengambil data dari Wikipedia.",
        image: null,
      };
    }
  };

  useEffect(() => {
    if (trip?.tripSelection?.destination) {
      fetchWikipediaImage(trip.tripSelection.destination).then((res) => {
        if (res?.image) setImage(res.image);
      });
    }
  }, [trip]);

  useEffect(() => {
    getTripDetail(tripId);
  }, [getTripDetail, tripId]);

  if (!trip) return null;

  const { tripSelection, tripData } = trip || {};

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Hero Image */}
      {image && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg mb-6">
          <img
            src={image}
            alt={tripSelection.destination}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mb-4">
        <h2>
          {tripSelection.departure} - {tripSelection.destination}
        </h2>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(tripSelection).map(([key, value]) => (
          <Badge key={key} variant="outline">
            {emojiMap[value] || ""} {value}
          </Badge>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Ringkasan</h2>
        <p className="text-muted-foreground leading-relaxed">
          {tripData?.summary}
        </p>
      </div>

      {/* Daily Plan */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rencana Harian</h2>
        {tripData?.daily_plan?.map((day, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-bold mb-1">{day.day}</h3>
            <p className="text-sm mb-2">Transportasi: {day.transportation}</p>
            <ul className="space-y-3">
              {day.activities.map((act, i) => (
                <li key={i} className="p-3 border rounded">
                  <p className="font-medium">{act.time}</p>
                  <p>📍 {act.location}</p>
                  <p className="text-muted-foreground">🎯 {act.activity}</p>
                  {act.estimated_cost !== "0" &&
                    act.estimated_cost !== "Rp 0" && (
                      <p className="text-sm text-muted-foreground">
                        💰 kisaran harga : {act.estimated_cost}
                      </p>
                    )}
                  {act.recomendations && act.recomendations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium ">
                        📌 Rekomendasi di sekitar:
                      </p>
                      <div className="pl-4">
                        <ul className="list-disc pl-5 text-sm ">
                          {act.recomendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {act.notes && (
                    <p className="text-xs italic mt-1">
                      📝 catatan penting : {act.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Hotel Recommendation */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rekomendasi Hotel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripData?.hotel_recommendation?.map((hotel, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
              <p className="text-sm">
                {hotel.type} - {hotel.price_range}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {hotel.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tips Perjalanan</h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          {tripData?.travel_tips?.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailTrip;
