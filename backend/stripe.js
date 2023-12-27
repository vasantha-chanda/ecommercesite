const express = require("express");

const router=express.Router();
const stripe = require('stripe')('sk_test_51OQsjRSBAp8cfGnBSSXGWtZyIo7ig2Ntc0kbpa4Dcm2OWCKcGcTlxBs6AX0Msxopg92Ug2TIHFh8A4oIW7zILYJl00x3esMsZG');

router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: [item.image],
              description: item.desc,
              metadata: {
                id: item.id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.cartQuantity,
        };
      });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "inr",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "inr",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-sucess',
      cancel_url: 'http://localhost:3000/cart',
    });
  
    res.send({url:session.url});
  });
  
module.exports= router; 