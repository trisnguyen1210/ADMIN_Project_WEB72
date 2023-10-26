//Library
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//Components
import LoginPage from "./Components/LoginPage";
//CSS
import "./App.css";
import HomePage from "./Components/Homepage";
import UserPage from "./Components/UserPage";
import TasksPage from "./Components/TasksPage";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./Layout/MainLayout";
import NonAuthLayout from "./Layout/NonAuthLayout";
import { loginSuccess } from "./redux/slice/user.slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isUserLoggedIn = useSelector((state) => state.user.token);
  useEffect(() => {
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
            <Route path="/user" element={<UserPage />} />
            <Route path="/task" element={<TasksPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
