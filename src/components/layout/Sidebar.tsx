import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Monitor,
  Calculator,
  Package,
  Warehouse,
  ArrowLeftRight,
  Truck,
  ClipboardList,
  ShoppingBag,
  Upload,
  Users,
  Building2,
  BookOpen,
  UserCog,
  Shield,
  ScrollText,
  Building,
  KeyRound,
  CreditCard,
  ChevronDown,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "General",
    items: [{ name: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Ventas",
    items: [
      { name: "Comprobantes", href: "/invoices", icon: FileText },
      { name: "Punto de Venta", href: "/pos", icon: Monitor },
      { name: "Sesiones de Caja", href: "/pos/sessions", icon: Calculator },
    ],
  },
  {
    label: "Inventario",
    items: [
      { name: "Productos", href: "/products", icon: Package },
      { name: "Almacenes", href: "/inventory/warehouses", icon: Warehouse },
      { name: "Movimientos", href: "/inventory/movements", icon: ArrowLeftRight },
      { name: "Transferencias", href: "/inventory/transfers", icon: Truck },
      { name: "Kardex", href: "/inventory/kardex", icon: ClipboardList },
    ],
  },
  {
    label: "Compras",
    items: [
      { name: "Órdenes de Compra", href: "/purchases", icon: ShoppingBag },
      { name: "Importar XML", href: "/purchases/import-xml", icon: Upload },
    ],
  },
  {
    label: "Contactos",
    items: [
      { name: "Clientes", href: "/clients", icon: Users },
      { name: "Proveedores", href: "/suppliers", icon: Building2 },
    ],
  },
  {
    label: "Reportes",
    items: [{ name: "Libros Electrónicos", href: "/reports/ple", icon: BookOpen }],
  },
  {
    label: "Administración",
    items: [
      { name: "Usuarios", href: "/admin/users", icon: UserCog },
      { name: "Roles", href: "/admin/roles", icon: Shield },
      { name: "Auditoría", href: "/admin/audit", icon: ScrollText },
      { name: "Empresa", href: "/settings/company", icon: Building },
      { name: "Certificados", href: "/settings/certificates", icon: KeyRound },
      { name: "Suscripción", href: "/settings/subscription", icon: CreditCard },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      navGroups.forEach((g) => {
        initial[g.label] = g.items.some((i) => location.pathname === i.href);
        if (g.label === "General") initial[g.label] = true;
      });
      return initial;
    }
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={cn(
        "sidebar-gradient h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 overflow-hidden flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-sidebar-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-sidebar-foreground font-bold text-lg tracking-tight">
            FacturaPE
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center w-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40 hover:text-sidebar-foreground/60 transition-colors"
              >
                <span className="flex-1 text-left">{group.label}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    expandedGroups[group.label] && "rotate-180"
                  )}
                />
              </button>
            )}

            {(collapsed || expandedGroups[group.label]) && (
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
