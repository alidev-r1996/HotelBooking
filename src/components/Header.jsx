import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
  HomeIcon, BookmarkIcon
} from "@heroicons/react/24/solid";
import SideBarFilter from "./sideBarFilter";
import {
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { useState, useTransition } from "react";

const Header = ({ show, setShow, children }) => {
  const [filter, setFilter] = useState({
    location: "",
    child: 0,
    adult: 1,
    room: 1,
    checkIn: "",
    checkOut: "",
  });
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const searchHandler = (event) => {
    event.preventDefault();
    setFilter((prev) => {
      return { ...prev, location: event.target.value };
    });
    startTransition(() => {
        const encodedParams = createSearchParams({
          destination: event.target.value,
        });

        navigate({ pathname: "/hotel", search: encodedParams.toString() });
    });
  };

  return (
    <>
      <div
        className={` flex gap-4 shadow items-center bg-white justify-between transition-all duration-500`}
      >
        <div className="flex flex-1 items-center ">
          <p className="p-4 cursor-pointer" onClick={setShow}>
            <Bars3Icon className="w-6 h-6" />
          </p>
          <p
            className="p-4 cursor-pointer text-blue-900"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="w-6 h-6" />
          </p>
          <p
            className="p-4 cursor-pointer text-blue-900"
            onClick={() => navigate("/bookmark")}
          >
            <BookmarkIcon className="w-5 h-5" />
          </p>
          <form className="flex flex-1 md:mx-6 mx-3 items-center gap-2 px-2  py-1 border bg-white border-gray-200 rounded-full">
            <p className=" text-rose-500">
              <MapPinIcon className="w-5 h-5" />
            </p>
            <input
              type="text"
              name="search"
              value={filter.location}
              onChange={searchHandler}
              id="search"
              className="outline-none text-sm flex-1  w-full bg-transparent"
              placeholder="where to go?"
            />
            <p
              onClick={searchHandler}
              className=" text-rose-500 cursor-pointer rounded-full p-1"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </p>
          </form>

          <p
            onClick={() => navigate("/auth")}
            className="p-1 rounded-full bg-slate-800 text-white mr-4 cursor-pointer"
          >
            <UserIcon className="w-5 h-5" />
          </p>
        </div>
      </div>
      <SideBarFilter show={show} filter={filter} setFilter={setFilter} />
      {children}
    </>
  );
};

export default Header;
