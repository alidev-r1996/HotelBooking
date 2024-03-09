import { NavLink } from "react-router-dom";
import ModalImage from "react-modal-image";
import { IoLocationSharp } from "react-icons/io5";

const Hotel = ({ hotel}) => {
  return (
    <div className="rounded shadow overflow-hidden hover:shadow-[0_0_3px_rgba(0,0,0,0.4)]">
      <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
        <ModalImage
          small={hotel.picture_url.url}
          large={hotel.picture_url.url}
          loading="lazy"
          alt="..."
          className="w-full h-full cursor-pointer hover:scale-105 transition-all duration-300 object-center object-cover lg:w-full lg:h-60"
        />
      </div>
      <div className="flex flex-col gap-1 p-2 py-4">
        <div className="flex items-center gap-1">
          <IoLocationSharp className="w-4 h-4 text-blue-500" />
          <NavLink to={`hotel/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`} className="font-bold hover:text-blue-500 transition-all duration-300 cursor-pointer">
            {hotel.smart_location}
          </NavLink>
        </div>
        <p className="text-slate-400 ml-5 text-xs capitalize ">{hotel.name}</p>
        <div className="flex items-center justify-between ">
          <p className="ml-5 text-[10px] text-slate-500 mt-2">
            <strong className="font-bold text-[16px] text-slate-900">
              €{hotel.price}
            </strong>{" "}
            | PER NIGHT
          </p>
          <p className="mr-6 mt-3 text-[9px] text-slate-500">
            {new Date(hotel.first_review).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
            })}{" "}
            -{" "}
            {new Date(hotel.last_review).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
