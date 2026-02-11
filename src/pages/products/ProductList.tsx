import { useState } from "react";
import { Plus, Search, Package, Edit, Eye } from "lucide-react";

// GET /api/products?page=1&per_page=20&search=&category=&active=
const mockProducts = [
  { id: "1", name: "Arroz Extra 5kg", sku: "ARR-001", category: "Abarrotes", stock: 120, price: 22.50, active: true },
  { id: "2", name: "Aceite Vegetal 1L", sku: "ACE-001", category: "Abarrotes", stock: 3, price: 8.90, active: true },
  { id: "3", name: "Azúcar Rubia 1kg", sku: "AZU-001", category: "Abarrotes", stock: 85, price: 4.50, active: true },
  { id: "4", name: "Leche Gloria 400ml", sku: "LEC-001", category: "Lácteos", stock: 200, price: 4.20, active: true },
  { id: "5", name: "Atún Filete 170g", sku: "ATU-001", category: "Conservas", stock: 45, price: 6.80, active: true },
  { id: "6", name: "Fideos Spaghetti 500g", sku: "FID-001", category: "Abarrotes", stock: 90, price: 3.50, active: true },
  { id: "7", name: "Harina Preparada 1kg", sku: "HAR-001", category: "Abarrotes", stock: 0, price: 5.20, active: false },
  { id: "8", name: "Jabón Bolívar 230g", sku: "JAB-001", category: "Limpieza", stock: 150, price: 3.80, active: true },
  { id: "9", name: "Detergente Ace 500g", sku: "DET-001", category: "Limpieza", stock: 75, price: 7.50, active: true },
  { id: "10", name: "Café Altomayo 85g", sku: "CAF-001", category: "Bebidas", stock: 35, price: 12.90, active: true },
];

export default function ProductList() {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Productos</h1>
          <p className="text-sm text-muted-foreground">Catálogo de productos y servicios</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Nuevo Producto
        </button>
      </div>

      <div className="flex gap-3 items-center bg-card p-3 rounded-lg border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-md bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Producto</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">SKU</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Categoría</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Stock</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Precio</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Estado</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${p.stock <= 5 ? "text-destructive" : "text-foreground"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    S/ {p.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {p.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">{filtered.length} productos</p>
        </div>
      </div>
    </div>
  );
}
