const express = require("express");
const router = express.Router();
const userCredential = require("../models/Admin/userCredentials");

router.post("/login", async (req, res) => {
    let { loginid, password, organizationType } = req.body;
    try {
      let user = await userCredential.findOne({ loginid, organizationType });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Credentials" });
      }
      if (password !== user.password) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Credentials" });
      }
      const data = {
        success: true,
        message: "Login Successfull!",
        loginid: user.loginid,
        id: user.id,
        organizationType: user.organizationType,
      };
      res.json(data);
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  module.exports = router;