const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: Math.round(req.body.amount),
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.json({
          status: 403
        })
      } else {
        res.json({
          body: stripeRes,
          status: 200,
        })
      }
    }
  );
});

module.exports = router;
