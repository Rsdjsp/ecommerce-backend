import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "../routes/auth";
import products from "../routes/products";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/products", products());
app.use("/auth", auth());



app.get("/", (req, res) => {
  res.json("Hello world");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
