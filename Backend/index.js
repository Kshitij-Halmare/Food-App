import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Create express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is Running");
});

dotenv.config();  // This line loads your .env file into process.env

// MongoDB connection URL
const url = process.env.MONGODB_URL;
if (!url) {
  console.error("MONGODB_URL is not set in environment variables");
  process.exit(1); // Exits the app if no MongoDB URL is provided
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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    minLength: 8,
  },
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// Route for user signup
app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword, ...otherDetails } = req.body; // Destructure user data from request body

  try {
    // Check if user already exists
    let existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      // Check if passwords match before hashing
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match", alert: true });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user with hashed password and omit confirmPassword
      const newUser = await userModel.create({
        ...otherDetails,
        email,
        password: hashedPassword,
        confirmPassword: null,
      });

      return res.status(201).json({
        message: "User created successfully",
        data: newUser,
        alert: false,
      });
    } else {
      // User already exists
      return res.status(409).json({ message: "User already exists. Please login.", alert: true });
    }
  } catch (err) {
    // Handle any errors during database operations
    console.error(err);
    return res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database by email
    let user = await userModel.findOne({ email });
    if (user) {
      // Compare the password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.status(200).json({
          message: "User logged in successfully",
          alert: true, // Send the alert flag for successful login
        });
      } else {
        return res.status(400).json({
          message: "Incorrect password",
          alert: false, // Login failure, no alert
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found. Please sign up first.",
        alert: false, // Login failure, no alert
      });
    }
  } catch (err) {
    // Handle errors during login
    console.error(err);
    return res.status(500).json({
      message: "An error occurred. Please try again.",
      alert: false, // Error during login, no alert
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
