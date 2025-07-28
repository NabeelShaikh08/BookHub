// Controller for authentication (login, signup)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

// Login user and return JWT token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Auth failed", success: false });
    }
    // Compare password
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: "Auth failed", success: false });
    }
    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    // Respond with user info and token
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Signup new user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exist", success: false });
    }
    // Hash password and save user
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    
    // Generate JWT token for auto-login after signup
    const jwtToken = jwt.sign(
      { userId: userModel._id, email: userModel.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    res.status(201).json({
      message: "SignUp Successfully",
      success: true,
      jwtToken,
      user: {
        _id: userModel._id,
        name: userModel.name,
        email: userModel.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
};
