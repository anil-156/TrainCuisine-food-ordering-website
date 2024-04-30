exports.checkout = async (req, res) => {
  const stripe = require("stripe")(
    "sk_test_51OzX7rSJWr8nuJrVJoXTF3nWjwUjem2Z3RnicmDueS7iSTv0p8Yg7kY81QNfhTzZnoR8kAEHMFzHTBGw5elbzAZO00lwup1tx1"
  );

  const products = req.body;
  console.log(products);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.foodDetail.name,
      },
      unit_amount: product.foodDetail.new_price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/payment-success",
    cancel_url: "http://localhost:5173/payment-cancel",
  });

  return res.json({
    id: session.id,
  });
};
