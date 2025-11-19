import { Router } from 'express';
import UserController from './user.controller.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.post("/register", userController.register);
router.post('/login', userController.login);

export default router;
