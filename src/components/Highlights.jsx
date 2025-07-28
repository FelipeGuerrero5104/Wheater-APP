export default function Highlights({ weather, unit }) {
  const windSpeedUnit = unit === "metric" ? "m/s" : "mph";
  const visibilityKm = (weather.visibility / 1000).toFixed(2);
  const visibilityMiles = (weather.visibility / 1609.344).toFixed(2);
  const visibility = unit === "metric" ? visibilityKm : visibilityMiles;

  return (
    <div>
      <h1 className="md:text-2xl font-semibold mb-5">Today's Highlights</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-x-28 items-center md:mr-24 mt-5">
        <div className="bg-[#1e213a] p-6 rounded-md lg:w-[300px] h-40 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h3 className="text-sm mb-2">Wind Status</h3>
          <p className="text-3xl lg:text-5xl font-bold">
            {weather.wind.speed.toFixed(2)} {windSpeedUnit}
          </p>
        </div>
        <div className="bg-[#1e213a] p-6 rounded-md lg:w-[300px] h-40 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h3 className="text-sm mb-2">Humidity</h3>
          <p className="text-3xl lg:text-5xl font-bold">
            {weather.main.humidity}%
          </p>
        </div>
        <div className="bg-[#1e213a] p-6 rounded-md lg:w-[300px] h-40 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h3 className="text-sm mb-2">Visibility</h3>
          <p className="text-3xl lg:text-5xl font-bold">
            {visibility} {unit === "metric" ? "km" : "mi"}
          </p>
        </div>
        <div className="bg-[#1e213a] p-6 rounded-md lg:w-[300px] h-40 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h3 className="text-sm mb-2">Air pressure</h3>
          <p className="text-3xl lg:text-5xl font-bold">
            {weather.main.pressure} mb
          </p>
        </div>
      </div>
    </div>
  );
}
