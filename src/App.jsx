import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import { PATHS } from "./constants/path";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.LOGIN} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
