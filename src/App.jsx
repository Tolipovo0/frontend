import { useState } from "react"
import Tables from "./components/Tables"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  const [page, setPage] = useState("pos")

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">POS System</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setPage("pos")}
            className={`px-5 py-3 rounded-xl font-bold ${
              page === "pos" ? "bg-blue-600" : "bg-gray-800"
            }`}
          >
            POS
          </button>

          <button
            onClick={() => setPage("admin")}
            className={`px-5 py-3 rounded-xl font-bold ${
              page === "admin" ? "bg-orange-500" : "bg-gray-800"
            }`}
          >
            Admin
          </button>
        </div>
      </header>

      {page === "pos" ? <Tables /> : <AdminDashboard />}
    </div>
  )
}

export default App