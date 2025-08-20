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

    return(
        <div>
            <h1>Incomes</h1>
            <ul>
                {income.map((i)  => (
                    <li key={i.id}>Income : {i.amount}, Source : {i.source} <button onClick={() => handleDeleteIncome(i.id)}>Delete</button></li>
                ))}
            </ul>
            <h1>Expenses</h1>
            <ul>
                {expenses.map((ex)  => (
                    <li key={ex.id}>Income : {ex.amount}, Source : {ex.category} <button onClick={() => handleDeleteExpenses(ex.id)}>Delete</button></li>
                ))}
            </ul>
            <h1>Insert incomes</h1>
            <input placeholder='Amount' value={incomeAmountAdd} onChange={(e) => setIncomeAmountAdd(e.target.value)} />
            <input placeholder='Source' value={incomeSourceAdd} onChange={(e) => setIncomeSourceAdd(e.target.value)} />
            <button onClick={handleSubmitIncome}>Add</button>
            <h1>Insert expenses</h1>
            <input placeholder='Amount' value={expensesAmountAdd} onChange={(e) => setExpensesAmountAdd(e.target.value)} />
            <select value={expensesCategoryAdd} onChange={(e) => setExpensesCategopryAdd(e.target.value)}>
              <option value="">-- Choose a category --</option>
               {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
               ))}
            </select>
            <button onClick={handleSubmitExpenses}>Add</button>
        </div>
    )
}

export default Transactions;