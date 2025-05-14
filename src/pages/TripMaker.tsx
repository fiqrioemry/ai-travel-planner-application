import {
  fields,
  emojiMap,
  tripFormInitial,
  TripFormInitial,
} from "@/config/state";
import { ArrowLeft } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/useTripStore";
import { motion, AnimatePresence } from "framer-motion";
import { CitySelector } from "@/components/CitySelection";

const TripMaker: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const { generateNewTrip } = useTripStore();
  const [formData, setFormData] = useState<TripFormInitial>(tripFormInitial);
  const currentField = fields[step];

  const handleInputChange = (name: keyof TripFormInitial, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => {
      if (step < fields.length - 1) {
        setStep((prev) => prev + 1);
      } else {
        setStep((prev) => prev + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      duration: parseInt(formData.duration),
    };
    generateNewTrip(parsedData);
  };

  const renderOptions = (
    options: readonly string[],
    name: keyof TripFormInitial
  ) => {
    if (name === "departure" || name === "destination") {
      return (
        <div className="mt-6">
          <CitySelector
            value={formData[name] as string}
            onChange={(value) => handleInputChange(name, value)}
          />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {options.map((opt) => (
          <motion.div
            key={opt}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <button
              type="button"
              onClick={() => handleInputChange(name, opt)}
              className="w-full p-4 border rounded-xl flex items-center gap-3 hover:shadow-md transition border-gray-200 hover:border-blue-500"
            >
              <span className="text-2xl">{emojiMap[opt]}</span>
              <span className="text-md font-medium">{opt}</span>
            </button>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Buat Rencana Liburan Impianmu 🌍✨</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Beri tahu kami sedikit tentang preferensimu, dan biarkan AI kami
        menyusun itinerary liburan yang sempurna hanya untukmu.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 min-h-[575px] space-y-12">
        <AnimatePresence mode="wait">
          {step < fields.length && (
            <motion.div
              key={currentField.name}
              exit={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              initial={{ opacity: 0, y: 40 }}
            >
              <div className="flex justify-start mb-4">
                {step > 0 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    className="w-36 rounded-full"
                  >
                    <ArrowLeft />
                    <span>Kembali</span>
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-medium mb-4">{currentField.label}</h2>
              {renderOptions(currentField.options, currentField.name)}
            </motion.div>
          )}

          {step === fields.length && (
            <motion.div
              key="submit"
              exit={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              initial={{ opacity: 0, y: 40 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-start">
                <Button
                  className="w-36 rounded-full"
                  type="button"
                  onClick={handleBack}
                >
                  <ArrowLeft />
                  <span>Kembali</span>
                </Button>
              </div>
              <div className="text-5xl mb-4">🌎🏖️</div>
              <h3 className="text-lg font-semibold mb-6">
                Semua sudah siap! Klik tombol di bawah ini untuk membuat
                perjalanan impianmu 🚀
              </h3>
              <Button
                type="submit"
                className="text-md px-8 py-4 rounded-full shadow-lg"
              >
                Generate Trip
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default TripMaker;
