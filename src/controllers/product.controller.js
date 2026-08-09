import productService from "../services/product.service.js";
//CREATE
const createdProduct = async (req, res) => {
  try {
    const newProducts = req.body;
    const data = await productService.createNewProduct(
      newProducts,
      req.file,
      req.user._id,
    );
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//READ
const getAllProducts = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const data = await productService.getAllProductsFromDB(query);
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//READ BY ID
const getProductByID = async (req, res) => {
  // const id = req.params.id;

  try {
    const dataByID = await productService.getProductByIDFromDB(req.params.id);
    res.json(dataByID);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//UPDATE
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProductToBD(
      req.params.id,
      req.body,
    );
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//DELETE
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProductFromDB(req.params.id);
    res.send("Product Delete Successfullly!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getAllProducts,
  getProductByID,
  createdProduct,
  deleteProduct,
  updateProduct,
};
