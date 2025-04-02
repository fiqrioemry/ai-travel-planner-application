import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DarkModeToggleProps {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDark,
  toggleDark,
}) => {
  return (
    <div
      className="w-12 h-6 rounded-full bg-muted flex items-center px-[2px] cursor-pointer relative"
      onClick={toggleDark}
    >
      {/* Icon Switcher */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center absolute ${
          isDark ? "right-1" : "left-1"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-orange-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DarkModeToggle;
