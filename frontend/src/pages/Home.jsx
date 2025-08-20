function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="max-w-xl text-center bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to your Finance Tracker! 💰
        </h1>
        <p className="text-gray-600 mb-6">
          Keep track of your incomes and expenses easily. Manage your budget and make smarter financial decisions!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
          Get Started
        </button>
      </div>
      <div className="mt-10 text-gray-400 text-sm">
        Made with ❤️ by your finance tracker
      </div>
    </div>
  );
}

export default Home;
