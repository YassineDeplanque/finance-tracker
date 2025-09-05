import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
          <header className="mb-8">
            <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center ">
              {/* Dashboard Icon */}
              <img
                src={logo}
                className="h-17 w-17 text-slate-100"
                            />
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Welcome back to <span className="text-indigo-400">BlueTrack</span> 💰
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
        <p className="text-center text-xs text-slate-400 mt-6">© 2025 Yassine Deplanque</p>
      </div>
    </div>
  );
}

export default Home;
