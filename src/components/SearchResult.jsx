import { Link, useSearchParams } from "react-router-dom";
import { useHotel } from "../context/Hotelcontext";

const SearchResult = () => {
  const { data, isLoading, currentHotel } = useHotel();
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <h1>search Result: ({data.length})</h1>
      <div className="flex flex-col gap-3 mt-4 hoverEffect">
        {data &&
          data.map((hotel) => {
            return (
              <Link
                key={hotel.id}
                to={`/hotel/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
              >
                <div className="flex rounded shadow overflow-hidden hover:scale-105 hover:shadow-[0_0_3px_rgba(0,0,0,0.5)]">
                  <img
                    src={hotel.picture_url.url}
                    alt=""
                    className="w-20 h-20"
                  />
                  <div className="flex flex-col p-1">
                    <h1
                      className={`font-bold text-xs ${
                        hotel.id == currentHotel ? "text-blue-700" : ""
                      }`}
                    >
                      {hotel.smart_location}
                    </h1>
                    <p className="text-[10px] text-slate-400">{hotel.name}</p>
                    <p className=" text-[10px] text-slate-500 mt-2">
                      <strong className="font-bold text-[16px] text-slate-900">
                        €{hotel.price}
                      </strong>{" "}
                      | PER NIGHT
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
