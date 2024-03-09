import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useReducerAsync } from "use-reducer-async";

const BookmarkContext = createContext();
const BookmarkContextDispatcher = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";
const initialState = {
  isLoading: false,
  isError: null,
  bookmarks: [],
  currentBookmark: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "GET_SUCCESS":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "ADD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "REMOVE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks].filter((b) => b.id != action.payload),
      };
    case "CURRENT_LOADED":
      return { ...state, currentBookmark: action.payload };
    case "REJECTED":
      return { ...state, isLoading: false, isError: action.payload };
    default:
      throw new Error("Unknow Action!");
  }
};

const asyncActionHandlers = {
  GET_BOOKMARK:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: "LOADING" });
      try {
        const res = await axios.get(BASE_URL);
        dispatch({ type: "GET_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "REJECTED", payload: error.message });
      }
    },
  DELETE_BOOKMARK:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: "LOADING" });
      try {
        const res = await axios.delete(`${BASE_URL}/${action.payload}`);
        dispatch({ type: "REMOVE_SUCCESS", payload: action.payload });
      } catch (error) {
        dispatch({ type: "REJECTED", payload: error.message });
      }
    },
  ADD_BOOKMARK:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: "LOADING" });
      try {
        const res = await axios.post(BASE_URL, action.payload);
        dispatch({ type: "ADD_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "REJECTED", payload: error.message });
      }
    },
  CURRENT_BOOKMARK:
    ({ dispatch }) =>
    (action) => {
      dispatch({ type: "CURRENT_LOADED", payload: action.payload });
    },
};

const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

  useEffect(() => {
    dispatch({ type: "GET_BOOKMARK" });
  }, []);

  // const [CurrentBookmark, setCurrentBookmark] = useState(null);
  // const [isError, setIserror] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmark, setBookmark] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(BASE_URL)
  //     .then(({ data }) => {
  //       setBookmark(data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIserror(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  // const getCurrentBookmark = (id) => {
  //   setCurrentBookmark(id);
  // };

  // const PostBookmark = (bookmark) => {
  //   setIsLoading(true);
  //   axios
  //     .post(`http://localhost:5000/bookmarks`, bookmark)
  //     .then(({ data }) => {
  //       setBookmark((prev) => [...prev, data]);
  //       setIsLoading(false);
  //       setCurrentBookmark(data.id);
  //     })
  //     .catch((err) => {
  //       setIserror(err);
  //       setIsLoading(false);
  //     });
  // };

  // const RemoveBookmark = (id) => {
  //   setIsLoading(true);
  //   axios
  //     .delete(`http://localhost:5000/bookmarks/${id}`)
  //     .then((res) => {
  //       setBookmark((prev) => prev.filter((bookmark) => bookmark.id != id));
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIserror(err);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <BookmarkContext.Provider value={state}>
      <BookmarkContextDispatcher.Provider value={dispatch}>
        {children}
      </BookmarkContextDispatcher.Provider>
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);
export const useBookmarkAction = () => useContext(BookmarkContextDispatcher);
