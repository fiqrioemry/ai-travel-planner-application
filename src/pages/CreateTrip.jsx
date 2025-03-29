import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTripStore } from "../store/useTripStore";
import { motion, AnimatePresence } from "framer-motion";

const durations = ["3 Hari", "5 Hari", "7 Hari"];
const travelTypes = ["Solo", "Couple", "Family"];
const budgets = ["Hemat", "Menengah", "Mewah"];
const activityLevels = ["Santai", "Seimbang", "Padat"];
const interests = ["Kuliner", "Belanja", "Wisata Alam", "Sejarah"];
const cities = ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar"];

const tripFormInitial = {
  departure: "",
  destination: "",
  duration: "",
  travelType: "",
  budget: "",
  interest: "",
  activityLevel: "",
};

function CreateTrip() {
  const { GenerateNewTrip } = useTripStore();
  const [formData, setFormData] = useState(tripFormInitial);
  const [step, setStep] = useState(0);

  console.log(formData);

  const fields = [
    {
      name: "departure",
      label: "Dari mana kamu akan berangkat?",
      options: cities,
      icon: "🧳",
    },
    {
      name: "destination",
      label: "Tujuan liburan kamu?",
      options: cities,
      icon: "📍",
    },
    {
      name: "duration",
      label: "Berapa lama kamu ingin liburan?",
      options: durations,
      icon: "🕒",
    },
    {
      name: "travelType",
      label: "Kamu akan bepergian dengan siapa?",
      options: travelTypes,
      icon: "👥",
    },
    {
      name: "budget",
      label: "Pilih budget kamu",
      options: budgets,
      icon: "💰",
    },
    {
      name: "interest",
      label: "Apa yang paling kamu minati?",
      options: interests,
      icon: "🎯",
    },
    {
      name: "activityLevel",
      label: "Pilih tingkat aktivitas yang kamu inginkan",
      options: activityLevels,
      icon: "🤸‍♂️",
    },
  ];

  const currentField = fields[step];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => {
      if (step < fields.length - 1) {
        setStep((prev) => prev + 1);
      } else {
        setStep((prev) => prev + 1); // move to submit button
      }
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GenerateNewTrip(formData);
  };

  const renderOptions = (options, name, icon) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {options.map((opt) => (
        <motion.div
          key={opt}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => handleInputChange(name, opt)}
            className="w-full p-4 border rounded-xl flex items-center gap-3 hover:shadow-md transition border-gray-200 hover:border-blue-500"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-md font-medium">{opt}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Buat Rencana Liburan Impianmu 🏖️✨</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Beri tahu kami sedikit tentang preferensimu, dan biarkan AI kami
        menyusun itinerary liburan yang sempurna hanya untukmu.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 min-h-64 space-y-12">
        <AnimatePresence mode="wait">
          {step < fields.length && (
            <motion.div
              key={currentField.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-start mb-4">
                {step > 0 && (
                  <Button className="w-36" type="button" onClick={handleBack}>
                    <ArrowLeft />
                    <span>Kembali</span>
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-medium mb-4">{currentField.label}</h2>
              {renderOptions(
                currentField.options,
                currentField.name,
                currentField.icon
              )}
            </motion.div>
          )}

          {step === fields.length && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-start">
                <Button className="w-36" type="button" onClick={handleBack}>
                  <ArrowLeft />
                  <span>Kembali</span>
                </Button>
              </div>
              <div className="text-5xl mb-4">🌎 🚀</div>
              <h3 className="text-lg font-semibold mb-6">
                Semua sudah siap! Klik tombol di bawah ini untuk membuat
                perjalanan impianmu
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
}

export default CreateTrip;
