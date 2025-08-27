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

    const fetchIncome = () => {
        axios.get(`http://localhost:3000/transaction/income${intervalIncome}`)
            .then((res) => {
                setIncome(res.data);
                console.log(intervalIncome)
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const fetchExpenses = () => {
        axios.get(`http://localhost:3000/transaction/expenses${intervalIncome}`)
            .then((res) => {
                setExpenses(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const fetchExpensesDough = () => {
        axios.get(`http://localhost:3000/transaction/expenses${intervalExpenses}`)
            .then((res) => {
                setExpensesDough(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    useEffect(() => {
        fetchIncome();
        fetchExpenses();
    }, [intervalIncome])

    useEffect(() => {
        fetchExpensesDough();
    }, [intervalExpenses])

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

    // Grouper les dépenses par catégorie
    const groupedExpenses = expensesDough.reduce((acc, ex) => {
        const cat = ex.category || "Autres";
        if (acc[cat]) {
            acc[cat] += ex.amount;
        } else {
            acc[cat] = ex.amount;
        }
        return acc;
    }, {});

    // Labels = catégories
    const doughLabels = Object.keys(groupedExpenses);

    // Data = somme des montants par catégorie
    const doughData = Object.values(groupedExpenses);



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-full h-[400px] md:h-[500px]">
                <select
                    className="flex-1 border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={intervalIncome}
                    onChange={(e) => setIntervalIncome(e.target.value)}>
                    <option value='/year'>This year</option>
                    <option value='/three'>Last 3 months</option>
                    <option value='/month'>This month</option>
                </select>
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Income",
                                data: incomeData,
                                backgroundColor: "rgba(6, 79, 240, 0.2)",
                                borderColor: "#064FF0",
                                borderWidth: 2,
                                tension: 0.3,
                            },
                            {
                                label: "Expenses",
                                data: expensesData,
                                backgroundColor: "rgba(240, 6, 6, 0.2)",
                                borderColor: "#F00606",
                                borderWidth: 2,
                                tension: 0.3,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Amount (€)",
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-full h-[400px] md:h-[500px]">
                <select
                    className="flex-1 border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={intervalExpenses}
                    onChange={(e) => setIntervalExpenses(e.target.value)}>
                    <option value='/year'>This year</option>
                    <option value='/three'>Last 3 months</option>
                    <option value='/month'>This month</option>
                </select>
                <Doughnut
                    data={{
                        labels: doughLabels,
                        datasets: [
                            {
                                label: "Expenses",
                                data: doughData,
                                backgroundColor: doughLabels.map(
                                    (_, i) => `hsl(${(i * 360) / doughLabels.length}, 70%, 60%)`
                                ),
                                borderRadius: 5,
                                borderWidth: 2,
                            },
                        ],
                    }}
                />
            </div>
        </div>

    )
}

export default Dashboard;