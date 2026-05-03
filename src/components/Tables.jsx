import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://mfnwenibbmdllvqvkiof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbndlbmliYm1kbGx2cXZraW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDcyNDYsImV4cCI6MjA5MzMyMzI0Nn0.0CljUd3FaSGBHnWNh1E977zhE6LM54Ex3RPLExKK6Es"
)

const categories = [
  "Hammasi",
  "Marojniy",
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
  { id: 1001, name: "Nonli marojniy", category: "Marojniy", price: 5000 },
  { id: 1002, name: "Marojniy nonli", category: "Marojniy", price: 8000 },
  { id: 1003, name: "Idish marojniy", category: "Marojniy", price: 6000 },
  { id: 1004, name: "Idish marojniy katta", category: "Marojniy", price: 10000 },
  { id: 1005, name: "Marojniy 500gr", category: "Marojniy", price: 30000 },
  { id: 1006, name: "Marojniy 1kg", category: "Marojniy", price: 60000 },

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

function Tables() {
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState("Hammasi")
  const [paymentType, setPaymentType] = useState("cash")
  const [backendStatus, setBackendStatus] = useState("Tekshirilmoqda...")

  const [report, setReport] = useState({
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

    const now = new Date().toISOString()

    await supabase.from("app_settings").upsert(
      {
        key: "business_day_start",
        value: { date: now },
        updated_at: now,
      },
      { onConflict: "key" }
    )

    return now
  }

  const makeReportTitle = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const year = d.getFullYear()
    return `${day}.${month}.${year} hisoboti`
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
    const start = await getBusinessDayStart()

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", start)

    if (error) {
      console.log("Report xato:", error)
      return
    }

    const list = data || []

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

    setReport({
      totalSales,
      cashSales,
      cardSales,
      orderCount: list.length,
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

  const filteredProducts =
    activeCategory === "Hammasi"
      ? products
      : products.filter((product) => product.category === activeCategory)

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id)

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (id) => {
    const newCart = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0)

    setCart(newCart)
  }

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const cancelItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    const ok = confirm("Hozirgi zakazni tozalaysizmi?")
    if (!ok) return
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const closeDay = async () => {
    if (cart.length > 0) {
      alert("Avval hozirgi zakazni to‘lang yoki tozalang ❌")
      return
    }

    const ok = confirm(
      "Kunni yopasizmi? Hisobot history ga saqlanadi va joriy hisob 0 ga tushadi."
    )

    if (!ok) return

    const openedAt = await getBusinessDayStart()

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", openedAt)

    if (error) {
      console.log("Kun yopish order olish xato:", error)
      alert("Orderlarni olishda xatolik ❌")
      return
    }

    const list = data || []

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

    const closedAt = new Date().toISOString()

    const { error: saveError } = await supabase.from("day_reports").insert([
      {
        title: makeReportTitle(openedAt),
        opened_at: openedAt,
        closed_at: closedAt,
        total_sales: totalSales,
        cash_sales: cashSales,
        card_sales: cardSales,
        order_count: list.length,
        orders: list,
      },
    ])

    if (saveError) {
      console.log("Hisobot saqlash xato:", saveError)
      alert("Hisobot saqlanmadi ❌ day_reports table yoki RLS policy tekshir")
      return
    }

    const { error: settingError } = await supabase.from("app_settings").upsert(
      {
        key: "business_day_start",
        value: { date: closedAt },
        updated_at: closedAt,
      },
      { onConflict: "key" }
    )

    if (settingError) {
      console.log("Setting yangilash xato:", settingError)
      alert("Kun yopildi, lekin yangi kun starti saqlanmadi ❌")
      return
    }

    await getOrders()
    await getReport()

    alert("Kun yopildi ✅ Yangi savdo 0 dan boshlandi")
  }

  const payOrder = async () => {
    if (cart.length === 0) {
      alert("Avval mahsulot tanlang")
      return
    }

    const orderData = {
      table_number: "Menu",
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

    setCart([])
    setPaymentType("cash")

    await getOrders()
    await getReport()

    alert("Order Supabase ga saqlandi ✅")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-3 py-3 sm:px-4 md:px-5 lg:px-6">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">FastFood POS</h1>

          <p className="text-gray-400 text-sm md:text-base">
            Menu tanlang va buyurtma oling
          </p>

          <p className="text-sm mt-2 text-green-400">{backendStatus}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-400 text-sm"
            >
              Zakazni tozalash
            </button>

            <button
              onClick={closeDay}
              className="bg-yellow-400 text-black px-4 py-3 rounded-xl font-bold hover:bg-yellow-300 text-sm"
            >
              Kunni yopish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full xl:w-auto">
          <StatCard
            title="Joriy hisob"
            value={`${report.totalSales.toLocaleString()} so‘m`}
            color="text-green-400"
          />

          <StatCard
            title="Naqd"
            value={`${report.cashSales.toLocaleString()} so‘m`}
            color="text-yellow-400"
          />

          <StatCard
            title="Karta"
            value={`${report.cardSales.toLocaleString()} so‘m`}
            color="text-blue-400"
          />

          <StatCard
            title="Buyurtmalar"
            value={`${report.orderCount} ta`}
            color="text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-4 lg:gap-5">
        <main>
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

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mt-6">
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
                      <h3 className="font-bold">Buyurtma</h3>

                      <p className="text-xs md:text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleString("uz-UZ")}
                      </p>

                      <p className="text-xs md:text-sm text-yellow-400">
                        {isCash(order) ? "Naqd" : "Karta"}
                      </p>
                    </div>

                    <p className="font-bold text-green-400 text-sm md:text-base">
                      {Number(order.total || 0).toLocaleString()} so‘m
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="bg-gray-900 rounded-2xl p-4 border border-gray-800 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Hozirgi zakaz
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-400">Hali mahsulot tanlanmadi</p>
          ) : (
            <div className="space-y-3">
              <div className="max-h-[50vh] lg:max-h-[58vh] overflow-y-auto pr-1 space-y-3">
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

function StatCard({ title, value, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 md:p-4">
      <p className="text-gray-400 text-xs md:text-sm">{title}</p>
      <h2 className={`text-lg md:text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  )
}

export default Tables