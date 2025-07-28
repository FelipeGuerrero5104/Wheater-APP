import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import Header from "./components/Header";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import Modal from "./components/Modal";

function App() {
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => {
          setLocation({ lat: -33.4489, lon: -70.6693 });
        }
      );
    }
  }, [location]);

  const { weather, forecast } = useWeather(location?.lat, location?.lon, unit);

  const openModal = () => setIsModalOpen(true);

  const handleLocationChange = (lat, lon) => {
    setLocation({ lat, lon });
    setIsModalOpen(false);
  };

  if (!location || !weather || !forecast) {
    return (
      <div className="text-white text-center mt-10">
        <p>Cargando datos del clima...</p>
        <p>location: {JSON.stringify(location)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100e1d] text-white font-sans grid sm:grid-cols-2">
      <Header
        weather={weather}
        openModal={openModal}
        onUseCurrentLocation={handleLocationChange}
        unit={unit}
        setUnit={setUnit}
      />
      <div className="flex flex-col gap-6  md:mr-24">
        <div className="flex gap-4 mb-4  justify-end ">
          <button
            onClick={() => setUnit("metric")}
            className={`px-3 py-2 rounded-full font-semibold text-xl ${
              unit === "metric" ? "bg-gray-200 text-black" : "bg-gray-500"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-3 py-2 rounded-full font-semibold text-xl ${
              unit === "imperial" ? "bg-gray-200 text-black" : "bg-gray-500"
            }`}
          >
            °F
          </button>
        </div>

        <Forecast forecast={forecast} unit={unit} />
        <Highlights weather={weather} unit={unit} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={(coords) => handleLocationChange(coords.lat, coords.lon)}
      />
    </div>
  );
}

export default App;
