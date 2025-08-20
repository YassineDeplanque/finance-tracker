import express from 'express';
import { getIncome, getExpenses, insertIncome } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income', getIncome)
router.get('/expenses', getExpenses)
router.post('/income', insertIncome)

export default router;