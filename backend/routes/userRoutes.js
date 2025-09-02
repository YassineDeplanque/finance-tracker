import express from 'express';
import { insertUser, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/', insertUser);
router.post('/login', login);

export default router;