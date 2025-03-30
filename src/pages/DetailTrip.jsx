import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTripStore } from "@/store/useTripStore";

const DetailTrip = () => {
  const { tripId } = useParams();
  const { getTripDetail, trip } = useTripStore();

  useEffect(() => {
    getTripDetail(tripId);
  }, [getTripDetail, tripId]);

  if (!trip) return null;

  console.log(trip);

  return (
    <section className="h-screen flex items-center justify-center">
      <h1>Display Trip Page</h1>
    </section>
  );
};

export default DetailTrip;
