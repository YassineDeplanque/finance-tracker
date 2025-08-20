import express from 'express';
import { getIncome, getExpenses, insertIncome, insertExpenses, deleteIncome, deleteExpenses, editIncome } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income', getIncome)
router.get('/expenses', getExpenses)
router.post('/income', insertIncome)
router.post('/expenses', insertExpenses)
router.delete('/income/:id', deleteIncome)
router.delete('/expenses/:id', deleteExpenses)
router.put('/income/:id', editIncome)

export default router;