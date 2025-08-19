import express from 'express';
import { getIncome, getExpenses } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income', getIncome)
router.get('/expenses', getExpenses)

export default router;