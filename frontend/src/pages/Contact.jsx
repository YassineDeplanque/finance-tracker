import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
//npm install --save @emailjs/browser

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function Contact() {

  const form = useRef();

  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setShowPopup(true)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

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

          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
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
      {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Notification</h2>
                        <p>Email sent !</p>

                        <div className="mt-4 flex gap-4 justify-center">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            )}
    </div>
    
  );
}

export default Contact;
