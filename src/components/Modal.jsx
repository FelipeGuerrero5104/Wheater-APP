import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSearchClick = async () => {
    if (!inputValue.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.length === 0) {
        alert("No se encontraron resultados 😥");
      }

      setSearchResults(data);
    } catch (err) {
      console.error("Error buscando ciudades:", err);
    }
  };

  const handleSelectCity = (cityObj) => {
    const coords = { lat: cityObj.lat, lon: cityObj.lon };
    onSearch(coords);
    setInputValue("");
    setSearchResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-[#1e213a] text-white w-full md:w-[30%] h-full shadow-lg p-6 animate-slideIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-2xl cursor-pointer"
        >
          ✕
        </button>

        <div className="flex justify-between mt-10 items-center">
          <input
            type="text"
            placeholder="search location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border border-white lg:w-[300px] lg:h-[40px] w-[150px] text-white placeholder-gray-400 bg-transparent"
          />
          <button
            onClick={handleSearchClick}
            className="bg-[#3c47e9] px-4 py-2 cursor-pointer"
          >
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="mt-6 space-y-2">
            {searchResults.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="cursor-pointer hover:bg-[#3c47e9] p-2 rounded transition"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
