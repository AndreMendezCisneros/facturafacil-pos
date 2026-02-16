import { Bell, Search, ChevronDown, LogOut, User, Settings, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const { user, company, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Factura F001-00345 rechazada por SUNAT", type: "error" as const, time: "Hace 5 min" },
    { id: 2, text: "Stock bajo: Aceite Vegetal 1L (3 uds)", type: "warning" as const, time: "Hace 20 min" },
    { id: 3, text: "Certificado digital vence en 15 días", type: "warning" as const, time: "Hace 1 hora" },
  ];

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 flex-shrink-0">
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-muted-foreground hover:text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar comprobantes, productos, clientes..."
            className="w-full h-9 pl-9 pr-4 rounded-md bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Company badge */}
      {company && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md">
          <span className="text-xs font-medium text-muted-foreground">RUC:</span>
          <span className="text-xs font-semibold text-foreground">{company.ruc}</span>
        </div>
      )}

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
          className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-sm text-foreground">Notificaciones</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer">
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
          className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="hidden md:block text-sm font-medium text-foreground">{user?.name}</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
            <button
              onClick={() => { navigate("/profile"); setShowUserMenu(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <User className="w-4 h-4" /> Mi Perfil
            </button>
            <button
              onClick={() => { navigate("/settings/company"); setShowUserMenu(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <Settings className="w-4 h-4" /> Configuración
            </button>
            <div className="border-t border-border" />
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
