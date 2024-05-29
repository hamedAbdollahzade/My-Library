import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import { PATHS } from "./constants/path";
import HomePage from "./page/home";
import NotFound from "./Components/NotFound";
import View from "./page/view";
import Add from "./page/add";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to={PATHS.HOME} />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.HOME} element={<HomePage />}>
            <Route path={PATHS.MY_LIBRARY} element={<> Coming soon ....</>} />
            <Route path={PATHS.ADD} element={<Add />} />
            <Route path={`${PATHS.VIEW}/:bookId`} element={<View />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
