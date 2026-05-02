import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tables from "./components/Tables";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white">

        {/* TOP NAV */}
        <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800">
          <h1 className="font-bold text-xl">POS System</h1>

          <div className="flex gap-3">
            <Link
              to="/"
              className="bg-blue-500 px-4 py-2 rounded-lg font-semibold"
            >
              POS
            </Link>

            <Link
              to="/admin"
              className="bg-orange-500 px-4 py-2 rounded-lg font-semibold"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;