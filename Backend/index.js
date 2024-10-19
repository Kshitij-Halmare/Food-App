import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config(); // Load environment variables from .env

// Create express app
const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// MongoDB connection URL
const url = process.env.MONGODB_URL;
if (!url) {
  console.error("MONGODB_URL is not set in environment variables");
  process.exit(1); // Exit if no MongoDB URL is provided
}

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String, minLength: 8 },
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// Route for user signup with JWT
app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword, ...otherDetails } = req.body;

  try {
    let existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match", alert: true });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await userModel.create({
        ...otherDetails,
        email,
        password: hashedPassword,
      });

      const payload = { user: { id: newUser._id } };

      // Create and sign JWT
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({
        message: "User created successfully",
        token,  // Send JWT token
        data: newUser,
        alert: true,
      });
    } else {
      return res.status(409).json({ message: "User already exists. Please login.", alert: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Route for user login with JWT
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const payload = { user: { id: user._id } };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
          message: "User logged in successfully",
          token,
          data: user,  // Send user data along with token
          alert: true,
        });
      } else {
        return res.status(400).json({ message: "Incorrect password", alert: false });
      }
    } else {
      return res.status(404).json({ message: "User not found. Please sign up first.", alert: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred. Please try again.", alert: false });
  }
});


//productt

app.post("/uploadProduct", async (req, res) => {
  let data = req.body;

  try {
      // Use correct query syntax for findOne
      let existingProduct = await productModel.findOne({ name: data.name });

      // Check if the product already exists
      if (existingProduct) {
          return res.json({ message: "Product already exists", alert: false });
      }

      // If the product does not exist, create it
      let newProduct = await productModel.create(data);

      if (newProduct) {
          res.json({ message: "New Product Created Successfully", alert: true });
      } else {
          res.json({ message: "Error while creating new Product", alert: false });
      }
  } catch (err) {
      console.error(err); // Log the error for debugging purposes
      res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

app.get("/product",async (req,res)=>{
  let data=await productModel.find();
  console.log(data);
  res.send(data);
})

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String
})
const productModel=mongoose.model("produc",schemaProduct)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
