import {
  DollarSign,
  FileCheck,
  FileX,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { label: "Ventas del Día", value: "S/ 12,450.00", change: "+8.2%", icon: DollarSign, color: "text-success" },
  { label: "Comprobantes Emitidos", value: "34", change: "+5", icon: FileCheck, color: "text-primary" },
  { label: "Aceptados SUNAT", value: "31", change: "91.2%", icon: CheckCircle, color: "text-success" },
  { label: "Stock Bajo", value: "7 productos", change: "Atención", icon: AlertTriangle, color: "text-warning" },
];

const salesData = [
  { day: "Lun", ventas: 8200 },
  { day: "Mar", ventas: 9800 },
  { day: "Mié", ventas: 7600 },
  { day: "Jue", ventas: 11200 },
  { day: "Vie", ventas: 14500 },
  { day: "Sáb", ventas: 12450 },
  { day: "Dom", ventas: 6300 },
];

const activities = [
  { icon: XCircle, text: "Factura F001-00345 rechazada por SUNAT: Error en tipo de IGV", time: "Hace 5 min", type: "error" as const },
  { icon: FileCheck, text: "Boleta B001-01200 aceptada por SUNAT", time: "Hace 15 min", type: "success" as const },
  { icon: TrendingUp, text: "Nueva compra registrada: Proveedor Alicorp SAC - S/ 4,500", time: "Hace 30 min", type: "info" as const },
  { icon: ArrowUpRight, text: "Transferencia ALM-01 → ALM-02 completada (15 ítems)", time: "Hace 1 hora", type: "info" as const },
  { icon: AlertTriangle, text: "Certificado digital vence en 15 días", time: "Hace 2 horas", type: "warning" as const },
  { icon: Clock, text: "Cierre de caja POS-01 pendiente de aprobación", time: "Hace 3 horas", type: "warning" as const },
];

const typeColors = {
  error: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-primary/10 text-primary",
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Resumen general del negocio</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-lg border border-border p-5 kpi-glow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className={`text-xs mt-1 ${kpi.color} font-medium`}>{kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Ventas - Últimos 7 Días</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} tickFormatter={(v) => `S/${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`S/ ${value.toLocaleString()}`, "Ventas"]}
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area type="monotone" dataKey="ventas" stroke="hsl(221, 83%, 53%)" fill="url(#salesGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* SUNAT Status */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Estado SUNAT</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-md bg-success/10">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-foreground">Servicio Activo</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Enviados hoy</span>
                <span className="font-semibold text-foreground">34</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Aceptados</span>
                <span className="font-semibold text-success">31</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rechazados</span>
                <span className="font-semibold text-destructive">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pendientes</span>
                <span className="font-semibold text-warning">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[a.type]}`}>
                <a.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
