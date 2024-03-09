import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HotelProvider from "./context/Hotelcontext";
import SearchResult from "./components/SearchResult";
import AppLayout from "./components/AppLayout";
import HotelList from "./components/hotelList";
import HotelDetails from "./components/HotelDetails";
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkList from "./components/BookmarkList";
import AddBookMark from "./components/AddBookMark";
import BookmarkProvider from "./context/BookmarkContext";
import Auth from "./components/Auth/Auth";

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
          <Header show={show} setShow={setShow}>
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel" element={<AppLayout />}>
                <Route index element={<SearchResult />} />
                <Route path=":id" element={<HotelDetails />} />
              </Route>
              <Route path="/bookmark" element={<BookmarkLayout />}>
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
