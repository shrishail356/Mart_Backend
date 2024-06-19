const connectToMongo = require("./Database/db");
const express = require("express");
const compression = require("compression");
const app = express();
connectToMongo();
const port = 5000 || process.env.PORT;
var cors = require("cors");

app.use(cors());
app.use(compression());
app.use(express.json()); 

app.use("/api/admin/auth", require("./routes/Admin Api/adminCredential"));
app.use("/api/user/auth", require("./routes/userRoute"));
app.use("/api/admin/details", require("./routes/Admin Api/adminDetails"));
app.use("/api/product", require("./routes/notice"));
app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
