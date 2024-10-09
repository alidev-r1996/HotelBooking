import {
  CalendarIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { createSearchParams, useNavigate } from "react-router-dom";

const SideBarFilter = ({ show, filter, setFilter }) => {
  const navigate = useNavigate();

  const guestIncrementHandler = (label) => {
    setFilter((prev) => {
      return { ...prev, [label]: prev[label] + 1 };
    });
  };

  const guestDecrementHandler = (label) => {
    setFilter((prev) => {
      return { ...prev, [label]: prev[label] - 1 <= 0 ? 0 : prev[label] - 1 };
    });
  };

  const Datehandler = (event) => {
    const { value, name } = event.target;
    if (name == "checkIn") {
      let plusDate = Number(value.substring(value.lastIndexOf("-") + 1)) + 1;
      let checkOut = value.substring(0, value.lastIndexOf("-") + 1) + plusDate;
      setFilter((prev) => {
        return { ...prev, [name]: value, checkOut };
      });
    } else {
      setFilter((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const searchHandler = () => {
    const isNoteEmpty = Object.entries(filter).filter(
      (item) => item[1] != false
    );
    console.log(isNoteEmpty)
    const encodedParams = createSearchParams({
      room: filter.room,
      destination: filter.location,
      checkIn: JSON.stringify(filter.checkIn),
      checkOut: JSON.stringify(filter.checkOut),
      adult: filter.adult,
      child: filter.child,
    });

    navigate({ pathname: "/hotel", search: encodedParams.toString() });
  };

  return (
    <div
      className={`${
        show ? "md:w-48 w-[80%] " : "w-0 -translate-x-8"
      } flex flex-col overflow-hidden whitespace-nowrap p-4  transition-all duration-500 fixed top-0 left-0 h-screen bg-rose-600 shadow`}
    >
      <div className="flex items-center gap-1 text-white">
        <CalendarIcon className="w-5 h-5" />
        <h1 className="font-bold text-sm ">Dates</h1>
      </div>
      <form className="flex flex-col mb-4">
        <input
          value={filter.checkIn}
          type="date"
          onChange={Datehandler}
          name="checkIn"
          id="checkIn"
          className="outline-none text-rose-600 rounded cursor-pointer px-2 mt-2  text-xs py-2"
        />
        <p className="p-1 bg-rose-500 text-white rounded shadow place-self-center">
          <ChevronDownIcon className="w-5 h-5" />
        </p>
        <input
          value={filter.checkOut}
          type="date"
          onChange={Datehandler}
          name="checkOut"
          id="checkOut"
          className="outline-none text-rose-600 rounded cursor-pointer px-2  text-xs py-2"
        />
      </form>
      <div className="flex flex-col mb-1 mt-8 text-rose-600">
        <div className="flex items-center gap-1 mb-2 text-white">
          <UsersIcon className="w-5 h-5" />
          <h1 className="font-bold text-sm ">Guests</h1>
        </div>
        <div className="flex items-center  justify-between bg-white p-1 pl-2 rounded mb-1">
          <p className="text-xs">adult</p>
          <div className="flex items-center gap-2">
            <p
              onClick={() => guestDecrementHandler("adult")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              -
            </p>
            <p className="text-xs">{filter.adult}</p>
            <p
              onClick={() => guestIncrementHandler("adult")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              +
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white p-1 pl-2 rounded mb-1">
          <p className="text-xs">children</p>
          <div className="flex items-center gap-2">
            <p
              onClick={() => guestDecrementHandler("child")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              -
            </p>
            <p className="text-xs">{filter.child}</p>
            <p
              onClick={() => guestIncrementHandler("child")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              +
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white p-1 pl-2 rounded">
          <p className="text-xs">room</p>
          <div className="flex items-center gap-2">
            <p
              onClick={() => guestDecrementHandler("room")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              -
            </p>
            <p className="text-xs">{filter.room}</p>
            <p
              onClick={() => guestIncrementHandler("room")}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition-all duration-200 cursor-pointer"
            >
              +
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={searchHandler}
        className="text-white flex items-center mt-12 py-2 gap-2 justify-center w-full px-2 bg-rose-500 transition-all duration-200 hover:bg-rose-400 rounded p-1 mr-2  cursor-pointer"
      >
        <p className="text-xs">Check Availibility</p>
        <MagnifyingGlassIcon className="w-4 h-4" />
      </div>
    </div>
  );
};

export default SideBarFilter;
