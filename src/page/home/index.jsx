import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { PATHS, fetchData } from "../../constants/path";
import axios from "axios";
import Cart from "../../Components/Cart";
import Spinner from "../../assets/Spinner.gif";
import _ from "lodash";

const HomePage = () => {
  const [user, setUser] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // console.log(user);

  // Lodash Test
  // const arr = [1, 2, 3, 4, 5];
  // console.log(_.reverse(arr));


  
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
  }, []);

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

    const newUser = JSON.parse(sessionStorage.getItem("token"));
    if (!newUser) {
      navigate(PATHS.LOGIN);
    } else {
      !user && setUser(newUser);
    }
  }, [user, navigate]);

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
        <Link
          to={PATHS.ADD}
          className="text-lg mx-8 flex-shrink-0 text-white font-extrabold"
        >
          Add Book
        </Link>
        <input
          type="search"
          value={searchParams.get("search") || ""}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          className="p-2  outline-none flex-1 rounded-md bg-red-900 focus:bg-red-700 transition-all duration-500  "
          placeholder="Search ..."
        />
        <Link
          to={PATHS.MY_LIBRARY}
          className="text-lg mx-8 flex-shrink-0 text-white font-extrabold"
        >
          My Library
        </Link>
        <Link className="p-4 font-extrabold ">
          <span className="mx-2 text-red-400 text-sm">{user?.name}</span>{" "}
        </Link>
        <button
          className="text-red-500 shadow-md  shadow-red-600"
          onClick={() => {
            sessionStorage.clear();
            navigate(PATHS.LOGIN);
            location.reload();
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
            .map((books) => (
              <Cart
                key={books?.id}
                bookId={books?.id}
                path={PATHS.VIEW}
                name={books?.name}
                author={books?.author}
                image={books?.image}
                price={books?.price}
              ></Cart>
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
