import axios from 'axios';
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

function Dashboard() {

    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [expensesDough, setExpensesDough] = useState([]);
    const [error, setError] = useState('');

    const [intervalIncome, setIntervalIncome] = useState('/year');
    const [intervalExpenses, setIntervalExpenses] = useState('/month');
    const [intervalBar, setIntervalBar] = useState('/month')

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const fetchIncome = () => {
        axios.get(`http://localhost:3000/transaction/income${intervalIncome}`)
            .then((res) => {
                setIncome(res.data);
            })
            .catch((err) => setError(err.message));
    };

    const fetchExpenses = () => {
        axios.get(`http://localhost:3000/transaction/expenses${intervalIncome}`)
            .then((res) => setExpenses(res.data))
            .catch((err) => setError(err.message));
    };

    const fetchExpensesDough = () => {
        axios.get(`http://localhost:3000/transaction/expenses${intervalExpenses}`)
            .then((res) => setExpensesDough(res.data))
            .catch((err) => setError(err.message));
    };

    const fetchTotalIncome = () => {
        axios.get(`http://localhost:3000/transaction/income/sum${intervalBar}`)
            .then((res) => setTotalIncome(res.data.total))
            .catch((err) => setError(err.message));
    };

    const fetchTotalExpenses = () => {
        axios.get(`http://localhost:3000/transaction/expenses/sum${intervalBar}`)
            .then((res) => setTotalExpenses(res.data.total))
            .catch((err) => setError(err.message));
    };

    useEffect(() => {
        fetchIncome();
        fetchExpenses();
    }, [intervalIncome]);

    useEffect(() => {
        fetchExpensesDough();
    }, [intervalExpenses]);

    useEffect(() => {
        fetchTotalIncome();
        fetchTotalExpenses();
    }, [intervalBar]);

    const allDates = Array.from(
        new Set([
            ...income.map((i) => i.date),
            ...expenses.map((e) => e.date),
        ])
    ).sort((a, b) => new Date(a) - new Date(b));

    const incomeData = allDates.map(
        (date) => income.find((i) => i.date === date)?.amount || 0
    );

    const expensesData = allDates.map(
        (date) => expenses.find((e) => e.date === date)?.amount || 0
    );

    const labels = allDates.map((date) =>
        new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    );

    const groupedExpenses = expensesDough.reduce((acc, ex) => {
        const cat = ex.category || "Autres";
        acc[cat] = (acc[cat] || 0) + ex.amount;
        return acc;
    }, {});

    const doughLabels = Object.keys(groupedExpenses);
    const doughData = Object.values(groupedExpenses);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6">
            <div className="max-w-6xl mx-auto space-y-10">

                <h1 className="text-3xl font-bold">Dashboard</h1>

                {/* LINE */}
                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 h-[450px]">
                    <select
                        className="mb-4 p-2 bg-slate-900/70 rounded"
                        value={intervalIncome}
                        onChange={(e) => setIntervalIncome(e.target.value)}
                    >
                        <option value='/year'>This year</option>
                        <option value='/three'>Last 3 months</option>
                        <option value='/month'>This month</option>
                    </select>

                    <Line
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Income",
                                    data: incomeData,
                                    borderColor: "#064FF0",
                                    tension: 0.3,
                                },
                                {
                                    label: "Expenses",
                                    data: expensesData,
                                    borderColor: "#F00606",
                                    tension: 0.3,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { labels: { color: "white" } } },
                            scales: {
                                x: { ticks: { color: "white" } },
                                y: { ticks: { color: "white" }, beginAtZero: true },
                            },
                        }}
                    />
                </div>

                {/* DOUGH + BAR */}
                <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                    <div className="flex flex-col md:flex-row gap-6">

                        {/* DOUGHNUT */}
                        <div className="flex-1 h-[320px]">
                            <select
                                className="mb-4 p-2 bg-slate-900/70 rounded"
                                value={intervalExpenses}
                                onChange={(e) => setIntervalExpenses(e.target.value)}
                            >
                                <option value='/year'>This year</option>
                                <option value='/three'>Last 3 months</option>
                                <option value='/month'>This month</option>
                            </select>

                            <Doughnut
                                data={{
                                    labels: doughLabels,
                                    datasets: [{
                                        data: doughData,
                                        backgroundColor: doughLabels.map(
                                            (_, i) => `hsl(${(i * 360) / doughLabels.length}, 70%, 60%)`
                                        ),
                                    }],
                                }}
                                options={{
                                    plugins: { legend: { labels: { color: "white" } } },
                                }}
                            />
                        </div>

                        {/* BAR CHART FIX ICI */}
                        <div className="flex-1 flex flex-col">
                            <select
                                className="mb-4 p-2 bg-slate-900/70 rounded"
                                value={intervalBar}
                                onChange={(e) => setIntervalBar(e.target.value)}
                            >
                                <option value='/year'>This year</option>
                                <option value='/three'>Last 3 months</option>
                                <option value='/month'>This month</option>
                            </select>

                            {/* ✅ FIX RESPONSIVE ICI */}
                            <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
                                <Bar
                                    data={{
                                        labels: ["Income", "Expenses"],
                                        datasets: [{
                                            label: "Total",
                                            data: [totalIncome, totalExpenses],
                                            backgroundColor: ['#ADD8E6', '#FF0000'],
                                        }],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            x: { ticks: { color: "white" } },
                                            y: { ticks: { color: "white" }, beginAtZero: true },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;