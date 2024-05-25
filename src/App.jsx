import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { PATHS } from "./constants/path";
import HomePage from "./page/home";
import NotFound from "./Components/NotFound";
import View from "./page/view";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={PATHS.HOME} />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.HOME} element={<HomePage />}>
            <Route path={PATHS.MY_STUDIES} element={<div>MY_STUDIES </div>} />
            <Route path={PATHS.FAVORITES} element={<>FAVORITES</>} />
            <Route path={`${PATHS.VIEW}/:bookId`} element={<View />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
