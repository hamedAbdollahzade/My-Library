import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { PATHS } from "./constants/path";
import NotFound from "./components/NotFound";
import HomePage from "./page/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={PATHS.HOME} />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
