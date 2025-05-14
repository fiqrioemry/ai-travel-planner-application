import {
  fields,
  emojiMap,
  tripFormInitial,
  TripFormInitial,
} from "@/config/state";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/useTripStore";
import { CitySelector } from "@/components/CitySelection";
import { motion, AnimatePresence } from "framer-motion";

const CreateTrip: React.FC = () => {
  const { generateNewTrip } = useTripStore();
  const [formData, setFormData] = useState<TripFormInitial>(tripFormInitial);
  const lastVisibleFieldRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (name: keyof TripFormInitial, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedData = {
      ...formData,
      duration: parseInt(formData.duration),
    };
    generateNewTrip(parsedData);
  };

  const isFieldVisible = (index: number) => {
    if (index === 0) return true;
    const prevField = fields[index - 1];
    return formData[prevField.name] !== "";
  };

  const isFormComplete = Object.values(formData).every((v) => v !== "");
  const visibleLastIndex = fields.findIndex((_, i) => !isFieldVisible(i + 1));

  useEffect(() => {
    if (lastVisibleFieldRef.current) {
      lastVisibleFieldRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formData]);

  const renderField = (
    label: string,
    options: readonly string[],
    name: keyof TripFormInitial
  ) => {
    return (
      <div className="mb-10" key={name}>
        <h2 className="text-xl font-medium mb-4">{label}</h2>
        {name === "departure" || name === "destination" ? (
          <CitySelector
            value={formData[name] as string}
            onChange={(val) => handleInputChange(name, val)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleInputChange(name, opt)}
                className={`w-full p-4 border rounded-xl flex items-center gap-3 transition 
                  ${
                    formData[name] === opt
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
              >
                <span className="text-2xl">{emojiMap[opt]}</span>
                <span className="text-md font-medium">{opt}</span>
              </button>
            ))}
          </div>
        )}
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

      <form onSubmit={handleSubmit} className="mt-10 space-y-12">
        <div className="min-h-[550px]">
          <AnimatePresence>
            {fields.map((field, index) =>
              isFieldVisible(index) ? (
                <motion.div
                  key={field.name}
                  ref={index === visibleLastIndex ? lastVisibleFieldRef : null}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderField(field.label, field.options, field.name)}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
        {isFormComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <Button
              type="submit"
              className="text-md px-8 py-4 rounded-full shadow-lg"
            >
              Generate Trip
            </Button>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default CreateTrip;
