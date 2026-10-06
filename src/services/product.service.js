import fs from "fs";
import Product from "../models/Products.js";
import { fileUploader } from "../utils/cloudinaryUploader.js";

//CREATE
const createNewProduct = async (newProducts, files, userId) => {
  if (!files)
    throw {
      status: 400,
      message: "File required",
    };

  // const cloudinaryResult = await fileUploader(file.buffer);

  //parallel image upload
  const uploadPromises = files.map((file) => fileUploader(file.buffer));
  const cloudinaryResult = await Promise.all(uploadPromises);

  const imageUrls = cloudinaryResult.map((result) => result.secure_url);

  console.log(cloudinaryResult);

  const product = await Product.create({
    ...newProducts,
    // imageUrl: cloudinaryResult.secure_url,
    imageUrl: imageUrls,
    createdBy: userId,
  });

  return product;
};

//READ
const getAllProductsFromDB = async (query) => {
  console.log(query);
  const { color, type, name, min_price, max_price, sortBy, limit, offset } =
    query;

  const filters = {};

  if (color) filters.color = { $in: color.split(",") }; //from list items
  if (type) filters.type = { $regex: type, $options: "i" };
  if (name) filters.name = { $regex: name, $options: "i" }; //case insensetive

  if (min_price) filters.price = { $gte: min_price };
  if (max_price) filters.price = { ...filters.price, $lte: max_price }; //overwrite min

  console.log(filters);
  console.log(sortBy);

  //SORTING MECHANISM
  const sort = sortBy ? JSON.parse(sortBy) : {};

  const data = await Product.find(filters).sort(sort).limit(limit).skip(offset);
  return data;
};

//READ BY ID
const getProductByIDFromDB = async (id) => {
  const data = await Product.findById(id);
  return data;
};

//UPDATE
const updateProductToBD = async (data, files, productId) => {
  const updateData = { ...data };
  try {
    if (files && files.lenght > 0) {
      //parallel image upload
      const uploadPromises = files.map((file) => fileUploader(file.buffer));
      const cloudinaryResult = await Promise.all(uploadPromises);

      //updated image url
      const imageUrls = cloudinaryResult.map((result) => result.secure_url);

      updateData.imageUrl = imageUrls;
    } else {
      //front end bata image aako xaina vane imageUrl lai delete garidine
      //jasle garda couldinary ko image as-it-is rahanxa
      delete updateData.imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      },
    );
    return updatedProduct;
  } catch (error) {
    throw { message: error };
  }
};

//DELETE
const deleteProductFromDB = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getProductByIDFromDB,
  getAllProductsFromDB,
  createNewProduct,
  deleteProductFromDB,
  updateProductToBD,
};
