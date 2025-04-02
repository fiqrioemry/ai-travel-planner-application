import { emojiMap } from "@/config/state";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useTripStore } from "@/store/useTripStore";
import { Skeleton } from "@/components/ui/skeleton";

// 🔷 Tipe untuk struktur data trip
interface TripSelection {
  departure: string;
  destination: string;
  duration: string;
  travelType: string;
  budget: string;
  interest: string;
  activityLevel: string;
}

interface TripData {
  summary: string;
  [key: string]: any; // fleksibel jika ada properti tambahan
}

interface Trip {
  id: string;
  createdAt: { seconds: number };
  tripSelection: TripSelection;
  tripData: TripData;
}

const SavedTrip: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<Record<string, string>>({});
  const { getUserTrips, trips, fetchWikipediaImage } = useTripStore();

  useEffect(() => {
    getUserTrips();
  }, [getUserTrips]);

  useEffect(() => {
    if (trips?.length > 0) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trips]);

  const fetchImages = async () => {
    const newImages: Record<string, string> = {};

    for (const trip of trips as Trip[]) {
      const destination = trip.tripSelection.destination;
      if (!images[destination]) {
        const imageUrl = await fetchWikipediaImage(destination);
        if (imageUrl) newImages[destination] = imageUrl;
      }
    }

    setImages((prev) => ({ ...prev, ...newImages }));
  };

  if (!trips) return <Skeleton className="w-full h-96" />;

  if (trips.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <img
          src="/no-saved-trip.png"
          alt="No trips"
          className="w-64 h-64 mb-6 object-contain"
        />
        <h2 className="text-2xl font-semibold mb-2">
          Belum ada perjalanan yang disimpan
        </h2>
        <p className="text-gray-600 mb-6">
          Ayo mulai rencanakan petualangan seru kamu sekarang!
        </p>
        <Button
          className="w-44 rounded-full"
          onClick={() => navigate("/create-trip")}
        >
          Mulai Petualanganmu
        </Button>
      </section>
    );
  }

  return (
    <section className="min-h-screen max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Daftar Rencana Perjalanan Kamu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(trips as Trip[]).map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="border rounded-lg p-5 shadow hover:shadow-lg cursor-pointer transition"
          >
            <img
              src={
                images[trip.tripSelection.destination] || "/fallback-trip.jpg"
              }
              alt={trip.tripSelection.destination}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">
              Liburan ke {trip.tripSelection.destination} -{" "}
              {trip.tripSelection.duration}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(trip.tripSelection).map(([key, value]) => (
                <Badge key={key} variant="secondary">
                  {emojiMap[value] || ""} {value}
                </Badge>
              ))}
            </div>

            <p className="text-gray-600 text-sm line-clamp-3 mb-2">
              {trip.tripData.summary}
            </p>

            <div className="text-xs text-gray-400">
              Dibuat pada:{" "}
              {new Date(trip.createdAt.seconds * 1000).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedTrip;
