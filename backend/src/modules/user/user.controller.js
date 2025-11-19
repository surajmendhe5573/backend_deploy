import UserService from "./user.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class UserController {
  constructor() {
    this.userService = UserService;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.userService.getAll();
      return res.success("Users fetched successfully", users, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const result = await this.userService.register({
        username,
        email,
        password,
      });

      return res.success(
        "User registered successfully",
        result,
        statusCode.CREATED
      );
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const result = await this.userService.login({ email, password });

      return res.success("Login successful", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {

      const user = await this.userService.deleteUser(req.params.id);
      if(!user) return res.fail("User not found", statusCode.NOT_FOUND);

      return res.success("Login successful", statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
