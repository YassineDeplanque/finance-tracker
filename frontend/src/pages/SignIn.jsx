import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import api from '../api/axios';
import NavbarDisconnected from '../components/NavbarDisconnected';
import { useAuth } from '../context/AuthContext';

function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");
    const [eye, setEye] = useState("M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("All fields must be filled.");
            return;
        }

        try {
            const newLogin = { email, password };

            const res = await api.post("/user/login", newLogin);

            const loggedUser = res.data.user || { email: email };

            setUser(loggedUser);

            setEmail("");
            setPassword("");

            navigate('/homeco');
        } catch (err) {
            console.error(err);
            setError("Email or password wrong.");
        }
    };

    const handlePassword = () => {
        if (inputType === "password") {
            setInputType("text");
            setEye("M3.98 6.52a.75.75 0 0 1 1.06 0l12.44 12.44a.75.75 0 1 1-1.06 1.06l-1.93-1.93A10.93 10.93 0 0 1 12 18.75C5.25 18.75 1.5 12 1.5 12s1.54-2.78 4.28-4.73l-1.8-1.8a.75.75 0 0 1 0-1.06zM12 5.25c6.75 0 10.5 6.75 10.5 6.75s-1.25 2.25-3.53 4.03l-2.04-2.04a4.5 4.5 0 0 0-5.92-5.92L8.94 5.97A10.94 10.94 0 0 1 12 5.25zm0 6a3 3 0 0 1 2.91 2.33l-3.74-3.74A3 3 0 0 1 12 11.25z");
        } else {
            setInputType("password");
            setEye("M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z");
        }
    };

    return (
        <div className="bg-white border-gray-200 dark:bg-gray-900">
            <NavbarDisconnected />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

                        <header className="text-center mb-8">
                            <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                                Sign in
                            </h1>
                            <p className="text-slate-300 text-sm mt-1">
                                Access your account with ease
                            </p>
                        </header>

                        <form onSubmit={handleLogin}>
                            <div className="space-y-5">

                                <div>
                                    <label className="block text-sm text-slate-300">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 border border-white/10 px-4 py-3 focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-slate-300">Password</label>
                                    <input
                                        type={inputType}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 border border-white/10 px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={handlePassword}
                                        aria-label="Show / hide password"
                                        className="absolute right-3 top-[38px] inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/10 focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-200">
                                            <path d={eye} />
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-medium text-white hover:bg-indigo-400"
                                >
                                    Sign in
                                </button>

                                {error && (
                                    <p className="text-red-500 text-sm text-center">
                                        {error}
                                    </p>
                                )}

                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-400">
                            Don’t have an account?{" "}
                            <NavLink to="/signup" className="text-indigo-300 hover:text-indigo-200">
                                Sign up
                            </NavLink>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;