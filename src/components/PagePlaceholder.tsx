import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function PagePlaceholder({ title, description, icon: Icon }: Props) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-16 text-center">
        <p className="text-muted-foreground">Módulo en desarrollo</p>
        <p className="text-xs text-muted-foreground mt-1">Este módulo será implementado próximamente</p>
      </div>
    </div>
  );
}
