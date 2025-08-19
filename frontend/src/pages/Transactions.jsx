import axios from 'axios';
import { useState, useEffect } from "react";

function Transactions () {

    const [income, setIncome] = useState([]);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expensesAmount, setExpensesAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/transaction/income')
          .then((res) => {
            setIncome(res.data);
          })
          .catch((err) => {
            setError(err.message)
          })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/transaction/expenses')
          .then((res) => {
            setExpenses(res.data);
          })
          .catch((err) => {
            setError(err.message)
          })
    }, [])

    return(
        <div>
            <h1>Incomes</h1>
            <ul>
                {income.map((i)  => (
                    <li key={i.id}>Income : {i.amount}, Source : {i.source}</li>
                ))}
            </ul>
            <h1>Expenses</h1>
            <ul>
                {expenses.map((ex)  => (
                    <li key={ex.id}>Income : {ex.amount}, Source : {ex.category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Transactions;