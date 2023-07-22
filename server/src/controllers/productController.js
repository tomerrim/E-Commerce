import Product from "../models/ProductModel.js";

const PAGESIZE = 6;

export const getAllProducts = async (req, res) => {
  // const page = req.query.page || 1;
  // const skip = (page - 1) * pageSize;
  const products = await Product.find();
  res.status(200).json(products);
};

export const getCategories = async (req, res) => {
  const categories = await Product.find().distinct("category");
  // res.status(200).json(categories);
  res.send(categories);
};

export const getProductByToken = async (req, res) => {
  const { token } = req.params;
  const product = await Product.findOne({ token });
  product ? res.send(product) : res.status(404).send("Product not found");
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.send(product) : res.status(404).send("Product not found");
};

export const searchProduct = async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGESIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};
      
  const categoryFilter =
    category && category !== "all"
      ? { category: { $regex: category, $options: "i" } }
      : {};

  const ratingFilter =
    rating && rating !== "all"
      ? { "rating.rate": { $gte: Number(rating) } }
      : {};

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: 1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...priceFilter
    }).sort(sortOrder).skip((page - 1) * pageSize).limit(pageSize);
  
  const countProduct = products.length;

  res.send({ products, page, countProduct, pages: Math.ceil(countProduct / pageSize) });
};
