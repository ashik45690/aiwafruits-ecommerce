import mongoose from "mongoose";

const productData = mongoose.Schema({
  Productname: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
  Stockquantity: { type: Number },
  Description: { type: String, required: true },
  Image: { type: String },
});

const ProductDatabase = mongoose.model("products", productData);

export default ProductDatabase;
