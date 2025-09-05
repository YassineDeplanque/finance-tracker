import { NavLink } from 'react-router-dom';
import NavbarDisconnected from '../components/NavbarDisconnected';
import graphScreen from '../assets/graphScreen.PNG'
import trackScreen from '../assets/trackScreen.PNG'
import cadena from '../assets/cadena.png'
import logo from '../assets/logo.png';

function HomeDisconnected() {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <NavbarDisconnected />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex flex-col items-center justify-center p-4">
        {/* Ajout du margin-top pour éloigner du header */}
        <div className="w-full max-w-2xl flex-1 flex flex-col justify-center mt-20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
            <header className="mb-8">
              <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center">
                {/* Money Icon */}
                <img
                  src={logo}
                  className="h-17 w-17 text-slate-100"                
                />
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight">
                Welcome to <span className="text-indigo-400">BlueTrack</span>
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
        </div>

        <section className="w-full max-w-6xl mt-24 space-y-24">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
            Powerful <span className="text-indigo-400">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Track Expenses</h3>
              <p className="text-slate-300">
                Easily add and manage your incomes and expenses with clear categories.
                Keep full control of your cash flow and understand exactly where your money goes each month.
              </p>
              <ul className="text-slate-400 text-sm list-disc list-inside space-y-1">
                <li>Expenses categorization</li>
                <li>Clean interface</li>
                <li>Real-time updates</li>
              </ul>
            </div>
            <div className="h-90 flex items-center justify-center overflow-hidden">
              <img
                src={trackScreen}
                alt="track screen"
              />
            </div>
      </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-90 flex items-center justify-center overflow-hidden">
              <img
                src={graphScreen}
                alt="Graph screen"
              />
            </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Graphic visualization</h3>
                <p className="text-slate-300">
                  Visualize your finances with clear, intuitive graphs
                  that make it easy to spot trends and track your progress over time.
                </p>
                <ul className="text-slate-400 text-sm list-disc list-inside space-y-1">
                  <li>Clean dashboard</li>
                  <li>Understandable graphs</li>
                  <li>Comparison between income and expenses</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Secure Data</h3>
                <p className="text-slate-300">
                  Your financial information and password are protected with industry-grade
                  security protocols and encryption.
                </p>
                <ul className="text-slate-400 text-sm list-disc list-inside space-y-1">
                  <li>Hashed password</li>
                  <li>No personal data usage — your information stays yours</li>
                  <li>Clear and transparent security practices</li>
                </ul>
              </div>
              <div className="h-90 flex items-center justify-center overflow-hidden">
              <img
                src={cadena}
                alt="cadena"
                className='h-48'
              />
            </div>
            </div>
        </section>

        <p className="text-center text-xs text-slate-400 mt-20 mb-10">
          © 2025 Yassine Deplanque
        </p>
      </div>
    </div>
  );
}

export default HomeDisconnected;
