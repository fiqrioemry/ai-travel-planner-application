import React from "react";
import { useParams } from "react-router-dom";

const DisplayTrip = () => {
  const { id } = useParams();
  return (
    <section className="h-screen flex items-center justify-center">
      <h1>Display Trip Page</h1>
    </section>
  );
};

export default DisplayTrip;
