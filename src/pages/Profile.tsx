import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, Lock, Save } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState("+51 999 888 777");

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-muted-foreground text-sm">Información personal y preferencias</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nombre Completo</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Correo Electrónico</label>
          <input
            value={email}
            disabled
            className="w-full h-10 px-3 rounded-md border border-input bg-muted text-muted-foreground text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Teléfono</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 mt-4 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Lock className="w-4 h-4" /> Cambiar Contraseña
        </h3>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña Actual</label>
          <input type="password" className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nueva Contraseña</label>
          <input type="password" className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="flex items-center gap-2 h-9 px-4 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Actualizar Contraseña
        </button>
      </div>
    </div>
  );
}
