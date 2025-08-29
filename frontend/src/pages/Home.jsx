import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
          <header className="mb-8">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-white/10 grid place-items-center shadow">
              {/* Dashboard Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-7 w-7 text-slate-100"
              >
                <path d="M4.5 3.75A2.25 2.25 0 002.25 6v3A2.25 2.25 0 004.5 11.25h3A2.25 2.25 0 009.75 9V6A2.25 2.25 0 007.5 3.75h-3zm12 0A2.25 2.25 0 0014.25 6v3A2.25 2.25 0 0016.5 11.25h3A2.25 2.25 0 0021.75 9V6A2.25 2.25 0 0019.5 3.75h-3zm-12 9A2.25 2.25 0 002.25 15v3A2.25 2.25 0 004.5 20.25h3A2.25 2.25 0 009.75 18v-3A2.25 2.25 0 007.5 12.75h-3zm12 0A2.25 2.25 0 0014.25 15v3a2.25 2.25 0 002.25 2.25h3A2.25 2.25 0 0021.75 18v-3a2.25 2.25 0 00-2.25-2.25h-3z" />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Welcome back to <span className="text-indigo-400">Finance Tracker</span> 💰
            </h1>
            <p className="text-slate-300 text-sm mt-2">
              Stay on top of your incomes, expenses and goals every day.
            </p>
          </header>

          <div className="flex flex-col gap-4 items-center">
            <NavLink to="./dashboard" className="w-full md:w-2/3 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              Go to Dashboard
            </NavLink>
            <NavLink to="/transactions" className="w-full md:w-2/3 rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-medium text-slate-100 shadow hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              Add transactions
            </NavLink>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">© 2025 Finance Tracker</p>
      </div>
    </div>
  );
}

export default Home;
