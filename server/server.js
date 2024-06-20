const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://shop-api-azure-tau.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// This is your test secret API key.
app.use(express.static("public"));

const YOUR_DOMAIN = `https://shop-api-azure-tau.vercel.app/`;

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/pay", async (req, res) => {
  console.log(req.body.token);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.amount, // Use the Price ID here
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => console.log("Running on port 8000"));
