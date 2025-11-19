import { USER_MODEL } from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

  // Get all users (already done)
  async getAll() {
    return await USER_MODEL.find().select("-password");
  }

  // ⭐ REGISTER USER
  async register({ username, email, password }) {
    // Check if email already exists
    const existingUser = await USER_MODEL.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await USER_MODEL.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  // ⭐ UPDATED LOGIN
  async login({ email, password }) {
    const user = await USER_MODEL.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

export default new UserService();
