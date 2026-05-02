import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function AdminDashboard() {
  const [data, setData] = useState(null);

  async function getDashboardData() {
    try {
      const res = await fetch("http://localhost:5000/api/reports/dashboard");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  }

  useEffect(() => {
    getDashboardData();

    const interval = setInterval(() => {
      getDashboardData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400">Bugungi savdo statistikasi</p>
        </div>

        <button
          onClick={getDashboardData}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-bold"
        >
          Yangilash
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Bugungi savdo" value={`${data.today.totalSales} so‘m`} />
        <StatCard title="Naqd" value={`${data.today.cashSales} so‘m`} />
        <StatCard title="Karta" value={`${data.today.cardSales} so‘m`} />
        <StatCard title="Orderlar soni" value={data.today.orderCount} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Soatlik savdo grafigi</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.hourlyStats}>
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Soatlik orderlar</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.hourlyStats}>
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="orders" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">
            Eng ko‘p sotilgan mahsulotlar
          </h2>

          {data.popularProducts.length === 0 ? (
            <p className="text-slate-400">Hali mahsulot sotilmadi</p>
          ) : (
            <div className="space-y-3">
              {data.popularProducts.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between bg-slate-800 p-3 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      Soni: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">{item.total} so‘m</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Oxirgi buyurtmalar</h2>

          {data.recentOrders.length === 0 ? (
            <p className="text-slate-400">Hali buyurtma yo‘q</p>
          ) : (
            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-800 p-3 rounded-xl flex justify-between"
                >
                  <div>
                    <p className="font-semibold">Stol: {order.table}</p>
                    <p className="text-sm text-slate-400">
                      To‘lov: {order.paymentType === "cash" ? "Naqd" : "Karta"}
                    </p>
                  </div>

                  <p className="font-bold">{order.total} so‘m</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <p className="text-slate-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default AdminDashboard;