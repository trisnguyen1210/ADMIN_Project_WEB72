//Library
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//Components
import LoginPage from "./Components/LoginPage";
//CSS
import "./App.css";
import HomePage from "./Components/Homepage";
import UserPage from "./Components/UserPage";
import LogsPage from "./Components/LogsPage";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./Layout/MainLayout";
import NonAuthLayout from "./Layout/NonAuthLayout";
import ErrorLayout from "./Layout/ErrorLayout";
import { loginSuccess } from "./redux/slice/user.slice";
import { useEffect } from "react";
import CreateVideoPage from "./Components/CreateVideoPage";
import EditVideoPage from "./Components/EditVideoPage";

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user?.token);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(loginSuccess(userData));
    }
  }, [isUserLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {!isUserLoggedIn && (
          <Route path="/" element={<NonAuthLayout />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
        )}
        {isUserLoggedIn && (
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-video" element={<CreateVideoPage />} />
            <Route path="/edit-video/:id" element={<EditVideoPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/log" element={<LogsPage />} />
          </Route>
        )}
        <Route path="*" element={<ErrorLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
