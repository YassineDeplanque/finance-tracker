import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarDisconnected from '../components/NavbarDisconnected';

function HomeDisconnected() {

    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white border-gray-200 dark:bg-gray-900">
            <NavbarDisconnected />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
                <div className="max-w-xl text-center bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to your Finance Tracker! 💰
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Keep track of your incomes and expenses easily. Manage your budget and make smarter financial decisions!
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
                        Get Started
                    </button>
                </div>
            </div>
        </div>


    );

}

export default HomeDisconnected;