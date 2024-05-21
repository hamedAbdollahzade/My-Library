import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });

  return (
    <div>
      <h1>Home Page </h1>
      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
      >
        Exit
      </button>
    </div>
  );
};

export default HomePage;
