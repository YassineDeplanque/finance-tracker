import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarDisconnected from '../components/NavbarDisconnected';

function SignIn() {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastname, setLastame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [inputType, setInputType] = useState("password");
    const [eye, setEye] = useState("M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z");

    const [showPopup, setShowPopup] = useState(false);

    const handleInsert = (event) => {
        event.preventDefault();
        const newLogin = { name: name, lastname: lastname, email: email, password: password };
        axios.post("http://localhost:3000/user", newLogin)
            .then((res) => {
                setShowPopup(true)
                setName("")
                setLastame("")
                setEmail("");
                setPassword("");
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    const handlePassword = () => {
        if (inputType == "password") {
            setInputType('text');
            setEye("M3.98 6.52a.75.75 0 0 1 1.06 0l12.44 12.44a.75.75 0 1 1-1.06 1.06l-1.93-1.93A10.93 10.93 0 0 1 12 18.75C5.25 18.75 1.5 12 1.5 12s1.54-2.78 4.28-4.73l-1.8-1.8a.75.75 0 0 1 0-1.06zM12 5.25c6.75 0 10.5 6.75 10.5 6.75s-1.25 2.25-3.53 4.03l-2.04-2.04a4.5 4.5 0 0 0-5.92-5.92L8.94 5.97A10.94 10.94 0 0 1 12 5.25zm0 6a3 3 0 0 1 2.91 2.33l-3.74-3.74A3 3 0 0 1 12 11.25z");
        } else {
            setInputType("password");
            setEye("M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z");
        }
    }

    return (
        <div className="bg-white border-gray-200 dark:bg-gray-900">
            <NavbarDisconnected />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                        <header className="text-center mb-8">
                            <div className="mx-auto h-12 w-12 rounded-2xl bg-white/10 grid place-items-center shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-slate-100">
                                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v2.25H6A2.25 2.25 0 003.75 11.25v7.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0018 9H17.25V6.75A5.25 5.25 0 0012 1.5zm3.75 6.75V9H8.25V6.75a3.75 3.75 0 117.5 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="mt-4 text-2xl font-semibold tracking-tight">Sign up</h1>
                            <p className="text-slate-300 text-sm mt-1">Create your account with ease</p>
                        </header>
                        <form onSubmit={handleInsert}>
                            <div action="#" method="post" className="space-y-5">
                                <div>
                                    <label className="block text-sm text-slate-300">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Name"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 placeholder-slate-400 border border-white/10 px-4 py-3 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ring-offset-1 ring-offset-slate-900"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm text-slate-300">Last name</label>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastame(e.target.value)}
                                        required
                                        autoComplete="lastname"
                                        placeholder="Last name"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 placeholder-slate-400 border border-white/10 px-4 py-3 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ring-offset-1 ring-offset-slate-900"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm text-slate-300">Email address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 placeholder-slate-400 border border-white/10 px-4 py-3 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ring-offset-1 ring-offset-slate-900"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm text-slate-300">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type={inputType}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="mt-1 w-full rounded-xl bg-white/5 text-slate-100 placeholder-slate-400 border border-white/10 px-4 py-3 pr-12 shadow-inner outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ring-offset-1 ring-offset-slate-900"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Show / hide password"
                                        className="absolute right-3 top-[38px] inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-200" onClick={handlePassword}>
                                            <path d={eye} />
                                        </svg>
                                    </button>
                                </div>
                                <button type="submit" className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-400">
                            Already have an account ?
                            <NavLink
                                className="text-indigo-300 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                                to='/signin'>
                                - Sign in
                            </NavLink>
                        </p>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-4">© 2025 Yassine Deplanque</p>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Notification</h2>
                        <p>Account created!</p>

                        <div className="mt-4 flex gap-4 justify-center">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => navigate('/signin')}
                                className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );

}

export default SignIn;