import { Link, useParams } from "react-router-dom";
import { useBookmark, useBookmarkAction } from "../context/BookmarkContext";
import ReactCountryFlag from "react-country-flag";
import { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const BookmarkList = () => {
  const { id } = useParams();
  const  {isLoading, bookmarks, isError, currentBookmark} = useBookmark();
  const dispatch= useBookmarkAction();

  const removeBookmarkHandler = async (event, id)=>{
    event.preventDefault();
    await dispatch({type: "DELETE_BOOKMARK", payload: id})
  }
  
  
  useEffect(() => {
    if (id) dispatch({type: "CURRENT_BOOKMARK", payload: id})
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 ">
      <h1 className="font-bold text-sm mb-4">Bookmark List</h1>

      <div className="flex flex-col gap-2 hoverEffect">
      {bookmarks.map((bookmark) => {
        return (
          <Link
            to={`/bookmark/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
            key={bookmark.id}
            className={`border p-2 flex justify-between items-center  border-gray-200 hover:scale-105 hover:shadow-[0_0_3px_rgba(0,0,0,0.6)] transition-all duration-200 cursor-pointer rounded shadow gap-2 ${currentBookmark && bookmark.id != currentBookmark ? "" : "text-blue-700" }`}
          >
              <div className="flex items-center gap-2">
              <ReactCountryFlag
              style={{ fontSize: "2rem" }}
              countryCode={bookmark.countryCode}
              svg
            />
            <p className="text-xs font-bold">{bookmark.cityName}</p>
            <p className="text-xs text-gray-400">|</p>
            <p className="text-xs">{bookmark.country}</p>
              </div>
              <button onClick={(e)=>removeBookmarkHandler(e,bookmark.id)} className="p-1 rounded-full hover:bg-rose-600 hover:text-white text-rose-600 transition-all duration-200">
                <TrashIcon className="w-4 h-4"/>
              </button>
          </Link>
        );
      })}
      </div>
    </div>
  );
};

export default BookmarkList;
