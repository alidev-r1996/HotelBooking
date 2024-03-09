import { Outlet } from "react-router-dom";
import Map from "./Map/Map";
import { useHotel } from "../context/Hotelcontext";

const AppLayout = () => {
    const { data, isLoading } = useHotel()
    return ( 
        <div
          className={` md:grid flex flex-col gap-4  md:grid-cols-5 shadow bg-white m-4  transition-all duration-500`}
        >
            <div className="col-span-2  ">
                <Outlet />
            </div>

            <div id="map" className="col-span-3 h-screen relative">
                <Map  data={data}/>
            </div>
        </div>
     );
}
 
export default AppLayout;