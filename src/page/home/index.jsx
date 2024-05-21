import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });

  return <div>HomePage</div>;
};

export default HomePage;
