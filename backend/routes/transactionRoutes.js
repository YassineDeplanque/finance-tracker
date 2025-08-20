import express from 'express';
import { getIncome, getExpenses, insertIncome, insertExpenses, deleteIncome } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income', getIncome)
router.get('/expenses', getExpenses)
router.post('/income', insertIncome)
router.post('/expenses', insertExpenses)
router.delete('/income/:id', deleteIncome)

export default router;