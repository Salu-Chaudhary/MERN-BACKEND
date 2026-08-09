import usersService from "../services/users.service.js";
import { ADMIN_ROLE } from "../constants/roles.js";
import { success } from "zod";
import { ROLES } from "../constants/roles.js";

const createdUsers = async (req, res) => {
  try {
    const newUsers = req.body;
    const data = await usersService.createNewUser(newUsers);
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await usersService.getUsers();
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getUserByID = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const loggedInUser = req.user;

    if (
      !loggedInUser.role.includes(ADMIN_ROLE) &&
      loggedInUser._id.toString() !== targetUserId
    ) {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    const user = await usersService.getUserByID(targetUserId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const loggedInUser = req.user;

    if (
      !loggedInUser.role.includes(ADMIN_ROLE) &&
      loggedInUser._id.toString() !== targetUserId
    ) {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    const { name, mobile } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (mobile !== undefined) updateData.mobile = mobile;

    const user = await usersService.updateUser(targetUserId, updateData);
    return res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await usersService.deleteUser(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updateRole = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "User role is required" });
    }

    if (!ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid user role " });
    }

    const result = await usersService.updateRole(targetUserId, role);
    return res.send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }

    const targetUserId = req.params.id;
    const updatedUser = await usersService.updateProfileImage(
      targetUserId,
      file,
    );
    return res.send(updatedUser);
  } catch (error) {
    return res.status(error?.status || 400).send(error.message);
  }
};

export default {
  createdUsers,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  updateRole,
  updateProfileImage,
};
