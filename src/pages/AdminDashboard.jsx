import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://mfnwenibbmdllvqvkiof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbndlbmliYm1kbGx2cXZraW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDcyNDYsImV4cCI6MjA5MzMyMzI0Nn0.0CljUd3FaSGBHnWNh1E977zhE6LM54Ex3RPLExKK6Es"
  )
  function isCash(order) {
  return (
    order.payment_type === "cash" ||
    order.payment_type === "Naqd" ||
    order.payment === "cash" ||
    order.payment === "Naqd"
  )
}

function isCard(order) {
  return (
    order.payment_type === "card" ||
    order.payment_type === "Karta" ||
    order.payment === "card" ||
    order.payment === "Karta"
  )
}

function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [reports, setReports] = useState([])
  const [productStats, setProductStats] = useState([])
  const [stats, setStats] = useState({
    totalSales: 0,
    cashSales: 0,
    cardSales: 0,
    orderCount: 0,
  })

  const getBusinessDayStart = async () => {
    const { data, error } = await supabase
      .from("app_settings")
      .select("*")
      .eq("key", "business_day_start")
      .maybeSingle()

    if (!error && data?.value?.date) {
      return data.value.date
    }

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const start = todayStart.toISOString()
    const now = new Date().toISOString()

    await supabase.from("app_settings").upsert({
      key: "business_day_start",
      value: { date: start },
      updated_at: now,
    })

    return start
  }

  const loadData = async () => {
    const start = await getBusinessDayStart()

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", start)
      .order("created_at", { ascending: false })

    if (orderError) {
      console.log("Admin order olish xato:", orderError)
      return
    }

    const list = orderData || []
    setOrders(list)

    const totalSales = list.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    )

    const cashSales = list
      .filter((order) => isCash(order))
      .reduce((sum, order) => sum + Number(order.total || 0), 0)

    const cardSales = list
      .filter((order) => isCard(order))
      .reduce((sum, order) => sum + Number(order.total || 0), 0)

    setStats({
      totalSales,
      cashSales,
      cardSales,
      orderCount: list.length,
    })

    const productMap = {}

    list.forEach((order) => {
      const items = Array.isArray(order.items) ? order.items : []

      items.forEach((item) => {
        const name = item.name || "Nomsiz mahsulot"
        const quantity = Number(item.quantity || item.qty || 1)
        const price = Number(item.price || 0)

        if (!productMap[name]) {
          productMap[name] = {
            name,
            quantity: 0,
            total: 0,
          }
        }

        productMap[name].quantity += quantity
        productMap[name].total += price * quantity
      })
    })

    setProductStats(
      Object.values(productMap).sort((a, b) => b.quantity - a.quantity)
    )

    const { data: reportData, error: reportError } = await supabase
      .from("day_reports")
      .select("*")
      .order("closed_at", { ascending: false })

    if (reportError) {
      console.log("History olish xato:", reportError)
      return
    }

    setReports(reportData || [])
  }

  useEffect(() => {
    loadData()

    const timer = setInterval(() => {
      loadData()
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard
          title="Bugungi savdo"
          value={`${stats.totalSales.toLocaleString()} so‘m`}
          color="text-green-400"
        />

        <StatCard
          title="Naqd"
          value={`${stats.cashSales.toLocaleString()} so‘m`}
          color="text-yellow-400"
        />

        <StatCard
          title="Karta"
          value={`${stats.cardSales.toLocaleString()} so‘m`}
          color="text-blue-400"
        />

        <StatCard
          title="Buyurtmalar"
          value={`${stats.orderCount} ta`}
          color="text-white"
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">Bugun sotilgan mahsulotlar</h2>

        {productStats.length === 0 ? (
          <p className="text-gray-400">Bugun hali savdo yo‘q</p>
        ) : (
          <div className="space-y-3">
            {productStats.map((item) => (
              <div
                key={item.name}
                className="bg-gray-800 rounded-xl p-4 flex justify-between gap-3"
              >
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    Soni: {item.quantity} ta
                  </p>
                </div>

                <p className="font-bold text-green-400">
                  {item.total.toLocaleString()} so‘m
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">Bugungi orderlar</h2>

        {orders.length === 0 ? (
          <p className="text-gray-400">Hozircha order yo‘q</p>
        ) : (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-xl p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-bold">Stol {order.table_number}</h3>

                    <p className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleString("uz-UZ")}
                    </p>

                    <p className="text-yellow-400">
                      {isCash(order) ? "Naqd" : "Karta"}
                    </p>
                  </div>

                  <p className="font-bold text-green-400">
                    {Number(order.total || 0).toLocaleString()} so‘m
                  </p>
                </div>

                <div className="mt-3 text-sm text-gray-300">
                  {(Array.isArray(order.items) ? order.items : []).map(
                    (item, index) => (
                      <p key={index}>
                        {item.name} × {item.quantity || item.qty || 1} ta
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
        <h2 className="text-2xl font-bold mb-4">History — yopilgan kunlar</h2>

        {reports.length === 0 ? (
          <p className="text-gray-400">Hali yopilgan kun yo‘q</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {reports.map((report) => (
              <div key={report.id} className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-yellow-400 font-bold">{report.title}</h3>

                <p className="text-sm text-gray-400 mb-2">
                  Yopilgan:{" "}
                  {new Date(report.closed_at).toLocaleString("uz-UZ")}
                </p>

                <p>
                  Jami: {Number(report.total_sales || 0).toLocaleString()} so‘m
                </p>
                <p>
                  Naqd: {Number(report.cash_sales || 0).toLocaleString()} so‘m
                </p>
                <p>
                  Karta: {Number(report.card_sales || 0).toLocaleString()} so‘m
                </p>
                <p>Order: {report.order_count || 0} ta</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  )
}

export default AdminDashboard