const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
// Implement logic for user registration, login, etc.


const loginUser = async (email, password)=> {
  try {
      // Find the user by email
      const user = await User.findOne({ email: email },{password:0});
      if (!user) {
          throw new Error("Login failed: User not found.");
      }
      
      // Compare submitted password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          throw new Error("Login failed: Incorrect password.");
      }
      
      // If the function reaches here, the email and password are correct
      return user;
  } catch (error) {
      console.error("An error occurred during login:", error);
      throw new Error(error);
  }
}

const registerUser = async ({ email, name, password }) => {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
  
    // Save the user to the database
    try {
      return await user.save();
    } catch (error) {
      throw new Error(error);
    }
  };

  module.exports = {
    registerUser,
    loginUser
  }