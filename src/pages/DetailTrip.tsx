import { emojiMap } from "../config/state";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import React, { useEffect, useState } from "react";
import { useTripStore } from "../store/useTripStore";
import NotFound from "./NotFound";

interface Activity {
  time: string;
  location: string;
  activity: string;
  estimated_cost: string;
  recomendations?: string[];
  notes?: string;
}

interface DailyPlan {
  day: string;
  transportation: string;
  activities: Activity[];
}

interface Hotel {
  name: string;
  type: string;
  price_range: string;
  notes: string;
}

const DetailTrip: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [image, setImage] = useState<string | null>(null);
  const { getTripDetail, trip, fetchWikipediaImage } = useTripStore();

  useEffect(() => {
    if (tripId) {
      getTripDetail(tripId);
    }
  }, [getTripDetail, tripId]);

  useEffect(() => {
    if (trip && "tripSelection" in trip) {
      fetchWikipediaImage(trip.tripSelection.destination).then((img) => {
        if (img) setImage(img);
      });
    }
  }, [trip, fetchWikipediaImage]);

  if (!trip || !("tripSelection" in trip)) return <NotFound />;

  const { tripSelection, tripData } = trip;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Image */}
      {image && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg mb-6">
          <img
            src={image}
            alt={tripSelection?.destination}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mb-4">
        <h2>
          {tripSelection?.departure} - {tripSelection?.destination}
        </h2>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(tripSelection).map(([key, value]: [string, string]) => (
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
        {tripData?.daily_plan?.map((day: DailyPlan, idx: number) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-bold mb-1">{day.day}</h3>
            <p className="text-sm mb-2">Transportasi: {day.transportation}</p>
            <ul className="space-y-3">
              {day.activities.map((act: Activity, i: number) => (
                <li key={i} className="p-3 border rounded">
                  <p className="font-medium">{act.time}</p>
                  <p className="text-gray-600">📍 {act.location}</p>
                  <p className="text-gray-600">🎯 {act.activity}</p>
                  {act.estimated_cost !== "0" &&
                    act.estimated_cost !== "Rp 0" && (
                      <p className="text-sm text-gray-600">
                        💰 kisaran harga : {act.estimated_cost}
                      </p>
                    )}
                  {act.recomendations && act.recomendations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-600">
                        📌 Rekomendasi di sekitar:
                      </p>
                      <div className="pl-4">
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {act.recomendations.map(
                            (rec: string, idx: number) => (
                              <li key={idx}>{rec}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  {act.notes && (
                    <p className="text-xs italic mt-1 text-gray-600">
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
          {tripData?.hotel_recommendation?.map((hotel: Hotel, idx: number) => (
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
          {tripData?.travel_tips?.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailTrip;
