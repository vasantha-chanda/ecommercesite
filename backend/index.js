const express = require("express");
const cors = require("cors");
//vasanthachanda2030
//zUt1qWeBsrmaba11
//mongodb+srv://vasanthachanda2030:<password>@cluster0.j3e8avh.mongodb.net/
const products = require("./products");
const register=require("./Register");
const login=require("./Login");
const mongoose =require("mongoose");
const app = express();
const stripe = require("./stripe");
app.use(express.json());
app.use(cors());
app.use("/register",register);
app.use("/login",login)
app.use("/stripe",stripe);
app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
mongoose.connect("mongodb+srv://vasanthachanda2030:zUt1qWeBsrmaba11@cluster0.j3e8avh.mongodb.net/").then(()=>console.log("conected")).catch((err)=>console.log(err.message));