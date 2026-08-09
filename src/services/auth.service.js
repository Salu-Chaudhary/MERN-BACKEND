import User from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import config from "../config/config.js";
import { sendEmail } from "../utils/sendEmail.js";

//LOGIN
const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { mobile: data.mobile }],
  });

  if (!user)
    throw {
      status: 404,
      message: "User not found!!",
    };

  const isPasswordMatched = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatched)
    throw {
      status: 401,
      message: "Incorrect email or password",
    };

  return user;
};

//REGISTER
const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { mobile: data.mobile }],
  });

  if (user)
    throw {
      status: 409,
      message: "User already exists!!",
    };

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    password: hashedPassword,
    address: data.address,
    role: data.role,
  });
  return createdUser;
};

//FORGET - PASSWORD
const forgetPassword = async (email) => {
  //1. tyo email vako user xaki xaina check garne
  const user = await User.findOne({ email });
  if (!user)
    throw {
      status: 404,
      message: "User with this email not found!",
    };

  await ResetPassword.deleteMany({ user: user._id });

  const token = crypto.randomBytes(32).toString("hex");
  console.log(token);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  await ResetPassword.create({ token: hashedToken, user: user._id });

 
  const resetPasswordLink = `${config.appUrl}/forget-password?token=${token}`;

  try {
    await sendEmail({ receipients: user.email, resetPasswordLink });
  } catch (error) {
    await ResetPassword.deleteMany({ user: user._id });
    throw { message: error + "There is a problem while sending email" };
  }

  return true;
};

//RESET - PASSWORD

const resetPassword = async (password, token) => {
  if (!token && !password)
    throw {
      message: "Token is required",
    };

  console.log(token);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const tokenCollection = await ResetPassword.findOne({ token: hashedToken });
  console.log(tokenCollection);
  if (!tokenCollection)
    throw {
      message: "Token invalid or expired",
    };

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.findByIdAndUpdate(
    tokenCollection.user,
    {
      password: hashedPassword,
    },
    { new: true },
  );

  await ResetPassword.deleteMany({ token: hashedToken });

  return user;
};

export default { login, register, forgetPassword, resetPassword };
