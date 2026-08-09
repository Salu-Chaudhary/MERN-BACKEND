import fs from "fs";
import Product from "../models/Products.js";
import { fileUploader } from "../utils/cloudinaryUploader.js";

//CREATE
const createNewProduct = async (newProducts, file, userId) => {
  if (!file)
    throw {
      status: 400,
      message: "File required",
    };

  const cloudinaryResult = await fileUploader(file.buffer);

  console.log(cloudinaryResult);

  const product = await Product.create({
    ...newProducts,
    imageUrl: cloudinaryResult.secure_url,
    user: userId,
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
  if (type) filters.type = type;
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
const updateProductToBD = async (id, body) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });
  return updatedProduct;
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
