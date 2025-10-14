import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getIncome, getExpenses, insertIncome, insertExpenses, deleteIncome, deleteExpenses, editIncome, editExpenses, getIncomeThreeMonths, getExpensesThreeMonths, getIncomeMonth, getExpensesMonth, getSumIncomeMonth, getSumIncomeThreeMonths, getSumIncome, getSumExpenses, getSumExpensesMonth, getSumExpensesThreeMonths } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/income/year', isAuthenticated, getIncome)
router.get('/income/sum/year', isAuthenticated, getSumIncome)
router.get('/income/month', isAuthenticated, getIncomeMonth)
router.get('/income/sum/month', isAuthenticated, getSumIncomeMonth)
router.get('/income/three', isAuthenticated, getIncomeThreeMonths)
router.get('/income/sum/three', isAuthenticated, getSumIncomeThreeMonths)
router.get('/expenses/year', isAuthenticated, getExpenses)
router.get('/expenses/sum/year', isAuthenticated, getSumExpenses)
router.get('/expenses/month', isAuthenticated, getExpensesMonth)
router.get('/expenses/sum/month', isAuthenticated, getSumExpensesMonth)
router.get('/expenses/three', isAuthenticated, getExpensesThreeMonths)
router.get('/expenses/sum/three', isAuthenticated, getSumExpensesThreeMonths)
router.post('/income', isAuthenticated, insertIncome)
router.post('/expenses', isAuthenticated, insertExpenses)
router.delete('/income/:id', isAuthenticated, deleteIncome)
router.delete('/expenses/:id', isAuthenticated, deleteExpenses)
router.put('/income/:id', isAuthenticated, editIncome)
router.put('/expenses/:id', isAuthenticated, editExpenses)

export default router;