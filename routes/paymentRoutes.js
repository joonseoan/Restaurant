// const keys = require("../restaurant_configs/config").stripeSecretKey;

// console.log(keys);

// configuration of stripe
const stripe = require("stripe")(process.env.STRIPE);

// const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
  app.post("/api/creditcard", async (req, res) => {
    // it is from action creator of the client, "handleToken(token)"
    console.log("req.body from client:", req.body);

    const charge = await stripe.charges.create({
      // must be a same setup as with client
      amount: 500, // $5
      currency: "usd",
      description: "pay for korean restaurant",
      source: req.body.id
    });

    // req.user.credits += 5;

    // from "passport" m/w
    // const user = await req.user.save();
    // console.log('1. ', user)

    // ***************We can send "user" object to the client by using variable, "user".
    // res.send(user);
    // console.log('2. ', user)
  });
};
