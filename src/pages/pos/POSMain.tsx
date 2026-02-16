import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Minus,
  Plus,
  Trash2,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  ShoppingCart,
  Tag,
  Zap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
}

const mockProducts = [
  { id: "1", name: "Arroz Extra 5kg", price: 22.50, sku: "ARR-001", category: "Abarrotes", stock: 120 },
  { id: "2", name: "Aceite Vegetal 1L", price: 8.90, sku: "ACE-001", category: "Abarrotes", stock: 3 },
  { id: "3", name: "Azúcar Rubia 1kg", price: 4.50, sku: "AZU-001", category: "Abarrotes", stock: 85 },
  { id: "4", name: "Leche Gloria 400ml", price: 4.20, sku: "LEC-001", category: "Lácteos", stock: 200 },
  { id: "5", name: "Atún Filete 170g", price: 6.80, sku: "ATU-001", category: "Conservas", stock: 45 },
  { id: "6", name: "Fideos Spaghetti 500g", price: 3.50, sku: "FID-001", category: "Abarrotes", stock: 90 },
  { id: "7", name: "Harina Preparada 1kg", price: 5.20, sku: "HAR-001", category: "Abarrotes", stock: 60 },
  { id: "8", name: "Jabón Bolívar 230g", price: 3.80, sku: "JAB-001", category: "Limpieza", stock: 150 },
  { id: "9", name: "Detergente Ace 500g", price: 7.50, sku: "DET-001", category: "Limpieza", stock: 75 },
  { id: "10", name: "Café Altomayo 85g", price: 12.90, sku: "CAF-001", category: "Bebidas", stock: 35 },
  { id: "11", name: "Agua San Luis 2.5L", price: 3.00, sku: "AGU-001", category: "Bebidas", stock: 180 },
  { id: "12", name: "Galletas Margarita", price: 1.50, sku: "GAL-001", category: "Snacks", stock: 250 },
];

const categories = ["Todos", "Abarrotes", "Lácteos", "Conservas", "Limpieza", "Bebidas", "Snacks"];

export default function POSMain() {
  const navigate = useNavigate();
  const { company } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [cashReceived, setCashReceived] = useState("");

  const filteredProducts = mockProducts.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "Todos" && p.category !== category) return false;
    return true;
  });

  const addToCart = (product: typeof mockProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, discount: 0 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty - i.discount, 0);
  const igv = subtotal * 0.18;
  const total = subtotal;

  const change = cashReceived ? parseFloat(cashReceived) - total : 0;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* POS Header */}
      <header className="h-12 bg-sidebar flex items-center px-4 gap-4 flex-shrink-0">
        <button onClick={() => navigate("/")} className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sidebar-foreground font-semibold text-sm">POS</span>
        </div>
        <span className="text-sidebar-foreground/50 text-xs">|</span>
        <span className="text-sidebar-foreground/70 text-xs">{company?.razon_social}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sidebar-foreground/50 text-xs">Caja: POS-01</span>
          <span className="text-success text-xs font-medium">● Abierta</span>
        </div>
      </header>

      {/* Main POS Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Products Panel */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar producto, SKU o escanear código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-md bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-3 overflow-x-auto flex-shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 content-start">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-card border border-border rounded-lg p-3 text-left hover:border-primary hover:shadow-sm transition-all group"
              >
                <p className="text-sm font-medium text-foreground group-hover:text-primary truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.sku}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-foreground">S/ {p.price.toFixed(2)}</span>
                  <span className={`text-xs ${p.stock <= 5 ? "text-destructive" : "text-muted-foreground"}`}>
                    Stock: {p.stock}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-80 lg:w-96 bg-card border-l border-border flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-border flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-sm text-foreground">Ticket de Venta</span>
            <span className="ml-auto text-xs text-muted-foreground">{cart.length} ítem(s)</span>
          </div>

          {/* Client */}
          <div className="p-3 border-b border-border">
            <button className="flex items-center gap-2 w-full p-2 rounded-md bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" />
              <span>Varios Clientes</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">Carrito vacío</p>
                <p className="text-xs">Seleccione productos para agregar</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">S/ {item.price.toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-foreground">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-foreground w-16 text-right">
                    S/ {(item.price * item.qty).toFixed(2)}
                  </span>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-border p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">S/ {(subtotal / 1.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IGV (18%)</span>
              <span className="text-foreground">S/ {(subtotal - subtotal / 1.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
              <span className="text-foreground">Total</span>
              <span className="text-primary">S/ {total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 flex items-center justify-center gap-2 h-9 rounded-md bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Tag className="w-4 h-4" /> Descuento
              </button>
              <button
                onClick={() => cart.length > 0 && setShowPayment(true)}
                disabled={cart.length === 0}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-success text-success-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <CreditCard className="w-4 h-4" /> Cobrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Cobrar Venta</h2>
              <button onClick={() => setShowPayment(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">Total a cobrar</p>
                <p className="text-3xl font-bold text-primary">S/ {total.toFixed(2)}</p>
              </div>

              {/* Document type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tipo de comprobante</label>
                <div className="flex gap-2">
                  <button className="flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium">Boleta</button>
                  <button className="flex-1 h-9 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Factura</button>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Método de pago</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "cash", label: "Efectivo", icon: Banknote },
                    { key: "card", label: "Tarjeta", icon: CreditCard },
                    { key: "yape", label: "Yape/Plin", icon: Smartphone },
                    { key: "credit", label: "Crédito", icon: User },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setPaymentMethod(m.key)}
                      className={`flex items-center gap-2 p-2.5 rounded-md border text-sm font-medium transition-colors ${
                        paymentMethod === m.key
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                      }`}
                    >
                      <m.icon className="w-4 h-4" /> {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "cash" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Monto recibido</label>
                  <input
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {parseFloat(cashReceived) >= total && (
                    <p className="text-sm mt-1 font-semibold text-success">
                      Vuelto: S/ {change.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  setShowPayment(false);
                  setCart([]);
                  setCashReceived("");
                  // POST /api/pos/orders { items, payment, document_type }
                }}
                className="w-full h-11 bg-success text-success-foreground rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Confirmar Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
