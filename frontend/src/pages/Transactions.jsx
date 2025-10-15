import axios from 'axios';
import { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

function Transactions() {

  const [income, setIncome] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [error, setError] = useState('');

  const [incomeAmountAdd, setIncomeAmountAdd] = useState('');
  const [incomeSourceAdd, setIncomeSourceAdd] = useState('');
  const [incomeDateAdd, setIncomeDateAdd] = useState('');
  const [expensesAmountAdd, setExpensesAmountAdd] = useState('');
  const [expensesCategoryAdd, setExpensesCategopryAdd] = useState('');
  const [expensesDateAdd, setExpensesDateAdd] = useState('');

  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [editingIncomeAmount, setEditingIncomeAmount] = useState('');
  const [editingIncomeSource, setEditingIncomeSource] = useState('');
  const [editingIncomeDate, setEditingIncomeDate] = useState('');

  const [editingExpensesId, setEditingExpensesId] = useState(null);
  const [editingExpensesAmount, setEditingExpensesAmount] = useState('');
  const [editingExpensesCategory, setEditingExpensesCategory] = useState('');
  const [editingExpensesDate, setEditingExpensesDate] = useState('');

  const [intervalIncome, setIntervalIncome] = useState('/year');
  const [intervalExpenses, setIntervalExpenses] = useState('/year');

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const categories = ["Food", "Transport", "Rent", "Shopping", "Restaurant", "Outing", "Other"];

  // ====== Fetch Income ======
  const fetchIncome = () => {
    axios.get(`http://localhost:3000/transaction/income${intervalIncome}`, { withCredentials: true })
      .then((res) => {
        setIncome(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchExpenses = () => {
    axios.get(`http://localhost:3000/transaction/expenses${intervalExpenses}`, { withCredentials: true })
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchTotalIncome = () => {
    axios.get(`http://localhost:3000/transaction/income/sum${intervalIncome}`, { withCredentials: true })
      .then((res) => {
        setTotalIncome(res.data.total ?? 0);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchTotalExpenses = () => {
    axios.get(`http://localhost:3000/transaction/expenses/sum${intervalExpenses}`, { withCredentials: true })
      .then((res) => {
        setTotalExpenses(res.data.total ?? 0);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // ====== useEffect ======
  useEffect(() => { fetchIncome(); fetchTotalIncome(); }, [intervalIncome]);
  useEffect(() => { fetchExpenses(); fetchTotalExpenses(); }, [intervalExpenses]);

  useEffect(() => { fetchIncome(); fetchTotalIncome(); }, [totalIncome]);
  useEffect(() => { fetchExpenses(); fetchTotalExpenses(); }, [totalExpenses]);

  // ====== Add Income ======
  const handleSubmitIncome = () => {
    const newIncome = { amount: incomeAmountAdd, source: incomeSourceAdd, date: incomeDateAdd };
    axios.post("http://localhost:3000/transaction/income", newIncome, { withCredentials: true })
      .then(res => {
        fetchIncome();
        setIncomeAmountAdd('');
        setIncomeSourceAdd('');
        setIncomeDateAdd('');
      })
      .catch((err) => setError(err.message));
  }

  // ====== Add Expenses ======
  const handleSubmitExpenses = () => {
    const newExpenses = { amount: expensesAmountAdd, category: expensesCategoryAdd, date: expensesDateAdd };
    axios.post("http://localhost:3000/transaction/expenses", newExpenses, { withCredentials: true })
      .then(res => {
        fetchExpenses();
        setExpensesAmountAdd('');
        setExpensesCategopryAdd('');
        setExpensesDateAdd('');
        fetchTotalExpenses();
        fetchTotalExpenses();
      })
      .catch((err) => setError(err.message));
  }

  // ====== Delete Income ======
  const handleDeleteIncome = (id) => {
    axios.delete(`http://localhost:3000/transaction/income/${id}`, { withCredentials: true })
      .then((res) => {
        setIncome(income.filter(i => i.id !== id));
        fetchTotalExpenses();
        fetchTotalExpenses();
      })
      .catch((err) => setError(err.message));
  }

  // ====== Delete Expenses ======
  const handleDeleteExpenses = (id) => {
    axios.delete(`http://localhost:3000/transaction/expenses/${id}`, { withCredentials: true })
      .then((res) => {
        setExpenses(expenses.filter(ex => ex.id !== id));
        fetchTotalExpenses();
        fetchTotalExpenses();
      })
      .catch((err) => setError(err.message));
  }

  // ====== Edit Income ======
  const startEditingIncome = (incomes) => {
    setEditingIncomeId(incomes.id);
    setEditingIncomeAmount(incomes.amount);
    setEditingIncomeSource(incomes.source);
    const d = new Date(incomes.date);
    setEditingIncomeDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  }

  const handleEditIncome = (id) => {
    const editIncome = { amount: editingIncomeAmount, source: editingIncomeSource, date: editingIncomeDate };
    axios.put(`http://localhost:3000/transaction/income/${id}`, editIncome, { withCredentials: true })
      .then(res => {
        fetchIncome();
        setEditingIncomeId(null);
        fetchTotalExpenses();
        fetchTotalExpenses();
      })
      .catch(err => setError(err.message));
  }

  // ====== Edit Expenses ======
  const startEditingExpenses = (expense) => {
    setEditingExpensesId(expense.id);
    setEditingExpensesAmount(expense.amount);
    setEditingExpensesCategory(expense.category);
    const d = new Date(expense.date);
    setEditingExpensesDate(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  }

  const handleEditExpenses = (id) => {
    const editExpenses = { amount: editingExpensesAmount, category: editingExpensesCategory, date: editingExpensesDate };
    axios.put(`http://localhost:3000/transaction/expenses/${id}`, editExpenses, { withCredentials: true })
      .then(res => {
        fetchExpenses();
        setEditingExpensesId(null);
        fetchTotalExpenses();
        fetchTotalExpenses();
      })
      .catch(err => setError(err.message));
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased p-6">
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Incomes */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-4">💰 Incomes</h1>
        <div className="flex items-center justify-between mb-4">
          <select
            className="border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={intervalIncome}
            onChange={(e) => setIntervalIncome(e.target.value)}
          >
            <option value="/year">This year</option>
            <option value="/three">Last 3 months</option>
            <option value="/month">This month</option>
          </select>
          <div className="text-slate-200 font-semibold">
            Total: <span className="text-blue-400">{totalIncome}</span> €
          </div>
        </div>

        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {income.map((i) => (
            <li
              key={i.id}
              className="flex justify-between items-center bg-slate-900/60 shadow rounded-lg p-3 border border-slate-700"
            >
              <span className="text-slate-200">
                💰 {i.amount} € — {i.source} — {new Date(i.date).toLocaleDateString()}
              </span>
              {editingIncomeId === i.id ? (
                <div className="flex gap-2 flex-wrap">
                  <input
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingIncomeAmount}
                    onChange={(e) => setEditingIncomeAmount(e.target.value)}
                  />
                  <input
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingIncomeSource}
                    onChange={(e) => setEditingIncomeSource(e.target.value)}
                  />
                  <input
                    type="date"
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingIncomeDate || ""}
                    onChange={(e) => setEditingIncomeDate(e.target.value)}
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleEditIncome(i.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => setEditingIncomeId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleDeleteIncome(i.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => startEditingIncome(i)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Expenses */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-4">💸 Expenses</h1>
        <div className="flex items-center justify-between mb-4">
          <select
            className="border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            value={intervalExpenses}
            onChange={(e) => setIntervalExpenses(e.target.value)}
          >
            <option value="/year">This year</option>
            <option value="/three">Last 3 months</option>
            <option value="/month">This month</option>
          </select>
          <div className="text-slate-200 font-semibold">
            Total: <span className="text-blue-400">{totalExpenses}</span> €
          </div>
        </div>

        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {expenses.map((ex) => (
            <li
              key={ex.id}
              className="flex justify-between items-center bg-slate-900/60 shadow rounded-lg p-3 border border-slate-700"
            >
              <span className="text-slate-200">
                💸 {ex.amount} € — {ex.category} — {new Date(ex.date).toLocaleDateString()}
              </span>
              {editingExpensesId === ex.id ? (
                <div className="flex gap-2 flex-wrap">
                  <input
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingExpensesAmount}
                    onChange={(e) => setEditingExpensesAmount(e.target.value)}
                  />
                  <select
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingExpensesCategory}
                    onChange={(e) => setEditingExpensesCategory(e.target.value)}
                  >
                    <option value="">-- Choose a category --</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="border border-slate-600 rounded-md p-2 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-400"
                    value={editingExpensesDate || ""}
                    onChange={(e) => setEditingExpensesDate(e.target.value)}
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleEditExpenses(ex.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => setEditingExpensesId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleDeleteExpenses(ex.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => startEditingExpenses(ex)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Insert incomes */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-4">➕ Insert incomes</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            placeholder="Amount"
            value={incomeAmountAdd}
            onChange={(e) => setIncomeAmountAdd(e.target.value)}
          />
          <input
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            placeholder="Source"
            value={incomeSourceAdd}
            onChange={(e) => setIncomeSourceAdd(e.target.value)}
          />
          <input
            type="date"
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            value={incomeDateAdd}
            onChange={(e) => setIncomeDateAdd(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleSubmitIncome}
          >
            Add
          </button>
        </div>
      </div>

      {/* Insert expenses */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-4">➕ Insert expenses</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            placeholder="Amount"
            value={expensesAmountAdd}
            onChange={(e) => setExpensesAmountAdd(e.target.value)}
          />
          <select
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            value={expensesCategoryAdd}
            onChange={(e) => setExpensesCategopryAdd(e.target.value)}
          >
            <option value="">-- Choose a category --</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="flex-1 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
            value={expensesDateAdd}
            onChange={(e) => setExpensesDateAdd(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleSubmitExpenses}
          >
            Add
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-20 mb-10">
          © 2025 Yassine Deplanque
        </p>
    </div>
  </div>
);



}

export default Transactions;