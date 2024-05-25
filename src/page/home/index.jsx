import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { PATHS, fetchData } from "../../constants/path";
import axios from "axios";
import Book from "../../Components/Book";
import Spinner from "../../assets/Spinner.gif";

const HomePage = () => {
  const [reload, setReload] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  let renderCount = useRef(0);
  useEffect(() => {
    console.log(
      "Render Component index HomePge Count =",
      (renderCount.current += 1)
    );
    console.log(books);
  });

  // console.log("books =", books);

  useEffect(() => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const result = await axios.get(fetchData.URL_BOOKS);
        if (result) {
          setBooks(result?.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }, 2000);
  }, [reload]);

  useLayoutEffect(() => {
    /*
     * NOTE 
    -- Steps Before useEffect Function Run 
    1 - User take action --> clicking some button
    2 - React Changes the state
    ! 3 - React Handles DOM mutation --> ( useLayout fires)  
    4 - Browser Prints DOM changes to browser screen 
    ! 5 - After Browser Prints DOM changes to screen then (useEffect fires) 
    
    --> useEffect is "asynchronous"
    --> useLayout is "synchronize" 
     */

    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });

  return (
    <div className="w-[95vw] min-h-screen flex flex-col justify-center items-center transition-all duration-700 ">
      {/* for Header  */}
      <section className="sticky top-0 p-2 w-full flex justify-around items-center  border-red-600 border-b-4">
        <Link
          to={PATHS.HOME}
          className="text-lg mx-8 flex-shrink-0 text-white font-extrabold"
        >
          Home
        </Link>
        <input
          type="search"
          value={searchParams.get("search") || ""}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          className="p-3  outline-none flex-1 rounded-md bg-red-950 focus:bg-red-700 transition-all duration-500  "
          placeholder="Search ..."
        />
        <Link
          to={PATHS.MY_STUDIES}
          className="text-lg mx-8 flex-shrink-0 text-white font-extrabold"
        >
          My studies <span className="text-red-600 p-2">0</span>
        </Link>
        <Link
          to={PATHS.FAVORITES}
          className="text-lg mx-8 flex-shrink-0 text-white font-extrabold"
        >
          Favorites
        </Link>
        <button
          className="text-red-500"
          onClick={() => {
            sessionStorage.clear();
            setReload(!reload);
          }}
        >
          Exit
        </button>
      </section>
      {/* for Header  */}

      {/* for Body  */}
      <section className="  w-full flex flex-col justify-center items-center flex-1 ">
        <Outlet />

        <div className=" flex flex-wrap w-full h-full justify-center gap-4 p-10 m-10 ">
          {books
            .filter((item) => {
              let filter = searchParams.get("search");
              if (!filter) return true;

              if (filter.length > 3) {
                return item.name
                  .toLowerCase()
                  .trim()
                  .includes(filter.trim().toLowerCase());
              }
            })
            .map((books, index) => (
              <Book
                key={index}
                name={books?.name}
                author={books?.author}
                image={books?.image}
                price={books?.price}
              ></Book>
            ))}
        </div>
      </section>
      {/* for Body  */}

      {loading && (
        <div className=" fixed inset-0 top-16  flex flex-col justify-center items-center backdrop-blur-sm ">
          <div>
            <img className="w-20  " src={Spinner} alt="spinner" />
          </div>

          <div className="  text-orange-600 font-extrabold ">
            <h2>Your connection to the database is not established !</h2>
            <h3>- cd server</h3>
            <h3>- npm run server</h3>
            <h3>- refresh HomePage</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
