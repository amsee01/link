import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginTokenAuth } from "./utils/api/auth.api";


function App() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  if (user == null) {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      loginTokenAuth(foundUser, dispatch);
      console.log(foundUser)
    }
  }
  
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
