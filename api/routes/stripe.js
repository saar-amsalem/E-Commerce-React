const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr);
        res.json({
          body: stripeErr,
          status: 403,
          err: true,
          message: "Payment is unsecceeded !" 
        })
      } else {
        res.json({
          body: stripeRes,
          status: 200,
          err: false
        })
      }
    }
  );
});

module.exports = router;
