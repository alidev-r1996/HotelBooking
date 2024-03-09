import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetLocation from "../../hooks/useGetLocation";

const Map = ({data}) => {
  const [centerPosition, setCenterPosition] = useState([48.56, 2.35]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getPosition, position, isLoading: loading, error } = useGetLocation();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setCenterPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(()=>{
    if (position.lat && position.lng) setCenterPosition([position.lat, position.lng])
  },[position])

  return (
    <>
      <MapContainer
        className="h-screen w-full relative"
        center={centerPosition}
        zoom={15}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="absolute z-[1000] bottom-2 left-2 px-1 py-1 font-bold hover:bg-blue-600 rounded shadow-[0_0_7px_2px_rgba(29,78,216,0.6)] bg-blue-700 text-white text-[10px]"
        >
          use Your Location
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeMapCenter position={centerPosition} />
        {data &&
          data.map((hotel) => {
            return (
              <Marker
                key={hotel.id}
                position={[hotel.latitude, hotel.longitude]}
              >
                <Popup>{hotel.host_location}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </>
  );
};

export default Map;

function ChangeMapCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: (e)=> {
      navigate(`/bookmark/add/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
  return null;
}
