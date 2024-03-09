import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

const HotelProvider = ({ children }) => {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = searchParams.get("room") || "";
  const { data, isLoading, isError } = useFetch(
    BASE_URL,
    `host_location_like=${destination || ""}&${room && `accommodates=${room || 1}`}`
  );


  const getCurrentHotel = (id) => {
    setCurrentHotel(id);
  };

  return (
    <HotelContext.Provider
      value={{ data, isLoading, currentHotel, getCurrentHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

export const useHotel = () => useContext(HotelContext);
