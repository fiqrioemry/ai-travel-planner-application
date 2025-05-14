import React, { useEffect, useState, useRef } from "react";
import cities from "@/api/cities.json";

type City = {
  id: number;
  name: string;
  province_id: number;
};

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export const CitySelector: React.FC<Props> = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const result = cities.filter((city: City) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query]);

  const handleSelect = (city: City) => {
    onChange(city.name);
    setQuery(city.name);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.parentElement?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative space-y-2">
      <label htmlFor="citySearch" className="block font-medium">
        Cari Kota/Kabupaten
      </label>
      <input
        type="text"
        id="citySearch"
        ref={inputRef}
        className="w-full px-3 py-2 border border-gray-300 bg-background rounded-md"
        placeholder="Ketik nama kota..."
        value={query}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute bg-background z-10 w-full max-h-64 overflow-y-auto border border-gray-300  shadow-md rounded-md">
          {filtered.map((city) => (
            <li
              key={city.id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer lowercase"
              onClick={() => handleSelect(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
