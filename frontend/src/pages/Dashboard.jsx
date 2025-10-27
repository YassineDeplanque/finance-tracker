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

    const fetchTotalIncome = () => {
        axios.get(`http://localhost:3000/transaction/income/sum${intervalBar}`)
            .then((res) => {
                setTotalIncome(res.data[0].total);
                console.log('total : ', totalIncome)
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const fetchTotalExpenses = () => {
        axios.get(`http://localhost:3000/transaction/expenses/sum${intervalBar}`)
            .then((res) => {
                setTotalExpenses(res.data[0].total);
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

    useEffect(() => {
        fetchTotalIncome();
        console.log('total : ', totalIncome)
    }, [intervalBar])

    useEffect(() => {
        fetchTotalExpenses();
    }, [intervalBar])

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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased p-6">
    <div className="max-w-6xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>

      {/* Line Chart */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700 w-full h-[400px] md:h-[500px]">
        <select
          className="mb-4 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
          value={intervalIncome}
          onChange={(e) => setIntervalIncome(e.target.value)}
        >
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
            plugins: { legend: { position: "top", labels: { color: 'white' } } },
            scales: {
              x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
              y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' }, title: { display: true, text: "Amount (€)", color: 'white' }, beginAtZero: true },
            },
          }}
        />
      </div>

      {/* Doughnut + Bar Charts */}
      <div className="bg-slate-800/70 shadow-lg rounded-2xl p-6 border border-slate-700 w-full h-auto md:h-[500px]">
        <div className="flex flex-col md:flex-row gap-6 h-full">

          {/* Doughnut Chart */}
          <div className="flex-1 flex flex-col justify-start min-w-[300px]">
            <select
              className="w-40 mb-4 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
              value={intervalExpenses}
              onChange={(e) => setIntervalExpenses(e.target.value)}
            >
              <option value='/year'>This year</option>
              <option value='/three'>Last 3 months</option>
              <option value='/month'>This month</option>
            </select>
            <div className="w-full h-[250px] md:h-full">
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
                options={{
                  plugins: { legend: { labels: { color: 'white' } } },
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex-1 flex flex-col justify-start min-w-[300px]">
            <select
              className="w-40 mb-4 border border-slate-600 rounded-md p-2 bg-slate-900/70 text-slate-100 focus:ring-2 focus:ring-blue-400"
              value={intervalBar}
              onChange={(e) => setIntervalBar(e.target.value)}
            >
              <option value='/year'>This year</option>
              <option value='/three'>Last 3 months</option>
              <option value='/month'>This month</option>
            </select>
            <div className="w-full h-[250px] md:h-full">
              <Bar
                data={{
                  labels: ["Income", "Expenses"],
                  datasets: [
                    {
                      label: "Total",
                      data: [totalIncome, totalExpenses],
                      backgroundColor: ['#ADD8E6', '#FF0000'],
                      borderRadius: 5,
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { beginAtZero: true, title: { display: true, text: "Amount (€)", color: 'white' }, ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                  },
                }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
    <p className="text-center text-xs text-slate-400 mt-20 mb-10">
          © 2025 Yassine Deplanque
        </p>
  </div>
);

}

export default Dashboard;