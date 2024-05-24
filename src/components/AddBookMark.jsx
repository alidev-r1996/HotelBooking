import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookmarkAction } from "../context/BookmarkContext";
import { BOOKMARK_INPUT_FORM } from "../constants/constant";
import { LOCATION_API_BASE_URL } from "../constants/constant";

const AddBookMark = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const dispatch = useBookmarkAction();
  const navigate = useNavigate();
  const [bookmarkForm, setBookmarkForm] = useState({
    cityName: "",
    country: "",
    countryCode: "",
    latitude: "",
    longitude: "",
    host_location: "",
  });

  useEffect(() => {
    axios
      .get(`${LOCATION_API_BASE_URL}?latitude=${lat}&longitude=${lng}`)
      .then(({ data }) => {
        setBookmarkForm({
          latitude: lat,
          longitude: lng,
          cityName: data.city,
          country: data.countryName,
          countryCode: data.countryCode,
          host_location: data.locality,
        });
      });
  }, [lat, lng]);

  const AddBookmarkHandler = async (event) => {
    event.preventDefault();
    await dispatch({type: "ADD_BOOKMARK", payload: bookmarkForm})
    setBookmarkForm({
      city: "",
      country: "",
      countryCode: "",
      latitude: "",
      longitude: "",
      host_location: "",
    });
    navigate("/bookmark");
  };

  return (
    <div className="p-4 ">
      <h1 className="font-bold mb-8">Add Bookmark</h1>
      <form onSubmit={AddBookmarkHandler} className="flex flex-col gap-4">
        {BOOKMARK_INPUT_FORM.map((item) => {
          return (
            <div key={item.id} className="relative">
              <input
                type="text"
                name={item.name}
                id={item.name}
                minLength={2}
                placeholder={item.name}
                value={bookmarkForm[item.name]}
                onChange={(event) =>
                  setBookmarkForm({
                    ...bookmarkForm,
                    [event.target.name]: event.target.value,
                  })
                }
                className="BookmarkInput peer"
              />
              <p className="BookmarkLabel ">{item.name}</p>
            </div>
          );
        })}
        <button
          disabled={Object.entries(bookmarkForm).some(
            (item) => item[1].length < 2
          )}
          className="px-3 disabled:cursor-not-allowed py-2 rounded bg-blue-700 transition-all duration-300 text-white hover:bg-blue-600 shadow-[0_0_3px_1.5px_rgba(29,78,216,0.5)] text-sm"
        >
          Add Bookmark
        </button>
      </form>
    </div>
  );
};

export default AddBookMark;
