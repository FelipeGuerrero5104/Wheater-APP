import getWeatherIcon from "../utils/GetWeatherIcons";

export default function Header({
  weather,
  openModal,
  onUseCurrentLocation,
  unit,
}) {
  const icon = getWeatherIcon(weather.weather[0].main);
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onUseCurrentLocation(latitude, longitude);
        },
        (error) => {
          alert("No se pudo obtener la ubicación: " + error.message);
        }
      );
    } else {
      alert("La geolocalización no es soportada por este navegador.");
    }
  };

  return (
    <div className="bg-[#1e213a] flex flex-col items-center justify-between p-8 gap-4 md:w-[60%] h-screen text-white relative overflow-hidden">
      <div className="flex justify-between w-full items-center">
        <button
          className="bg-gray-500 px-4 py-2 cursor-pointer"
          onClick={openModal}
        >
          Search for Places
        </button>
        <img
          src="location.svg"
          alt="location"
          className="bg-gray-500 size-10 rounded-full p-1.5 cursor-pointer"
          onClick={handleGetLocation}
        />
      </div>

      <div className="absolute top-[10%] w-full h-[300px] opacity-10 z-0 bg-center bg-no-repeat bg-contain bg-[url('Cloud-background.png')]" />

      <div className="z-10">
        <div className="text-[10rem]">{icon}</div>
      </div>

      <div className=" z-10 flex items-center">
        <h1 className="text-9xl font-semibold">
          {Math.round(weather.main.temp)}
        </h1>
        <p className="text-gray-400 text-6xl">{unitSymbol}</p>
      </div>

      <div className="text-6xl text-gray-400 capitalize z-10">
        {weather.weather[0].description}
      </div>

      <div className="text-sm text-gray-400 z-10">
        Today ·{" "}
        {new Date().toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </div>

      <div className="text-sm text-gray-400 flex gap-3 items-center z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <p>
          {weather.name}, {weather.sys.country}
        </p>
      </div>
    </div>
  );
}
