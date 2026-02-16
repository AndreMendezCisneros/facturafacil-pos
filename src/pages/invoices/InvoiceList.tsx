import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Send,
  FileDown,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// GET /api/invoices?page=1&per_page=20&type=&status=&date_from=&date_to=&client=
const mockInvoices = [
  { id: "1", type: "01", serie: "F001", number: "00342", date: "2025-02-10", client: "Alicorp SAC", ruc: "20100055237", total: 5900.00, status: "accepted", sunat: "Aceptado" },
  { id: "2", type: "01", serie: "F001", number: "00343", date: "2025-02-10", client: "Gloria SA", ruc: "20100190797", total: 12300.50, status: "sent_to_sunat", sunat: "En proceso" },
  { id: "3", type: "03", serie: "B001", number: "01198", date: "2025-02-10", client: "Varios Clientes", ruc: "00000000", total: 85.00, status: "accepted", sunat: "Aceptado" },
  { id: "4", type: "01", serie: "F001", number: "00344", date: "2025-02-10", client: "Cementos Pacasmayo SAA", ruc: "20419387658", total: 23400.00, status: "rejected", sunat: "Rechazado" },
  { id: "5", type: "07", serie: "FC01", number: "00089", date: "2025-02-09", client: "Alicorp SAC", ruc: "20100055237", total: -1200.00, status: "accepted", sunat: "Aceptado" },
  { id: "6", type: "03", serie: "B001", number: "01199", date: "2025-02-09", client: "María López", ruc: "10456789012", total: 320.00, status: "draft", sunat: "-" },
  { id: "7", type: "01", serie: "F001", number: "00345", date: "2025-02-09", client: "Backus SAB", ruc: "20100113610", total: 8750.00, status: "rejected", sunat: "Rechazado" },
  { id: "8", type: "09", serie: "T001", number: "00015", date: "2025-02-09", client: "Alicorp SAC", ruc: "20100055237", total: 0, status: "accepted", sunat: "Aceptado" },
];

const typeLabels: Record<string, string> = { "01": "Factura", "03": "Boleta", "07": "Nota Crédito", "08": "Nota Débito", "09": "GRE" };
const statusVariants: Record<string, string> = {
  draft: "bg-secondary text-secondary-foreground",
  validated: "bg-info/10 text-info",
  sent_to_sunat: "bg-warning/10 text-warning",
  accepted: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
};
const statusLabels: Record<string, string> = {
  draft: "Borrador",
  validated: "Validado",
  sent_to_sunat: "Enviado",
  accepted: "Aceptado",
  rejected: "Rechazado",
  cancelled: "Anulado",
};

export default function InvoiceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = mockInvoices.filter((inv) => {
    if (search && !inv.client.toLowerCase().includes(search.toLowerCase()) && !`${inv.serie}-${inv.number}`.includes(search)) return false;
    if (typeFilter && inv.type !== typeFilter) return false;
    if (statusFilter && inv.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comprobantes</h1>
          <p className="text-sm text-muted-foreground">Gestión de facturación electrónica</p>
        </div>
        <button
          onClick={() => navigate("/invoices/new")}
          className="flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Nuevo Comprobante
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-card p-3 rounded-lg border border-border">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por serie, número o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-md bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-9 px-3 rounded-md bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos los tipos</option>
          <option value="01">Factura</option>
          <option value="03">Boleta</option>
          <option value="07">Nota Crédito</option>
          <option value="08">Nota Débito</option>
          <option value="09">GRE</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-md bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Todos los estados</option>
          <option value="draft">Borrador</option>
          <option value="sent_to_sunat">Enviado</option>
          <option value="accepted">Aceptado</option>
          <option value="rejected">Rechazado</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fecha</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Serie-Número</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cliente</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Total</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Estado</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">SUNAT</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{inv.date}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-foreground">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      {typeLabels[inv.type] || inv.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground">{inv.serie}-{inv.number}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-foreground">{inv.client}</p>
                      <p className="text-xs text-muted-foreground">{inv.ruc}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    S/ {Math.abs(inv.total).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusVariants[inv.status]}`}>
                      {statusLabels[inv.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-muted-foreground">{inv.sunat}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Ver detalle">
                        <Eye className="w-4 h-4" />
                      </button>
                      {inv.status === "draft" && (
                        <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors" title="Enviar a SUNAT">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {inv.status === "accepted" && (
                        <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Descargar PDF">
                          <FileDown className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">Mostrando {filtered.length} de {mockInvoices.length} registros</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground font-medium">1</button>
            <button className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-secondary">2</button>
            <button className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-secondary">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
