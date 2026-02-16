# FacturaFácil POS

Sistema de Punto de Venta (POS) y facturación electrónica para empresas peruanas, con integración completa a SUNAT.

## 📋 Descripción

FacturaFácil POS es una aplicación web moderna desarrollada en React que permite gestionar ventas, facturación electrónica, inventario, clientes y más. El sistema está diseñado específicamente para cumplir con las normativas de facturación electrónica de SUNAT en Perú.

## ✨ Características Principales

- 🧾 **Facturación Electrónica**: Emisión de comprobantes electrónicos (facturas, boletas, notas de crédito/débito) con integración SUNAT
- 💰 **Punto de Venta (POS)**: Sistema completo de ventas con gestión de sesiones de caja
- 📦 **Gestión de Inventario**: Control de stock, kardex, transferencias entre almacenes
- 👥 **Gestión de Clientes y Proveedores**: Base de datos completa de contactos comerciales
- 🛒 **Gestión de Productos**: Catálogo de productos con categorías, códigos de barras y control de stock
- 📊 **Reportes y Dashboard**: Visualización de métricas y estadísticas de ventas
- 🔐 **Autenticación y Roles**: Sistema de usuarios con permisos y auditoría
- 🏢 **Multi-empresa**: Soporte para múltiples empresas con selección de contexto

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 18 con TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Formularios**: React Hook Form + Zod
- **Gráficos**: Recharts
- **Estilos**: Tailwind CSS

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ y npm (o yarn/pnpm)
- Git

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/AndreMendezCisneros/facturafacil-pos.git

# 2. Navegar al directorio del proyecto
cd facturafacil-pos

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno
# Crear archivo .env.local con:
# VITE_API_URL=http://localhost:8000/api
# VITE_APP_NAME=FacturaFácil POS

# 5. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot-reload

# Producción
npm run build        # Construye la aplicación para producción
npm run build:dev    # Construye en modo desarrollo
npm run preview      # Previsualiza la build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run test         # Ejecuta tests unitarios
npm run test:watch   # Ejecuta tests en modo watch
```

## 📁 Estructura del Proyecto

```
facturafacil-pos/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/         # Componentes UI (shadcn/ui)
│   │   └── layout/     # Componentes de layout
│   ├── contexts/       # Contextos de React (Auth, etc.)
│   ├── hooks/          # Custom hooks (React Query)
│   ├── lib/            # Utilidades y configuraciones
│   │   ├── api.ts      # Cliente API centralizado
│   │   ├── constants.ts # Constantes y catálogos SUNAT
│   │   └── utils.ts    # Funciones utilitarias
│   ├── pages/          # Páginas/Views de la aplicación
│   │   ├── admin/      # Páginas de administración
│   │   ├── clients/     # Gestión de clientes
│   │   ├── invoices/   # Facturación
│   │   ├── inventory/  # Inventario
│   │   ├── pos/        # Punto de venta
│   │   ├── products/   # Productos
│   │   └── ...
│   ├── types/          # Tipos TypeScript
│   └── main.tsx        # Punto de entrada
├── public/             # Archivos estáticos
└── package.json
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=FacturaFácil POS
```

### API Backend

Este frontend requiere un backend API compatible. Asegúrate de que el backend esté corriendo y accesible en la URL configurada en `VITE_API_URL`.

## 📚 Documentación

- Ver [PROGRESO_IMPLEMENTACION.md](./PROGRESO_IMPLEMENTACION.md) para detalles del estado actual de implementación
- Los tipos TypeScript están documentados en `src/types/index.ts`
- Los hooks de React Query están en `src/hooks/`

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y de uso interno.

## 👥 Autor

**André Méndez Cisneros**

- GitHub: [@AndreMendezCisneros](https://github.com/AndreMendezCisneros)

## 📞 Soporte

Para soporte, abre un issue en el repositorio de GitHub.

---

**Nota**: Este proyecto está en desarrollo activo. Algunas funcionalidades pueden estar en construcción.
