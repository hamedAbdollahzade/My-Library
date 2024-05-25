import { useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES } from "../constants/messages";
import toast from "react-hot-toast";
import spinner from "../assets/Spinner.gif";
import { useNavigate } from "react-router-dom";
import { PATHS, fetchData } from "../constants/path";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const users = [
    {
      username: "admin",
      password: "admin",
      name: "admin Library",
      phone: +989107902735,
      userId: "admin-id9107902735",
      role: "ADMIN",
    },
    {
      username: "hamed",
      password: "hamed",
      name: "Hame...:)",
      phone: +989107902735,
      userId: "hamed-id9107902735",
      role: "ADMIN",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [inputLogin, setInputLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [bgText, setBgText] = useState({});

  // console.log(bgText);
  let counter = useRef(0);
  /*
? useRef Hook :
    The useRef Hook allows you to persist values between renders.
    It can be used to store a mutable value that does not cause a re-render when updated.
    It can be used to access a DOM element directly.
  */
  useEffect(() => {
    console.log("Render Component Login = ", (counter.current += 1));
  });

  useEffect(() => {
    setTimeout(async () => {
      try {
        const result = await axios.get(fetchData.URL_Quotes);
        result && setBgText(result?.data);
      } catch (error) {
        console.log(error.message);
      }
    }, 3000);
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try {
        if (!inputLogin.username || !inputLogin.password) {
          setLoading(false);
          throw new Error(ERROR_MESSAGES.EMPTY_VALUES);
        }

        users.map((item) => {
          if (
            inputLogin.username === item.username &&
            inputLogin.password === item.password
          ) {
            const userInfo = {
              name: item.name,
              id: item.userId,
              role: item.role,
              phone: item.phone,
            };
            /*
        sessionStorage is similar to localStorage ;
        the difference is that while data in localStorage doesn't expire,
        data in sessionStorage is cleared when the page session ends.
        Whenever a document is loaded in a particular tab in the browser,
        a unique page session gets created and assigned to that particular tab.
            */

            sessionStorage.setItem("token", JSON.stringify(userInfo));

            toast.success("Login Successful");
            toast.loading(`Welcome   "${item.name}"`, { duration: 3000 });
            setError("");
            setTimeout(() => {
              navigate(PATHS.HOME);
              setLoading(false);
            }, 3000);
          } else {
            throw new Error(ERROR_MESSAGES.INVALID_FIELDS);
          }
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div>
      {loading ? (
        <div>
          <img src={spinner} className="w-40 rounded-full " alt="spinner" />
        </div>
      ) : (
        <div className="flex">
          <div className="flex flex-col gap-2 border border-r-8 text-wrap w-72 min-h-full overflow-hidden p-4  border-red-500   my-2 justify-center">
            <h2 className="opacity-70 text-2xl">
              {bgText.content || "w r i t i n g ... "}
            </h2>
            <h6 className="text-base font-extrabold opacity-40">
              {"author :  " + (bgText.author || "w r i t i n g ...")}
            </h6>
          </div>
          <form
            onSubmit={(e) => formHandler(e)}
            className="flex flex-col gap-2 border border-l-8   border-red-500  p-14   m-2 justify-center   "
          >
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) =>
                setInputLogin({
                  ...inputLogin,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="* * * * * * *"
              type="text"
              value={inputLogin.username}
              name="username"
              id="username"
              className="p-2 bg-transparent border  border-red-500 "
              autoFocus
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setInputLogin({
                  ...inputLogin,
                  [e.target.name]: e.target.value,
                })
              }
              value={inputLogin.password}
              placeholder="* * * * * * *"
              type="password"
              name="password"
              id="password"
              className="p-2 bg-transparent border border-red-500"
            />

            <button type="submit" className="mt-4 text-red-500">
              Login
            </button>
          </form>
          {error ? (
            <div className=" text-red-500 max-w-96  overflow-hidden  p-8 mx-4">
              <div className="font-extrabold text-2xl p-2">
                Error Message :{" "}
              </div>
              <hr />
              <div className="p-4 tracking-wide break-words">{error}</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Login;
