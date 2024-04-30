const User = require("../models/User.Model");
const Cart = require("../models/Cart.model");

// addToCart ---------------------------------------------------------------------
exports.addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    const checkIfItemAlreadyExist = await Cart.findOne({
      $and: [{ foodDetail: itemId }, { userDetail: userId }],
    });

    if (!checkIfItemAlreadyExist) {
      const newAddedItem = await Cart.create({
        foodDetail: itemId,
        userDetail: userId,
      });

      if (!newAddedItem) {
        return res.json({
          success: false,
          message: "Error while adding new Item to Cart",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cartData: newAddedItem._id } },
        { new: true }
      ).populate("cartData");

      if (!updatedUser) {
        return res.json({
          success: false,
          message: "Error while updating user's cart data",
        });
      }

      return res.json({
        success: true,
        message: "new Item added Successfull",
        updatedUser,
      });
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { $and: [{ foodDetail: itemId }, { userDetail: userId }] },
        { $inc: { quantity: 1 } },
        { new: true }
      );

      return res.json({
        success: true,
        updatedCart,
        message: "Item Added Successfull",
      });
    }
  } catch (error) {
    console.log("error while adding item->", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occur while adding item",
    });
  }
};

// deleteFromCart  -------------------------------------------------------------------------
exports.deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    const checkIfItemAlreadyExist = await Cart.findOne({
      $and: [{ foodDetail: itemId }, { userDetail: userId }],
    });

    if (!checkIfItemAlreadyExist) {
      return res.json({
        success: false,
        message: "No Item To Remove",
      });
    }

    if (checkIfItemAlreadyExist.quantity > 1) {
      const updatedCart = await Cart.findOneAndUpdate(
        { $and: [{ foodDetail: itemId }, { userDetail: userId }] },
        { $inc: { quantity: -1 } },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Item Deleted Successfully",
        updatedCart,
      });
    } else if (checkIfItemAlreadyExist.quantity === 1) {
      const deletedItem = await Cart.findOneAndDelete({
        $and: [{ foodDetail: itemId }, { userDetail: userId }],
      });

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cartData: deletedItem._id } },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Item Deleted Successfully",
        updatedUser,
      });
    }

    return res.json({
      success: true,
      message: "Item Deleted Successfull",
    });
  } catch (error) {
    console.log("error while deleting item->", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occur while deleting item",
    });
  }
};

// fetchCartItem  --------------------------------------------------------------------------------
exports.fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    const fetchedData = await User.findById({ _id: userId })
      .populate([
        {
          path: "cartData",
          model: "Cart",
          populate: {
            path: "foodDetail",
            model: "Food",
          },
        },
      ])
      .exec();

    if (!fetchedData) {
      return res.json({
        success: false,
        message: "Data Fetch Unsuccessfull",
      });
    }

    return res.json({
      success: true,
      message: "Item Fetched Successfull",
      fetchedData,
    });
  } catch (error) {
    console.log("error while fetching item->", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occur while fetching item",
    });
  }
};
