import { useEffect, useState } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const token = import.meta.env.VITE_API_KEY_LOCATION;
        const { data } = await axios.get(
          `https://ipinfo.io/json?token=${token}`
        );
        const [lat, lon] = data.loc.split(",");
        setLocation({ city: data.city, lat, lon });
      } catch (error) {
        console.error("Error al obtener ubicación:", error);
      }
    };

    fetchLocation();
  }, []);

  return location;
};

export default useLocation;
