# 💰 Finance Tracker SaaS

A full-stack personal finance tracking application built to help users better manage their income and expenses, visualize their financial habits, and improve long-term financial awareness.

This project was initially built for personal use, but evolved into a complete SaaS-style application designed to also help friends and future users gain better control over their finances.

🚀 The application will soon be publicly available.

---

## ✨ Purpose of the project

The goal of this project is to:

- Track personal income and expenses
- Understand spending habits through data visualization
- Provide a simple and intuitive financial dashboard
- Allow users to report bugs or give feedback directly from the app
- Build a real-world SaaS project for portfolio and career growth

---

## 🧠 Key Features

### 🔐 Authentication System
- Secure user registration and login
- Password hashing using **Argon2**
- Session-based authentication
- Protected routes

### 💸 Income & Expenses Management
- Add, edit, and delete income
- Add, edit, and delete expenses
- Categorization of expenses (Food, Transport, Rent, etc.)
- Date-based tracking

### 📊 Data Visualization
- Interactive charts using **Chart.js**
- Line chart for income vs expenses evolution
- Doughnut chart for expense distribution by category
- Bar chart for financial summary (income vs expenses)

### 📬 Feedback System
- Built-in contact form
- Email sending using **EmailJS**
- Users can report bugs or suggest improvements directly from the app

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Chart.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL
- express-session

### Security
- Argon2 password hashing
- Session authentication

### Services
- EmailJS (contact & feedback system)

---

## 📦 Architecture
Frontend (React)
↓
REST API (Express)
↓
MySQL Database


---

## 📊 Main Dashboard

The dashboard provides a complete overview of personal finances:

- Income vs expenses evolution over time
- Expense breakdown by category
- Total financial summary (income vs expenses)
- Dynamic filtering (month / 3 months / year)

---

## 🚀 Future Improvements

Planned features:

- Budget planning per category
- Recurring transactions
- Export data (CSV / PDF)
- Mobile responsive improvements
- Dark/light mode enhancements
- Deployment on cloud (Vercel / Railway / Render)
- Multi-currency support

---

## 🧪 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/finance-tracker.git
2. Backend setup
cd backend
npm install
Create a .env file:
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
SESSION_SECRET=...
Run backend:
npm run dev
3. Frontend setup
cd frontend
npm install
npm start

👤 Author

Yassine Deplanque

Built as a portfolio project
Focused on full-stack development and SaaS architecture
Goal: evolve into production-ready financial tools
📌 Status

In active development
Soon publicly available
Portfolio project (largest project to date)

⭐ If you like this project

Feel free to star ⭐ the repository and follow my journey as I continue building SaaS products and improving my full-stack engineering skills.
