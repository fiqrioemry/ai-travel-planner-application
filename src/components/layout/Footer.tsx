import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t mt-4 py-4 text-center text-sm text-muted-foreground">
      <div>Travelo Copyright 2025</div>
      <div>
        Dibuat dengan ❤️ oleh{" "}
        <a href="https://www.ahmadfiqrioemry.com">
          <span className="font-medium text-black dark:text-white">
            ahmadfiqrioemry
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
