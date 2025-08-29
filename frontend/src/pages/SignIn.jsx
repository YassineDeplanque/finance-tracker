import { NavLink } from 'react-router-dom';

function SignIn() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
                    <header className="text-center mb-8">
                        <div className="mx-auto h-12 w-12 rounded-2xl bg-white/10 grid place-items-center shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-slate-100">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v2.25H6A2.25 2.25 0 003.75 11.25v7.5A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0018 9H17.25V6.75A5.25 5.25 0 0012 1.5zm3.75 6.75V9H8.25V6.75a3.75 3.75 0 117.5 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Sign in</h1>
                        <p className="text-slate-300 text-sm mt-1">Access your account with ease</p>
                    </header>

                    <form action="#" method="post" className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm text-slate-300">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
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
                                type="password"
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-200">
                                    <path d="M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm text-slate-300 select-none">
                                <input type="checkbox" name="remember" className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-400" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-indigo-300 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded">Forgot password?</a>
                        </div>

                        <button type="submit" className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                            Sign in
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Don’t have an account? 
                        <NavLink
                            className="text-indigo-300 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                            to='/signup'>
                             Sign up
                        </NavLink>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-4">© 2025 Your Company</p>
            </div>
        </div>
    );

}

export default SignIn;