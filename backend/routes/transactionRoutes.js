import express from 'express';
import { getIncome } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getIncome)
export default router;