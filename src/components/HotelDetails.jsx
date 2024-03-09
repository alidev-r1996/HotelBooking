import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  FaKitchenSet,
  FaTv,
  FaBath,
  FaWifi,
  FaLocationDot,
} from "react-icons/fa6";
import { useEffect } from "react";
import { useHotel } from "../context/Hotelcontext";

const HotelDetails = () => {
  const { id } = useParams();
  const { getCurrentHotel } = useHotel();
  const { data, isLoading, isError } = useFetch(
    `http://localhost:5000/hotels/${id}`
  );

  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="md:p-2">
      <div className="lg:aspect-w-16 lg:aspect-h-9 aspect-none rounded overflow-hidden">
        <img
          src={data.picture_url.url}
          alt=""
          className="w-full h-full object-center object-cover "
        />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center gap-1">
          <FaLocationDot className="w-4 h-4 text-rose-500" />
          <p className="font-bold transition-all duration-300 cursor-pointer">
            {data.smart_location}
          </p>
        </div>
        <p className="text-slate-400 ml-5 text-xs capitalize ">{data.name}</p>
        <div className="grid grid-cols-2  ml-5 text-slate-700 text-xs">
          <div className="flex items-center gap-0.5 mt-4 ">
            <FaWifi className="w-4 h-4" />
            <p>Wireless</p>
          </div>
          <div className="flex items-center gap-0.5 mt-4 ">
            <FaKitchenSet className="w-4 h-4" />
            <p>Kitchen</p>
          </div>
          <div className="flex items-center gap-0.5 mt-4 ">
            <FaTv className="w-4 h-4" />
            <p>TV</p>
          </div>
          <div className="flex items-center gap-0.5 mt-4 ">
            <FaBath className="w-4 h-4" />
            <p>Bathroom</p>
          </div>
        </div>
        <p className="ml-5 text-[10px] text-slate-500 mt-6">
          <strong className="font-bold text-[16px] text-slate-900">
            €{data.price}
          </strong>{" "}
          | PER NIGHT
        </p>
      </div>
    </div>
  );
};

export default HotelDetails;
