import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (body) => {
  const hashedPassword = bcrypt.hashSync(body.password, 10);
  const newUser = new UserModel({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
};

export const loginUser = async (body) => {
  const user = await UserModel.findOne({ email: body.email });
  !user && res.status(404).json("User not Found");

  const passwordCheck = await bcrypt.compare(body.password, user.password);
  !passwordCheck && res.status(400).json("wrong password");

  const token = jwt.sign({ userId: user._id }, process.env.SIGNING_KEY, {
    expiresIn: "12h",
  });

  let returnObj = {
    user: user,
    token: token,
  };

  return returnObj;
};

export const loginToken = async (body) => {
  let token = body.token;
  let requestingUser = body._id;
  const decoded = jwt.verify(token, process.env.SIGNING_KEY);
  if (decoded.userId == requestingUser) {
    return requestingUser;
  } else {
    throw new Error("Mismatch in users");
  }
};
