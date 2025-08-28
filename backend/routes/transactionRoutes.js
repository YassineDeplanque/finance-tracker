import express from 'express';
import { getIncome, getExpenses, insertIncome, insertExpenses, deleteIncome, deleteExpenses, editIncome, editExpenses, getIncomeThreeMonths, getExpensesThreeMonths, getIncomeMonth, getExpensesMonth, getSumIncomeMonth } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income/year', getIncome)
router.get('/income/month', getIncomeMonth)
router.get('/income/sum/month', getSumIncomeMonth)
router.get('/income/three', getIncomeThreeMonths)
router.get('/expenses/year', getExpenses)
router.get('/expenses/month', getExpensesMonth)
router.get('/expenses/three', getExpensesThreeMonths)
router.post('/income', insertIncome)
router.post('/expenses', insertExpenses)
router.delete('/income/:id', deleteIncome)
router.delete('/expenses/:id', deleteExpenses)
router.put('/income/:id', editIncome)
router.put('/expenses/:id', editExpenses)

export default router;