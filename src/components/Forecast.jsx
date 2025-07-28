import getWeatherIcon from "../utils/GetWeatherIcons";

export default function Forecast({ forecast, unit }) {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center ">
      {forecast.map((item, index) => (
        <div key={index} className="bg-[#1e213a] p-4 text-center rounded-md">
          <p className="text-sm mb-2">
            {new Date(item.date).toLocaleDateString("es-ES", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </p>
          <div className="flex items-center justify-center mb-5 size-16 ml-2.5">
            {getWeatherIcon(item.weather.main)}
          </div>
          <div className="mt-2 flex gap-4 items-center justify-center">
            <p className="text-xl font-bold">
              {Math.round(item.temp_max)}
              {unitSymbol}
            </p>
            <p className="text-gray-400">
              {Math.round(item.temp_min)}
              {unitSymbol}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
