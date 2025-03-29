import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass, Map, Hotel } from "lucide-react";
import travelSvg from "@/assets/illustration-travel.png";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 space-y-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Temukan Petualangan Berikutnya Bersama AI Agent <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Travelo
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Rancang perjalanan impianmu hanya dalam hitungan detik. Didukung oleh
          AI pintar, kami bantu kamu memilih destinasi, menyusun itinerary, dan
          menemukan hotel terbaik — secara otomatis dan personal.
        </p>
        <Button size="lg" className="rounded-full px-8 text-md shadow">
          Mulai Sekarang
        </Button>
      </motion.div>

      {/* Ilustrasi */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={travelSvg}
          alt="AI Travel Planner"
          className="w-full max-w-lg"
        />
      </motion.div>

      {/* Fitur Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl"
      >
        <Feature
          icon={<Compass className="w-8 h-8 text-blue-500" />}
          title="Destinasi Personalisasi"
          description="AI kami memahami preferensimu dan merekomendasikan tempat terbaik sesuai gaya traveling kamu."
        />
        <Feature
          icon={<Map className="w-8 h-8 text-purple-500" />}
          title="Itinerary Otomatis"
          description="Dapatkan rencana perjalanan lengkap harian, waktu terbaik untuk berkunjung, dan rute efisien."
        />
        <Feature
          icon={<Hotel className="w-8 h-8 text-pink-500" />}
          title="Rekomendasi Hotel"
          description="Temukan penginapan dengan harga terbaik dan ulasan terpercaya, semuanya dalam satu klik."
        />
      </motion.div>
    </section>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="text-left space-y-3">
    <div>{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default Home;
