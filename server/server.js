const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// This is your test secret API key.
app.use(express.static("public"));

const YOUR_DOMAIN = `http://localhost:${port}`;

app.post("/pay", async (req, res) => {
  await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        source: req.body.token.id,
        price: req.body.amount,
        currency: "usd",
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
});

app.listen(port, () => console.log("Running on port 8000"));
