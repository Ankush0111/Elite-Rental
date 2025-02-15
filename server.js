const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  credentials: true, // Allow sending cookies
}));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Use a secret key for signing the session ID cookie
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't save session if it's not modified
    cookie: {
      httpOnly: true, // Protect against client-side script access
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS in production
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/car-rent', // MongoDB session store
      // ttl: 24 * 60 * 60 // Session expiration time (24 hours)
      ttl: 1 * 60 * 60
    }),
  })
);


// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/car-rent', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process with failure
  }
})();

// Define the schema for user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the User model
const User = mongoose.model("User", userSchema);

// Server health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// User Signup endpoint
// Signup Endpoint
app.post("/Signin", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ status: 'exist', message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ status: 'notexist', message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    return res.status(500).json({ status: 'fail', message: 'Internal server error' });
  }
});

// User Login endpoint
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user; // Save user to session
      return res.status(200).json({ status: 'exist', name: user.username, message: 'Login successful' });
    } else {
      return res.status(401).json({ status: 'notexist', error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'fail', error: 'Server error' });
  }
});

//logout
app.post("/api/logout", (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    // Clear cookies
    res.clearCookie("connect.sid"); // Adjust to match your cookie name
    res.status(200).json({ message: "Logout successful" });
  });
});


// contact us page
// Define Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact_us', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//rent page backend
const carRentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  carType: { type: String, required: true },
  rentStartDate: { type: Date, required: true },
  rentEndDate: { type: Date, required: true },
  pickupLocation: { type: String, required: true },
  returnLocation: { type: String, required: true },
});

const CarRental = mongoose.model("Rent-details", carRentalSchema);

// Routes
app.post("/api/rent", async (req, res) => {
  const {
    name,
    email,
    mobile,
    carType,
    rentStartDate,
    rentEndDate,
    pickupLocation,
    returnLocation,
  } = req.body;

  // Validate request data
  if (!name || !email || !mobile || !carType || !rentStartDate || !rentEndDate || !pickupLocation || !returnLocation) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Save data to MongoDB
    const carRental = new CarRental({
      name,
      email,
      mobile,
      carType,
      rentStartDate,
      rentEndDate,
      pickupLocation,
      returnLocation,
    });

    await carRental.save();
    res.status(201).json({ message: "Car rental request submitted successfully!" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//profile page 
app.get("/api/profile", async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const userEmail = req.session.user.email;

  try {
    // Query booking details using Mongoose
    const bookings = await CarRental.find({ email: userEmail })
      .select("carType rentStartDate rentEndDate pickupLocation returnLocation -_id");

    res.status(200).json({
      username: req.session.user.username,
      email: req.session.user.email,
      bookings,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error. Please try again later." });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
