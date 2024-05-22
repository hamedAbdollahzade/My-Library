import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { PATHS, fetchData } from "../../constants/path";
import axios from "axios";
import Book from "../../Components/Book";
import Spinner from "../../assets/Spinner.gif";

const HomePage = () => {
  const [reload, setReload] = useState(false);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("books =", books);
  let counter = useRef(0);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
    }
    console.log("Render Component HomePage = ", (counter.current += 1));
  });

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

  const searchHandler = (e) => {
    setLoading(true);

    let search = e.target.value;
    if (search.length == 0) {
      setReload(!reload);
      setLoading(false);
    } else if (search.length > 3) {
      setTimeout(() => {
        let result = books?.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        );

        result.length == 0 ? setBooks(null) : setBooks(result);
        setLoading(false);
      }, 3000);
    } else {
      setLoading(false);
    }
  };

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
          onChange={(e) => searchHandler(e)}
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
        {!books && (
          <div className=" text-4xl font-extrabold  "> Not Found Book :( </div>
        )}

        <div className=" flex flex-wrap w-full h-full justify-center gap-4 p-10 m-10 ">
          {books?.map((books, index) => (
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

      {/* footer */}
      {/* <section className="w-full  flex justify-center items-center overflow-hidden bg-red-700">
        Footer
      </section> */}
      {loading && (
        <div className=" fixed inset-0 top-16   flex  flex-col justify-center items-center backdrop-blur-sm ">
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
