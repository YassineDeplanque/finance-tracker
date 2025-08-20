import axios from 'axios';
import { useState, useEffect } from "react";

function Transactions () {

    const [income, setIncome] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expensesAmount, setExpensesAmount] = useState(0);
    const [error, setError] = useState('');

    const [incomeAmountAdd, setIncomeAmountAdd] = useState('');
    const [incomeSourceAdd, setIncomeSourceAdd] = useState('');
    const [expensesAmountAdd, setExpensesAmountAdd] = useState('');
    const [expensesCategoryAdd, setExpensesCategopryAdd] = useState('');

    const categories = ["Food", "Transport", "Rent", "Entertainment", "Other"];

    const fetchIncome = () => {
      axios.get('http://localhost:3000/transaction/income')
        .then((res) => {
          setIncome(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    const fetchExpenses = () => {
      axios.get('http://localhost:3000/transaction/expenses')
        .then((res) => {
          setExpenses(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    };


    useEffect(() => {
        fetchIncome();
    }, [])

    useEffect(() => {
        fetchExpenses();
    }, [])

    const handleSubmitIncome = () => {
      const newIncome = {amount: incomeAmountAdd, source: incomeSourceAdd}
      axios.post("http://localhost:3000/transaction/income", newIncome)
        .then(res => {
          fetchIncome();
          setIncomeAmountAdd('');
          setIncomeSourceAdd('');
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    const handleSubmitExpenses = () => {
      const newExpenses = {amount: expensesAmountAdd, category: expensesCategoryAdd}
      axios.post("http://localhost:3000/transaction/expenses", newExpenses)
        .then(res => {
          fetchExpenses();
          setExpensesAmountAdd('');
          setExpensesCategopryAdd('');
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    const handleDeleteIncome = (id) => {
      axios.delete(`http://localhost:3000/transaction/income/${id}`)
        .then((res) => {
          setIncome(income.filter(i => i.id !== id))
        })
        .catch((err) => {
        setError(err.message)
      })
    }

    const handleDeleteExpenses = (id) => {
      axios.delete(`http://localhost:3000/transaction/expenses/${id}`)
        .then((res) => {
          setExpenses(expenses.filter(ex => ex.id !== id))
        })
        .catch((err) => {
        setError(err.message)
      })
    }

    return (
  <div className="max-w-4xl mx-auto p-6">
    {/* Incomes */}
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Incomes</h1>
    <ul className="space-y-2 mb-8">
      {income.map((i) => (
        <li 
          key={i.id} 
          className="flex justify-between items-center bg-white shadow-md rounded-lg p-3 border border-gray-200"
        >
          <span className="text-gray-700">💰 {i.amount} € — {i.source}</span>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => handleDeleteIncome(i.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

    {/* Expenses */}
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Expenses</h1>
    <ul className="space-y-2 mb-8">
      {expenses.map((ex) => (
        <li 
          key={ex.id} 
          className="flex justify-between items-center bg-white shadow-md rounded-lg p-3 border border-gray-200"
        >
          <span className="text-gray-700">💸 {ex.amount} € — {ex.category}</span>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => handleDeleteExpenses(ex.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

    {/* Insert incomes */}
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Insert incomes</h1>
    <div className="flex flex-col md:flex-row gap-3 mb-8">
      <input 
        className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Amount" 
        value={incomeAmountAdd} 
        onChange={(e) => setIncomeAmountAdd(e.target.value)} 
      />
      <input 
        className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Source" 
        value={incomeSourceAdd} 
        onChange={(e) => setIncomeSourceAdd(e.target.value)} 
      />
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        onClick={handleSubmitIncome}
      >
        Add
      </button>
    </div>

    {/* Insert expenses */}
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Insert expenses</h1>
    <div className="flex flex-col md:flex-row gap-3">
      <input 
        className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Amount" 
        value={expensesAmountAdd} 
        onChange={(e) => setExpensesAmountAdd(e.target.value)} 
      />
      <select 
        className="flex-1 border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={expensesCategoryAdd} 
        onChange={(e) => setExpensesCategopryAdd(e.target.value)}
      >
        <option value="">-- Choose a category --</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        onClick={handleSubmitExpenses}
      >
        Add
      </button>
    </div>
  </div>
);

}

export default Transactions;