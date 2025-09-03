import { useState } from "react";

function Contact() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Got an idea or found a bug ?
            </h1>
            <p className="text-slate-300 text-sm mt-2">
              I’d love to hear from you ! Share your feedback, feature requests, or just say hi.
            </p>
          </header>

          <form className="flex flex-col gap-4">
            <textarea
              name="message"
              placeholder="Your message..."
              rows="5"
              required
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              Send Message
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">© 2025 Yassine Deplanque</p>
      </div>
    </div>
  );
}

export default Contact;
