import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { emojiMap } from "@/config/state";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTripStore, type Trip } from "@/store/useTripStore";

const SavedTrip: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<Record<string, string>>({});
  const { getUserTrips, trips, fetchWikipediaImage, deleteTrip } =
    useTripStore();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);

  useEffect(() => {
    getUserTrips();
  }, [getUserTrips]);

  useEffect(() => {
    if (Array.isArray(trips) && trips.length > 0) {
      fetchImages();
    }
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

  const handleDeleteConfirm = async () => {
    if (tripToDelete?.id) {
      await deleteTrip(tripToDelete.id);
      setConfirmOpen(false);
      setTripToDelete(null);
    }
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
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">
        Daftar Rencana Perjalanan Kamu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(trips as Trip[]).map((trip) => (
          <div
            key={trip.id}
            className="relative border rounded-lg p-5 shadow hover:shadow-lg transition"
          >
            <button
              onClick={() => {
                setTripToDelete(trip);
                setConfirmOpen(true);
              }}
              className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="cursor-pointer"
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
                {trip.tripSelection.duration} Hari
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
                {new Date(
                  "seconds" in trip.createdAt
                    ? trip.createdAt.seconds * 1000
                    : trip.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={() => setConfirmOpen(false)}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogContent className="bg-background p-6 rounded shadow-md max-w-md w-full">
            <DialogTitle className="text-lg text-center font-semibold mb-3">
              Hapus Rencana Perjalanan?
            </DialogTitle>
            <DialogDescription className="mb-4 text-gray-600">
              Apakah kamu yakin ingin menghapus perjalanan ini? Tindakan ini
              tidak bisa dibatalkan.
            </DialogDescription>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
                Batal
              </Button>
              <Button variant="delete" onClick={handleDeleteConfirm}>
                Hapus
              </Button>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </section>
  );
};

export default SavedTrip;
