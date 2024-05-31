import { loginUser, registerUser } from "../services/auth.service.js";
import { deleteUser } from "../services/user.service.js";

//Register
export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    const { password, ...userData } = newUser._doc;
    res.status(200).json({
      userData,
      message: "User has been registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error Occurred Registering User",
    });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const loginObj = await loginUser(req.body, res);
    const user = loginObj.user
    const { password, ...userData } = user._doc;
    userData.token = loginObj.token
    console.log(userData)

    res.status(200).json({
      message: "User logged In successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error Occurred logging in the User",
    });
    console.log(error);
  }
};
