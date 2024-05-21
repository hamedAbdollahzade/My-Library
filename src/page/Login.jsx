import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../constants/messages";
import toast from "react-hot-toast";
import spinner from "../assets/Spinner.gif";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/path";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const admin = {
    username: "admin",
    password: "admin",
    name: "hamed Abdollahzade",
    phone: +989107902735,
  };

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [bgText, setBgText] = useState({});

  useEffect(() => {
    // Quotes API => https://api.quotable.io/random
    const fetchApi = async () => {
      const result = await axios.get("https://api.quotable.io/random");
      result && setBgText(result?.data);
      console.log(bgText);
    };
    setTimeout(() => {
      fetchApi();
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
    <div className="flex  ">
      <div className="inset-0 p-4  overflow-hidden fixed z-[-1] font-extrabold  text-gray-500 opacity-5">
        <h1> {bgText ? bgText.content : " Fetch Data ..."} </h1>
      </div>
      <div className="flex justify-between">
        {loading ? (
          <div>
            <img src={spinner} className="w-40 rounded-full " alt="spinner" />
          </div>
        ) : (
          <>
            <form
              onSubmit={(e) => formHandler(e)}
              className="flex flex-col gap-2 border  border-red-500 p-14  m-2 justify-center   "
            >
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
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
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
