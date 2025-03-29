import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const descriptions = [
  "Sedang mempersiapkan perjalananmu",
  "Mencari liburan terbaik",
  "Menyesuaikan rekomendasi destinasi",
  "Mengumpulkan tiket dan akomodasi",
];

const icons = ["🚀", "🚢"];

const LoadingTripCreation = () => {
  const [iconIndex, setIconIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
      setDescIndex((prev) => (prev + 1) % descriptions.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-10 min-w-96 rounded-lg shadow-lg bg-background">
        {/* Floating Emoji with swipe animation */}
        <div className="h-20 w-20 text-6xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={iconIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                {icons[iconIndex]}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fading description text */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={descIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-medium"
            >
              {descriptions[descIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingTripCreation;
