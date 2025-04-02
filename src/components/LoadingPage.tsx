import React from "react";
import Logo from "@/components/Logo";

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative w-32 h-32">
        {/* Gradient Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 animate-spin" />

        {/* Inner Circle with Logo */}
        <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center shadow-md">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
