import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Hotel from "./hotel";

const HotelList = () => {
  const { data, isLoading, isError } = useFetch(
    `http://localhost:5000/hotels`,
  );

  return (
    <div
      className={` grid gap-4  grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] shadow p-4  bg-white m-4  transition-all duration-500`}
    >
      {isLoading && <Loading />}
      {data &&
        data.map((hotel) => {
          return <Hotel key={hotel.id} hotel={hotel} />;
        })}
    </div>
  );
};

export default HotelList;
