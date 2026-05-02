import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://mfnwenibbmdllvqvkiof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbndlbmliYm1kbGx2cXZraW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDcyNDYsImV4cCI6MjA5MzMyMzI0Nn0.0CljUd3FaSGBHnWNh1E977zhE6LM54Ex3RPLExKK6Es"
)

const initialTables = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  status: "empty",
}))

const categories = [
  "Hammasi",
  "Lavash",
  "Burger",
  "Doner",
  "Xaggi",
  "Hotdog",
  "KFC",
  "Pizza",
  "Ichimlik",
  "Kombo",
  "Salat",
  "Qo‘shimcha",
]

const products = [
  { id: 1, name: "Lavash mini (mol)", category: "Lavash", price: 20000 },
  { id: 2, name: "Lavash standart (mol)", category: "Lavash", price: 35000 },
  { id: 3, name: "Lavash big (mol)", category: "Lavash", price: 40000 },
  { id: 4, name: "Lavash pishloqli (mol)", category: "Lavash", price: 40000 },
  { id: 5, name: "Lavash tandir (mol)", category: "Lavash", price: 40000 },
  { id: 6, name: "Lavash mini (tovuq)", category: "Lavash", price: 15000 },
  { id: 7, name: "Lavash standart (tovuq)", category: "Lavash", price: 25000 },
  { id: 8, name: "Lavash big (tovuq)", category: "Lavash", price: 30000 },
  { id: 9, name: "Lavash pishloqli (tovuq)", category: "Lavash", price: 35000 },
  { id: 10, name: "Lavash tandir (tovuq)", category: "Lavash", price: 35000 },

  { id: 11, name: "Burger mini (mol)", category: "Burger", price: 17000 },
  { id: 12, name: "Burger standart (mol)", category: "Burger", price: 25000 },
  { id: 13, name: "Burger pishloqli (mol)", category: "Burger", price: 30000 },
  { id: 14, name: "Burger standart (tovuq)", category: "Burger", price: 15000 },
  { id: 15, name: "Burger pishloqli (tovuq)", category: "Burger", price: 20000 },

  { id: 16, name: "Doner standart (mol)", category: "Doner", price: 25000 },
  { id: 17, name: "Doner pishloqli (mol)", category: "Doner", price: 30000 },
  { id: 18, name: "Doner standart (tovuq)", category: "Doner", price: 15000 },
  { id: 19, name: "Doner pishloqli (tovuq)", category: "Doner", price: 20000 },

  { id: 20, name: "Xaggi standart (mol)", category: "Xaggi", price: 30000 },
  { id: 21, name: "Xaggi pishloqli (mol)", category: "Xaggi", price: 35000 },
  { id: 22, name: "Xaggi standart (tovuq)", category: "Xaggi", price: 20000 },
  { id: 23, name: "Xaggi pishloqli (tovuq)", category: "Xaggi", price: 25000 },

  { id: 24, name: "Hotdog 1 dona", category: "Hotdog", price: 12000 },
  { id: 25, name: "Hotdog 2 dona", category: "Hotdog", price: 18000 },
  { id: 26, name: "Hotdog korolevskiy", category: "Hotdog", price: 25000 },

  { id: 27, name: "KFC qanotcha", category: "KFC", price: 20000 },
  { id: 28, name: "KFC file", category: "KFC", price: 20000 },
  { id: 29, name: "KFC oyoqcha", category: "KFC", price: 30000 },

  { id: 30, name: "Pizza margarita mini", category: "Pizza", price: 35000 },
  { id: 31, name: "Pizza margarita big", category: "Pizza", price: 75000 },
  { id: 32, name: "Pizza pepperoni mini", category: "Pizza", price: 40000 },
  { id: 33, name: "Pizza pepperoni big", category: "Pizza", price: 80000 },
  { id: 34, name: "Pizza tovuqli mini", category: "Pizza", price: 40000 },
  { id: 35, name: "Pizza tovuqli big", category: "Pizza", price: 80000 },
  { id: 36, name: "Pizza korolevskiy mini", category: "Pizza", price: 42000 },
  { id: 37, name: "Pizza korolevskiy big", category: "Pizza", price: 85000 },

  { id: 38, name: "Pepsi 0.5L", category: "Ichimlik", price: 8000 },
  { id: 39, name: "Pepsi 1L", category: "Ichimlik", price: 12000 },
  { id: 40, name: "Pepsi 1.5L", category: "Ichimlik", price: 16000 },
  { id: 41, name: "Adrenalin", category: "Ichimlik", price: 17000 },
  { id: 42, name: "Sok 1L", category: "Ichimlik", price: 15000 },
  { id: 43, name: "Choy muzy 0.5L", category: "Ichimlik", price: 5000 },
  { id: 44, name: "Choy muzy 1L", category: "Ichimlik", price: 10000 },
  { id: 45, name: "Mineral suv 0.5L", category: "Ichimlik", price: 3000 },
  { id: 46, name: "Mineral suv 1L", category: "Ichimlik", price: 5000 },
  { id: 47, name: "Choy (bakal)", category: "Ichimlik", price: 2000 },
  { id: 48, name: "Choy limon (bakal)", category: "Ichimlik", price: 5000 },
  { id: 49, name: "Choy (choynak)", category: "Ichimlik", price: 5000 },
  { id: 50, name: "Choy limon (choynak)", category: "Ichimlik", price: 15000 },
  { id: 51, name: "Kofe", category: "Ichimlik", price: 5000 },

  { id: 52, name: "KFC kombo", category: "Kombo", price: 20000 },
  { id: 53, name: "Pizza + KFC kombo", category: "Kombo", price: 20000 },
  { id: 54, name: "Mol go‘shtli kombo", category: "Kombo", price: 25000 },
  { id: 55, name: "Tovuq go‘shtli kombo", category: "Kombo", price: 20000 },

  { id: 56, name: "Longer", category: "Qo‘shimcha", price: 15000 },
  { id: 57, name: "Salat bahor", category: "Salat", price: 25000 },
  { id: 58, name: "Fransuz salat", category: "Salat", price: 25000 },
  { id: 59, name: "Sezar salati", category: "Salat", price: 25000 },
]

function Tables() {
  const [tables, setTables] = useState(initialTables)
  const [orders, setOrders] = useState([])
  const [tableCarts, setTableCarts] = useState({})

  const [report, setReport] = useState({
    totalSales: 0,
    cashSales: 0,
    cardSales: 0,
    orderCount: 0,
  })

  const [selectedTable, setSelectedTable] = useState(null)
  const [activeCategory, setActiveCategory] = useState("Hammasi")
  const [paymentType, setPaymentType] = useState("cash")
  const [backendStatus, setBackendStatus] = useState("Tekshirilmoqda...")

  const cart = selectedTable ? tableCarts[selectedTable] || [] : []

  const getTodayStart = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date.toISOString()
  }

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Supabase order olish xato:", error)
      setBackendStatus("Supabase xatolik ❌")
      return
    }

    setOrders(data || [])
    setBackendStatus("Supabase ulandi ✅")
  }

  const getReport = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", getTodayStart())

    if (error) {
      console.log("Report xato:", error)
      return
    }

    const todayOrders = data || []

    const totalSales = todayOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    )

    const cashSales = todayOrders
      .filter((order) => order.payment_type === "cash")
      .reduce((sum, order) => sum + Number(order.total || 0), 0)

    const cardSales = todayOrders
      .filter((order) => order.payment_type === "card")
      .reduce((sum, order) => sum + Number(order.total || 0), 0)

    setReport({
      totalSales,
      cashSales,
      cardSales,
      orderCount: todayOrders.length,
    })
  }

  useEffect(() => {
    getOrders()
    getReport()

    const interval = setInterval(() => {
      getOrders()
      getReport()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateTableStatus = (tableId, nextCart) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, status: nextCart.length > 0 ? "busy" : "empty" }
          : table
      )
    )
  }

  const filteredProducts =
    activeCategory === "Hammasi"
      ? products
      : products.filter((product) => product.category === activeCategory)

  const addToCart = (product) => {
    if (!selectedTable) {
      alert("Avval stol tanlang")
      return
    }

    const oldCart = tableCarts[selectedTable] || []
    const exist = oldCart.find((item) => item.id === product.id)

    let newCart

    if (exist) {
      newCart = oldCart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
    } else {
      newCart = [...oldCart, { ...product, qty: 1 }]
    }

    setTableCarts({ ...tableCarts, [selectedTable]: newCart })
    updateTableStatus(selectedTable, newCart)
  }

  const decreaseQty = (id) => {
    const oldCart = tableCarts[selectedTable] || []

    const newCart = oldCart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0)

    setTableCarts({ ...tableCarts, [selectedTable]: newCart })
    updateTableStatus(selectedTable, newCart)
  }

  const increaseQty = (id) => {
    const oldCart = tableCarts[selectedTable] || []

    const newCart = oldCart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )

    setTableCarts({ ...tableCarts, [selectedTable]: newCart })
    updateTableStatus(selectedTable, newCart)
  }

  const cancelItem = (id) => {
    const oldCart = tableCarts[selectedTable] || []
    const newCart = oldCart.filter((item) => item.id !== id)

    setTableCarts({ ...tableCarts, [selectedTable]: newCart })
    updateTableStatus(selectedTable, newCart)
  }

  const clearTableOrder = () => {
    const confirmClear = confirm("Bu stol zakazini to‘liq bekor qilasizmi?")
    if (!confirmClear) return

    setTableCarts({ ...tableCarts, [selectedTable]: [] })
    updateTableStatus(selectedTable, [])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const payOrder = async () => {
    if (!selectedTable) {
      alert("Avval stol tanlang")
      return
    }

    if (cart.length === 0) {
      alert("Avval mahsulot tanlang")
      return
    }

    const orderData = {
      table_number: String(selectedTable),
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
      })),
      total,
      payment_type: paymentType,
    }

    const { error } = await supabase.from("orders").insert([orderData])

    if (error) {
      console.log("Order saqlash xato:", error)
      alert("Order saqlanmadi ❌ Supabase RLS yoki table xato")
      return
    }

    setTableCarts({ ...tableCarts, [selectedTable]: [] })
    updateTableStatus(selectedTable, [])
    setSelectedTable(null)
    setPaymentType("cash")

    await getOrders()
    await getReport()

    alert("Order Supabase ga saqlandi ✅")
  }

  const clearLocal = () => {
    setTables(initialTables)
    setTableCarts({})
  }

  if (selectedTable) {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-3 py-3 sm:px-4 md:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
          <button
            onClick={() => setSelectedTable(null)}
            className="w-full sm:w-auto bg-gray-800 px-4 py-3 rounded-xl hover:bg-gray-700 font-semibold"
          >
            ← Stollarga qaytish
          </button>

          <button
            onClick={clearTableOrder}
            className="w-full sm:w-auto bg-red-600 px-4 py-3 rounded-xl hover:bg-red-500 font-bold"
          >
            Stol zakazini tozalash
          </button>
        </div>

        <div className="mb-4 text-sm text-green-400">{backendStatus}</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-4 lg:gap-5">
          <main>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Stol {selectedTable} — Menu
            </h1>

            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Zakaz to‘lov bo‘lguncha shu stolda saqlanib turadi
            </p>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-3 rounded-xl font-bold text-sm md:text-base ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-900 border border-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5 md:gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4 text-left active:scale-95 hover:bg-gray-800 transition min-h-[118px] md:min-h-[135px]"
                >
                  <h2 className="text-sm md:text-base font-bold leading-snug">
                    {product.name}
                  </h2>

                  <p className="text-[11px] md:text-xs text-gray-400 mt-2">
                    {product.category}
                  </p>

                  <p className="text-yellow-400 mt-3 font-bold text-sm md:text-base">
                    {product.price.toLocaleString()} so‘m
                  </p>
                </button>
              ))}
            </div>
          </main>

          <aside className="bg-gray-900 rounded-2xl p-4 border border-gray-800 h-fit lg:sticky lg:top-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Stol {selectedTable} zakazi
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Hali mahsulot tanlanmadi</p>
            ) : (
              <div className="space-y-3">
                <div className="max-h-[45vh] lg:max-h-[55vh] overflow-y-auto pr-1 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-800 rounded-xl p-3">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {item.price.toLocaleString()} so‘m
                          </p>
                        </div>

                        <p className="font-bold text-right text-sm">
                          {(item.price * item.qty).toLocaleString()} so‘m
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-red-500 w-10 h-10 rounded-lg font-bold text-lg"
                        >
                          -
                        </button>

                        <span className="font-bold text-lg min-w-6 text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-green-500 text-black w-10 h-10 rounded-lg font-bold text-lg"
                        >
                          +
                        </button>

                        <button
                          onClick={() => cancelItem(item.id)}
                          className="ml-auto bg-red-700 px-3 py-3 rounded-lg font-bold hover:bg-red-600 text-sm"
                        >
                          Atmen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4 space-y-4">
                  <div>
                    <p className="text-gray-400 mb-2">To‘lov turi</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentType("cash")}
                        className={`py-3 rounded-xl font-bold ${
                          paymentType === "cash"
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-800"
                        }`}
                      >
                        Naqd
                      </button>

                      <button
                        onClick={() => setPaymentType("card")}
                        className={`py-3 rounded-xl font-bold ${
                          paymentType === "card"
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-800"
                        }`}
                      >
                        Karta
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg md:text-xl font-bold">
                    <span>Jami:</span>
                    <span>{total.toLocaleString()} so‘m</span>
                  </div>

                  <button
                    onClick={payOrder}
                    className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-green-400 text-lg"
                  >
                    To‘landi
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-3 py-3 sm:px-4 md:px-5 lg:px-6">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">FastFood POS</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Stol tanlang va buyurtma oling
          </p>

          <p className="text-sm mt-2 text-green-400">{backendStatus}</p>

          <button
            onClick={clearLocal}
            className="mt-3 bg-red-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-400 text-sm"
          >
            Ekranni tozalash
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full xl:w-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Bugungi savdo</p>
            <h2 className="text-lg md:text-2xl font-bold text-green-400">
              {report.totalSales.toLocaleString()} so‘m
            </h2>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Naqd</p>
            <h2 className="text-lg md:text-2xl font-bold text-yellow-400">
              {report.cashSales.toLocaleString()} so‘m
            </h2>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Karta</p>
            <h2 className="text-lg md:text-2xl font-bold text-blue-400">
              {report.cardSales.toLocaleString()} so‘m
            </h2>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Buyurtmalar</p>
            <h2 className="text-lg md:text-2xl font-bold text-white">
              {report.orderCount} ta
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-3 mb-6">
        {tables.map((table) => {
          const tableCart = tableCarts[table.id] || []
          const tableTotal = tableCart.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          )

          return (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`p-3 md:p-5 rounded-2xl text-center cursor-pointer transition text-black active:scale-95 min-h-[95px] md:min-h-[120px] ${
                table.status === "empty"
                  ? "bg-green-500 hover:bg-green-400"
                  : "bg-red-500 hover:bg-red-400"
              }`}
            >
              <h2 className="text-lg md:text-2xl font-bold">Stol {table.id}</h2>

              <p className="mt-1 md:mt-2 font-semibold text-xs md:text-base">
                {table.status === "empty" ? "Bo‘sh" : "Band"}
              </p>

              {tableCart.length > 0 && (
                <p className="mt-1 md:mt-2 font-bold text-xs md:text-sm">
                  {tableTotal.toLocaleString()} so‘m
                </p>
              )}
            </button>
          )
        })}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Oxirgi buyurtmalar
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-400">Hali buyurtma yo‘q</p>
        ) : (
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between gap-4 bg-gray-800 rounded-xl p-3 md:p-4"
              >
                <div>
                  <h3 className="font-bold">Stol {order.table_number}</h3>

                  <p className="text-xs md:text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleString("uz-UZ")}
                  </p>

                  <p className="text-xs md:text-sm text-yellow-400">
                    {order.payment_type === "cash" ? "Naqd" : "Karta"}
                  </p>
                </div>

                <p className="font-bold text-green-400 text-sm md:text-base">
                  {Number(order.total).toLocaleString()} so‘m
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tables