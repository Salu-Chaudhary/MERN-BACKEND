import User from "../models/User.js";
import { fileUploader } from "../utils/cloudinaryUploader.js";

const createNewUser = async (newUsers) => {
  const user = await User.create(newUsers);
  return user;
};

const getUsers = async () => {
  const user = await User.find();
  return user;
};

const getUserByID = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user)
    throw {
      status: 404,
      message: "User not found",
    };
  return user;
};

const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return user;
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(
    userId,
    { isActive: false },
    { new: true },
  );

  if (!user)
    throw {
      status: 404,
      message: "User not found",
    };

  return { message: "User successfully deactivated" };
};

const updateRole = async (userId, role) => {
  const updateUser = User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true, runValidators: true },
  ).select("-password");

  return updateUser;
};

const updateProfileImage = async (userId, image) => {
  console.log(image);
  if (!image)
    throw {
      status: 400,
      message: "Profile image is required",
    };

  const cloudinaryResult = await fileUploader(image.buffer);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { profileImage: cloudinaryResult.secure_url } },
    { new: true, runValidators: true },
  ).select("-password");

  return updatedUser;
};

export default {
  createNewUser,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
  updateRole,
  updateProfileImage,
};
