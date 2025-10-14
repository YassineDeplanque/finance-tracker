import express from 'express';
import { insertUser, login, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/', insertUser);
router.post('/login', login);
router.post('/logout', logout);

export default router;