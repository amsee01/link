import { API } from "./api";
import { toast } from "react-toastify"

export const loginAuth = async (userInfo, dispatch) => {
  dispatch({ type: "LOGIN START" });
  try {
    const res = await API.post("/auth/login", userInfo);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data.userData,
    });
    localStorage.setItem('user', JSON.stringify(res.data.userData))
    return res;
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error,
    });
    toast.error("Login failed - please check your credentials.")
  }
};

export const loginTokenAuth = async (savedState, dispatch) => {
  try {
    const res = await API.post("/auth/tokenlogin", savedState);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: savedState,
    });
  } catch (error) {
    console.log(error)
  }
}

export const registerUser = (data) => API.post("/auth/register", data);
