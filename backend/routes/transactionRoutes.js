import express from 'express';
import { getIncome, getExpenses, insertIncome, insertExpenses, deleteIncome, deleteExpenses, editIncome, editExpenses, getIncomeThreeMonths, getExpensesThreeMonths, getIncomeMonth, getExpensesMonth, getSumIncomeMonth, getSumIncomeThreeMonths, getSumIncome, getSumExpenses, getSumExpensesMonth, getSumExpensesThreeMonths } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income/year', getIncome)
router.get('/income/sum/year', getSumIncome)
router.get('/income/month', getIncomeMonth)
router.get('/income/sum/month', getSumIncomeMonth)
router.get('/income/three', getIncomeThreeMonths)
router.get('/income/sum/three', getSumIncomeThreeMonths)
router.get('/expenses/year', getExpenses)
router.get('/expenses/sum/year', getSumExpenses)
router.get('/expenses/month', getExpensesMonth)
router.get('/expenses/sum/month', getSumExpensesMonth)
router.get('/expenses/three', getExpensesThreeMonths)
router.get('/expenses/sum/three', getSumExpensesThreeMonths)
router.post('/income', insertIncome)
router.post('/expenses', insertExpenses)
router.delete('/income/:id', deleteIncome)
router.delete('/expenses/:id', deleteExpenses)
router.put('/income/:id', editIncome)
router.put('/expenses/:id', editExpenses)

export default router;