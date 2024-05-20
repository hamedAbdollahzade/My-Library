import { useEffect, useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import { PATHS } from "../constants/path";

const NotFound = () => {
  const [clock, setClock] = useState({});

  const runClock = () => {
    const clock = new Date();

    setClock({
      apm: clock.getHours() > 12 ? "PM" : "AM",
      h:
        clock.getHours() > 12
          ? ` ${0} ${clock.getHours() - 12}`
          : clock.getHours(),
      m:
        clock.getMinutes() < 10
          ? ` ${0} ${clock.getMinutes()}`
          : clock.getMinutes(),
      s:
        clock.getSeconds() < 10
          ? ` ${0} ${clock.getSeconds()}`
          : clock.getSeconds(),
    });
  };

  useEffect(() => {
    console.log("run useEffect NotFound");

    const id = setInterval(() => {
      runClock();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      {clock && (
        <div className="text-7xl font-extrabold  pb-10 text-orange-500">
          {` ${clock.h || "0 0"} : ${clock.m || "0 0"} :  ${
            clock.s || "0 0"
          } - ${clock.apm || "PM"}`}
        </div>
      )}

      <hr />

      <h1 className="pt-8 font-extrabold ">
        Page Not Found <span className="text-6xl text-red-600"> 404</span>
      </h1>
      <div className="my-10  p-4 text-2xl w-fit border rounded-lg font-extrabold  ">
        <Link to={PATHS.LOGIN}>Back</Link>
      </div>
    </div>
  );
};

export default NotFound;
