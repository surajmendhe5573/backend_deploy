import { Router } from 'express';
import UserController from './user.controller.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.post("/register", userController.register);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);

export default router;
