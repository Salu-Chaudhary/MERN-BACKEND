import authService from "../services/auth.service.js";
import { generateJWT } from "../utils/jwt.js";

const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await authService.login(req.body);

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      role: user.role,
    };

    //TOKEN GENERATE
    const token = generateJWT(payload);

    //STORE TOKEN IN COOKIE
    res.cookie("authToken", token, { maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json(user);
  } catch (error) {
    res.status(error?.status || 400).send(error.message);
  }
};

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(error?.status || 400).send(error.message);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const data = await authService.forgetPassword(req.body.email);
    res.status(201).json(data);
  } catch (error) {
    res.status(error?.status || 400).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.id;
    const password = req.body.password;
    const data = await authService.resetPassword(password, token);
    res.status(201).json(data);
  } catch (error) {
    res.status(error?.status || 400).send(error.message);
  }
};

export default { login, register, forgetPassword, resetPassword };
