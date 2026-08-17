import Cartbase from "../model/cartModel.js";

export async function addToCartController(req, res) {
  try {
    const userId = req.user.user._id;
    const productId = req.body.ProductId;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    if (!userId || !productId) {
      return res.json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    const userCart = await Cartbase.findOne({ userId: userId });

    if (!userCart) {
      const newCart = new Cartbase({
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: 1,
          },
        ],
      });
      await newCart.save();
      return res.json({
        success: true,
        message: "Item added to cart successfully",
      });
    }

    const exitproduct = userCart.items.find(
      (items) => items.productId.toString() === productId,
    );

    console.log(exitproduct);

    if (exitproduct) {
      exitproduct.quantity += 1;
    } else {
      userCart.items.push({
        productId: productId,
        quantity: 1,
      });
    }

    await userCart.save();
    return res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getCartController(req, res) {
  try {
    const userId = req.user.user._id;
    const cart = await Cartbase.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.json({
      success: true,
      message: "Cart found",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeController(req, res) {
  try {
    const userId = req.user.user._id;

    const productId = req.params.productId;

    console.log(userId, "user");
    console.log(productId, "product");

    if (!userId || !productId) {
      return;
    }

    const userCart = await Cartbase.findOne({ userId });

    if (!userCart) {
      return res.json({
        success: false,
        message: "Cart not Found",
      });
    }

    const itemExist = userCart.items.filter(
      (items) => items.productId.toString() !== productId,
    );
    userCart.items = itemExist;
    await userCart.save();
    return res.json({
      success: true,
      message: "Cart item Removed successfully",
      userCart: userCart,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Cart item Removed Failed",
    });
  }
}

export async function updateCartQuantity(req, res) {
  try {
    const userId = req.user.user._id;

    const productId = req.params.productId;

    const { action } = req.body;

    
    const cart = await Cartbase.findOne({userId});

    if (!cart) {
        
        return res.json({
            success:false,
            message:"cart not found"
        })
    }


    const itemsExistcart = cart.items.find(
        (item) => item.productId.toString() === productId
    )

     if (!itemsExistcart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (action === "increment") {
      itemsExistcart.quantity += 1;
    } else if (action === "decrement") {
      if (itemsExistcart.quantity > 1) {
        itemsExistcart.quantity -= 1;
      }
    }

    await cart.save();
    return res.json({
        success:true,
        message:"Cart updated successfully",
        cart
    })

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Quantity Update Failed",
    });
  }
}
