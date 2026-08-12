import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
      required: true,
    },

    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        productImage: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    deliveryMethod: {
      type: String,
      enum: [
        "Standard Delivery",
        "Express Delivery",
      ],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const orderDatabae = mongoose.model("orders", orderSchema);