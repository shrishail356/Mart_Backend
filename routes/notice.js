const express = require("express");
const router = express.Router();
const Product = require("../models/Other/Product");

router.post("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.json({ success: true, message: "Products Retrieved Successfully", products });
    } else {
      res.status(404).json({ success: false, message: "No Products Available!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addProduct", async (req, res) => {
  const { productTitle, productDescription, imageUrl, price, discount, weight, stockQuantity, expiryDate } = req.body;
  try {
    let product = await Product.findOne({ productTitle, productDescription });
    if (product) {
      return res.status(400).json({ success: false, message: "Product Already Exists!" });
    }
    await Product.create({
      productTitle,
      productDescription,
      imageUrl,
      price,
      discount,
      weight,
      stockQuantity,
      expiryDate,
    });
    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  const { productTitle, productDescription, imageUrl, price, discount, weight, stockQuantity, expiryDate } = req.body;
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productTitle,
        productDescription,
        imageUrl,
        price,
        discount,
        weight,
        stockQuantity,
        expiryDate,
      },
      { new: true }
    );
    if (!product) {
      return res.status(400).json({ success: false, message: "No Product Found!" });
    }
    res.json({ success: true, message: "Product Updated Successfully", product });
  } catch (error) {
    console.error("Error updating product:", error); // Log the error details
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Delete a Product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({ success: false, message: "No Product Found!" });
    }
    res.json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
