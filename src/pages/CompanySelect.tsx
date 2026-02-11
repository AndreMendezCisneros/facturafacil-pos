import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, ChevronRight, Zap } from "lucide-react";

export default function CompanySelect() {
  const { companies, selectCompany, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (company: typeof companies[0]) => {
    selectCompany(company);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-2 justify-center">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">FacturaPE</span>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Hola, <span className="font-medium text-foreground">{user?.name}</span>. Seleccione una empresa para continuar.
        </p>

        <div className="space-y-3">
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{c.razon_social}</p>
                <p className="text-sm text-muted-foreground">RUC: {c.ruc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        <button
          onClick={logout}
          className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
