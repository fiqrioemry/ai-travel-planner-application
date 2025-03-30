import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "@/store/useTripStore";
import { Skeleton } from "@/components/ui/skeleton";

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

const SavedTrip = () => {
  const { getUserTrips, trips } = useTripStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUserTrips();
  }, [getUserTrips]);

  if (!trips) {
    return <Skeleton className="w-full h-96" />;
  }

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
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="border rounded-lg p-5 shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {trip.tripSelection.destination} - {trip.tripSelection.duration}
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
