import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarDisconnected from '../components/NavbarDisconnected';

function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [inputType, setInputType] = useState("password");
    const [eye, setEye] = useState(
        "M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z"
    );

    const [showPopup, setShowPopup] = useState(false);

    const handleInsert = (event) => {
        event.preventDefault();

        const newLogin = {
            name,
            lastname,
            email,
            password
        };

        axios.post("http://localhost:3000/user", newLogin)
            .then(() => {
                setShowPopup(true);
                setName("");
                setLastname("");
                setEmail("");
                setPassword("");
            })
            .catch((err) => {
                setError(err.message);
            });
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

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

                        <header className="text-center mb-8">
                            <h1 className="text-2xl font-semibold">Sign up</h1>
                        </header>

                        <form onSubmit={handleInsert} className="space-y-5">

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                            />

                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                            />

                            {/* PASSWORD INPUT */}
                            <div className="relative">

                                <input
                                    type={inputType}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10"
                                />

                                {/* OEIL CORRIGÉ */}
                                <button
                                    type="button"
                                    onClick={handlePassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5 text-slate-200"
                                    >
                                        <path d={eye} />
                                    </svg>
                                </button>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-500 py-3 rounded-xl font-medium"
                            >
                                Sign up
                            </button>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                        </form>

                        <p className="mt-6 text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <NavLink to="/signin" className="text-indigo-300">
                                Sign in
                            </NavLink>
                        </p>

                    </div>
                </div>
            </div>

            {/* POPUP */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg">
                        <p>Account created!</p>

                        <button onClick={() => setShowPopup(false)}>
                            Close
                        </button>

                        <button onClick={() => navigate('/signin')}>
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;