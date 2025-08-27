import axios from 'axios';
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";


function Dashboard() {

    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');

    const [intervalIncome, setIntervalIncome] = useState('/year');
    const [intervalExpenses, setIntervalExpenses] = useState('/year');

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
        axios.get(`http://localhost:3000/transaction/expenses${intervalExpenses}`)
            .then((res) => {
                setExpenses(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };


    useEffect(() => {
        fetchIncome();
    }, [intervalIncome])

    useEffect(() => {
        fetchExpenses();
    }, [intervalExpenses])


    return (
        <div>
            <h1>
                Hello Dashboard !
            </h1>
        </div>
    )
}

export default Dashboard;