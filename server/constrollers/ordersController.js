import Cart from "../model/cartModel.js";
import { orderDatabae } from "../model/orderModel.js";
import ProductDatabase from "../model/productModel.js";
import axios from 'axios'


// orderController.js ഫയലിൽ:

async function sendWhatsAppNotification(order) {
  try {
    const token = "EAGKw3hdWHEABSJXoD1Sz09PcZBdFQhuIzBty0Y6mWC0LbprdB6DWB0mOwIlymNooAnZAWZBogmKfrrObhPZCjNZBxGf8ksj7LKP1QRuaf95eO6nOZAPKGKPV39jCdFjjmPeEjvNnsYATVtLtQo9INO3mEg8SE0UbAwOCZCKZARYN7WOhEQM6n1qWqNSOp29k3g8FaJiRWpEr9lF7OB7nVZBPc0jZCRb8ObvMr06l05dQjR3tBxZBiP1IxdTNIu5h4UVsy930JoCg8XNZBn1ltOxfsW4GrAZDZD"; // 👈 പുതിയ ടോക്കൺ
    const phoneNumberId = "1307687399087389";
    const ownerPhoneNumber = "917356884862";

    const messageData = {
      messaging_product: "whatsapp",
      to: ownerPhoneNumber,
      type: "text",
      text: {
        body: `🛒 *New Order Received!*

*Order ID:* ${order._id}
*Total Amount:* ₹${order.totalAmount}
*Payment Method:* ${order.paymentMethod}
*Delivery Method:* ${order.deliveryMethod}`
      }
    };

    await axios.post(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      messageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("✅ Order WhatsApp alert sent!");
  } catch (err) {
    console.error("❌ WhatsApp notification error:", err.response?.data || err.message);
  }
}


export async function OrdersController(req, res) {
  try {

    console.log('broyyyy');
    
    const userId = req.user.user._id;

    const {
      shippingAddress,
      items,
      deliveryMethod,
      paymentMethod,
      totalAmount,
    } = req.body;

    // Check Stock
    for (const item of items) {
      const product = await ProductDatabase.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.Stockquantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.Productname} is out of stock`,
        });
      }
    }

    // Save Order
    const newOrder = new orderDatabae({
      userId,
      shippingAddress,
      items,
      deliveryMethod,
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();

    await sendWhatsAppNotification(newOrder);

    // Reduce Stock
    for (const item of items) {
      await ProductDatabase.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            Stockquantity: -item.quantity,
          },
        }
      );
    }

    // Clear Cart
    await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          items: [],
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "🎉 Your order has been placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function GetAllOrdersController(req, res) {
  try {
    const orders = await orderDatabae
      .find()
      .sort({ createdAt: -1 }) // Latest first
      .populate("userId", "fullname email")
      .populate("items.productId", "Productname Price Image");

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export async function MyordersController(req, res) {
  try {
    const userId = req.user.user._id;

    const myOrders = await orderDatabae
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "My Orders fetched successfully",
      data: myOrders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}

export async function GetSingleOrderController(req, res) {
  try {
    const userId = req.user.user._id;
    const { id } = req.params;

    const order = await orderDatabae.findOne({
      _id: id,
      userId: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
}

export async function CancelOrderController(req,res) {
  try {

    const orderId = req.params.id;

    console.log(orderId,'lyattttttt');


    const deleteOrder = await orderDatabae.findByIdAndDelete(orderId);

    if (!deleteOrder) {
      return res.json({
        success:false,
        message:"cancelled order not fount"
      })
    }

    return res.json({
      success:true,
      message:'Order Cancelled successfully',
      data:deleteOrder
    })
    
    
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:'Order cancel failed'
    })
  }
}