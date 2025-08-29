import { NavLink } from 'react-router-dom';
import NavbarDisconnected from '../components/NavbarDisconnected';

function HomeDisconnected() {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <NavbarDisconnected />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
            <header className="mb-8">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-white/10 grid place-items-center shadow">
                {/* Money Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 text-slate-100"
                >
                  <path d="M12 2.25c-5.385 0-9.75 2.91-9.75 6.5v6.5c0 3.59 4.365 6.5 9.75 6.5s9.75-2.91 9.75-6.5v-6.5c0-3.59-4.365-6.5-9.75-6.5zm0 2c4.28 0 7.75 2.019 7.75 4.5s-3.47 4.5-7.75 4.5-7.75-2.019-7.75-4.5 3.47-4.5 7.75-4.5zM4.25 12.56c1.48 1.24 4.27 2.19 7.75 2.19s6.27-.95 7.75-2.19V15c0 2.481-3.47 4.5-7.75 4.5S4.25 17.481 4.25 15v-2.44z" />
                </svg>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                Welcome to <span className="text-indigo-400">Finance Tracker</span> 💰
              </h1>
              <p className="text-slate-300 text-sm mt-2">
                Track your incomes, expenses, and manage your budget smarter.
              </p>
            </header>

            <div className="flex flex-col gap-4 items-center">
              <NavLink
                to="/signin"
                className="w-full md:w-2/3 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                Get Started
              </NavLink>
              <NavLink
                to="/signup"
                className="w-full md:w-2/3 rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-medium text-slate-100 shadow hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                Create Account
              </NavLink>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">© 2025 Your Company</p>
        </div>
      </div>
    </div>
  );
}

export default HomeDisconnected;
