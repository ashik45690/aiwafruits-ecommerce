import cloudinery from "../config/Cloudinary.js"; 
import streamifier from "streamifier";
import ProductDatabase from "../model/productModel.js";
import { orderDatabae } from "../model/orderModel.js";



export async function AddProduct(req, res) {
  try {
    console.log("========== ADD PRODUCT ==========");

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const {
      Productname,
      Category,
      Price,
      Stockquantity,
      Description,
    } = req.body;

    console.log("Destructured Data:", {
      Productname,
      Category,
      Price,
      Stockquantity,
      Description,
    });

    if (!req.file) {
      console.log("❌ req.file is undefined");

      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    console.log("✅ Image received");

    const UploadCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinery.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) {
              console.log("❌ Cloudinary Error:", error);
              return reject(error);
            }

            console.log("✅ Cloudinary Upload Success");
            console.log(result);

            resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    console.log("Uploading Image...");

    const result = await UploadCloudinary(req.file.buffer);

    console.log("Cloudinary URL:", result.secure_url);

    const newproduct = new ProductDatabase({
      Productname,
      Category,
      Price,
      Stockquantity,
      Description,
      Image: result.secure_url,
    });

    console.log("New Product Object:");
    console.log(newproduct);

    console.log("Saving Product...");

    const savedProduct = await newproduct.save();

    console.log("✅ Product Saved Successfully");
    console.log(savedProduct);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });

  } catch (error) {
    console.log("============== ERROR ==============");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}



export async function getProduct(req,res) {
  try {


    const Products = await ProductDatabase.find({})

    if (!Products.length === 0) {
      
      res.json({
        success:false,
        message:"Products Not Found !"
      })
    }

    res.json({
      success:true,
      message:"products Found Successfully",
      data:Products
    })
    
  } catch (error) {
    console.log(error);

    res.json({
      message:"Products get failed",
      success:false
    })
    
  }
}



export const getBestSellingProducts = async (req, res) => {

    console.log("🔥 BEST SELLER CONTROLLER CALLED");
  try {
    const bestSellingProducts = await orderDatabae.aggregate([
      {
        $unwind: "$items",
      },

      {
        $group: {
          _id: "$items.productId",

          productName: {
            $first: "$items.productName",
          },

          productImage: {
            $first: "$items.productImage",
          },

          totalSold: {
            $sum: "$items.quantity",
          },

          price: {
            $first: "$items.price",
          },
        },
      },

      {
        $sort: {
          totalSold: -1,
        },
      },

      {
        $limit: 4,
      },
    ]);

    console.log("BEST SELLERS:", bestSellingProducts);

    const orders = await orderDatabae.find().limit(5);

console.log("ORDERS:", JSON.stringify(orders, null, 2));

    res.status(200).json({
      success: true,
      data: bestSellingProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch best sellers",
    });
  }
};