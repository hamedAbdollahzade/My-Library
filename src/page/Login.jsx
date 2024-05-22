import { useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES } from "../constants/messages";
import toast from "react-hot-toast";
import spinner from "../assets/Spinner.gif";
import { useNavigate } from "react-router-dom";
import { PATHS, fetchData } from "../constants/path";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const admin = {
    username: "admin",
    password: "admin",
    name: "Hame...:)",
    phone: +989107902735,
    code: "",
  };

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [bgText, setBgText] = useState({});

  // console.log(bgText);
  let counter = useRef(0);

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
        if (!user.username || !user.password) {
          setLoading(false);
          throw new Error(ERROR_MESSAGES.EMPTY_VALUES);
        }

        if (
          user.username === admin.username &&
          user.password === admin.password
        ) {
          sessionStorage.setItem("token", JSON.stringify(admin.phone));
          toast.success("Login Successful");
          toast.loading(`Welcome   "${admin.name}"`, { duration: 3000 });
          setError("");
          setTimeout(() => {
            navigate(PATHS.HOME);
            setLoading(false);
          }, 3000);
        } else {
          throw new Error(ERROR_MESSAGES.INVALID_FIELDS);
        }
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
                setUser({ ...user, [e.target.name]: e.target.value })
              }
              placeholder="* * * * * * *"
              type="text"
              name="username"
              id="username"
              className="p-2 bg-transparent border  border-red-500 "
              autoFocus
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
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
