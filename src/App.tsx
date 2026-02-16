import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

import Login from "@/pages/Login";
import CompanySelect from "@/pages/CompanySelect";
import Dashboard from "@/pages/Dashboard";
import InvoiceList from "@/pages/invoices/InvoiceList";
import InvoiceForm from "@/pages/invoices/InvoiceForm";
import InvoiceDetail from "@/pages/invoices/InvoiceDetail";
import POSMain from "@/pages/pos/POSMain";
import CashSessions from "@/pages/pos/CashSessions";
import ProductList from "@/pages/products/ProductList";
import WarehouseList from "@/pages/inventory/WarehouseList";
import MovementList from "@/pages/inventory/MovementList";
import TransferList from "@/pages/inventory/TransferList";
import KardexView from "@/pages/inventory/KardexView";
import PurchaseList from "@/pages/purchases/PurchaseList";
import XMLImport from "@/pages/purchases/XMLImport";
import ClientList from "@/pages/clients/ClientList";
import SupplierList from "@/pages/suppliers/SupplierList";
import PLEGeneration from "@/pages/reports/PLEGeneration";
import UserList from "@/pages/admin/UserList";
import RoleList from "@/pages/admin/RoleList";
import AuditLog from "@/pages/admin/AuditLog";
import CompanySettings from "@/pages/settings/CompanySettings";
import Certificates from "@/pages/settings/Certificates";
import Subscription from "@/pages/settings/Subscription";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/select-company" element={<CompanySelect />} />

            {/* POS - full screen layout */}
            <Route path="/pos" element={<ProtectedRoute><POSMain /></ProtectedRoute>} />

            {/* Admin layout */}
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="invoices" element={<InvoiceList />} />
              <Route path="invoices/new" element={<InvoiceForm />} />
              <Route path="invoices/:id" element={<InvoiceDetail />} />
              <Route path="pos/sessions" element={<CashSessions />} />
              <Route path="products" element={<ProductList />} />
              <Route path="inventory/warehouses" element={<WarehouseList />} />
              <Route path="inventory/movements" element={<MovementList />} />
              <Route path="inventory/transfers" element={<TransferList />} />
              <Route path="inventory/kardex" element={<KardexView />} />
              <Route path="purchases" element={<PurchaseList />} />
              <Route path="purchases/import-xml" element={<XMLImport />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="suppliers" element={<SupplierList />} />
              <Route path="reports/ple" element={<PLEGeneration />} />
              <Route path="admin/users" element={<UserList />} />
              <Route path="admin/roles" element={<RoleList />} />
              <Route path="admin/audit" element={<AuditLog />} />
              <Route path="settings/company" element={<CompanySettings />} />
              <Route path="settings/certificates" element={<Certificates />} />
              <Route path="settings/subscription" element={<Subscription />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
