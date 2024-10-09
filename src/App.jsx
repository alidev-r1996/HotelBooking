import { Suspense, lazy, useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HotelProvider from "./context/Hotelcontext";
import SearchResult from "./components/SearchResult";
import HotelList from "./components/hotelList";
import HotelDetails from "./components/HotelDetails";
import BookmarkList from "./components/BookmarkList";
import AddBookMark from "./components/AddBookMark";
import BookmarkProvider from "./context/BookmarkContext";
import Auth from "./components/Auth/Auth";
import Loading from "./components/Loading";

const BookmarkLayout = lazy(() => import("./components/BookmarkLayout"));
const AppLayout = lazy(() => import("./components/AppLayout"));

function App() {
  const [show, setShow] = useState(false);

  return (
    <BookmarkProvider>
      <HotelProvider>
        <div
          className={`${
            show ? "md:ml-48 ml-[80%]" : "ml-0"
          } transition-all duration-500`}
        >
          <Header show={show} setShow={() => setShow(!show)}>
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route
                path="/hotel"
                element={
                  <Suspense fallback={<Loading />}>
                    <AppLayout />
                  </Suspense>
                }
              >
                <Route index element={<SearchResult />} />
                <Route path=":id" element={<HotelDetails />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                  <Suspense fallback={<Loading />}>
                    <BookmarkLayout />
                  </Suspense>
                }
              >
                <Route index element={<BookmarkList />} />
                <Route path="add" element={<AddBookMark />} />
                <Route path=":id" element={<BookmarkList />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Header>
        </div>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default App;
