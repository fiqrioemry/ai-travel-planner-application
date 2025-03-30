import { useParams } from "react-router-dom";

const DetailTrip = () => {
  const { tripId } = useParams();
  console.log(tripId);
  return (
    <section className="h-screen flex items-center justify-center">
      <h1>Display Trip Page</h1>
    </section>
  );
};

export default DetailTrip;
