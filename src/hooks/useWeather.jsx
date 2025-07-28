import { useEffect, useState } from "react";
import axios from "axios";

const useWeather = (lat, lon, unit = "metric") => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setWeather(null);
      setForecast(null);
      return;
    }

    const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;

    const fetchWeather = async () => {
      try {
        const res1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=es`
        );

        const res2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=es`
        );

        const grouped = {};
        res2.data.list.forEach((item) => {
          const [date] = item.dt_txt.split(" ");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        const today = new Date().toISOString().split("T")[0];
        const futureDays = Object.entries(grouped)
          .filter(([date]) => date > today)
          .slice(0, 5);

        const dailyForecast = futureDays.map(([date, items]) => {
          const temps = items.map((i) => i.main);
          const min = Math.min(...temps.map((t) => t.temp_min));
          const max = Math.max(...temps.map((t) => t.temp_max));
          const preferred =
            items.find((i) => i.dt_txt.includes("12:00:00")) || items[0];
          return {
            date,
            temp_min: min,
            temp_max: max,
            weather: preferred.weather[0],
          };
        });

        setWeather(res1.data);
        setForecast(dailyForecast);
      } catch (err) {
        console.error("Error al obtener clima:", err);
        setWeather(null);
        setForecast(null);
      }
    };

    fetchWeather();
  }, [lat, lon, unit]);

  return { weather, forecast };
};

export default useWeather;
