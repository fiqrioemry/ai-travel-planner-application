import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React from "react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 ">
      <img
        src="/error-not-found.png"
        alt="Halaman tidak ditemukan"
        className="w-72 h-72 object-contain mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Oops! Halaman tidak ditemukan</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Sepertinya kamu mengakses halaman yang tidak tersedia atau mungkin sudah
        dipindahkan. Jangan khawatir, kamu bisa kembali ke beranda dan
        melanjutkan petualanganmu!
      </p>
      <Button
        onClick={() => navigate("/")}
        className="rounded-full w-44 px-6 py-2 text-sm"
      >
        🔙 Kembali ke Beranda
      </Button>
    </section>
  );
};

export default NotFound;
