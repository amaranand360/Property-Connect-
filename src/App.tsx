
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Search from "./pages/Search";
import PropertyDetail from "./pages/PropertyDetail";
import OwnerDashboard from "./pages/OwnerDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import AdminPanel from "./pages/AdminPanel";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, userType } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        isAuthenticated ? (
          <Navigate to={
            userType === 'admin' ? '/admin' : 
            userType === 'owner' ? '/owner-dashboard' : 
            '/search'
          } replace />
        ) : (
          <Login />
        )
      } />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        isAuthenticated ? (
          <Navigate to={
            userType === 'admin' ? '/admin' : 
            userType === 'owner' ? '/owner-dashboard' : 
            '/search'
          } replace />
        ) : (
          <Index />
        )
      } />
      
      {/* User Routes */}
      <Route path="/search" element={
        <ProtectedRoute allowedRoles={['user']}>
          <Search />
        </ProtectedRoute>
      } />
      <Route path="/property/:id" element={
        <ProtectedRoute allowedRoles={['user', 'owner', 'admin']}>
          <PropertyDetail />
        </ProtectedRoute>
      } />
      
      {/* Owner Routes */}
      <Route path="/owner-dashboard" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />
      
      {/* Common Routes */}
      <Route path="/help" element={
        <ProtectedRoute allowedRoles={['user', 'owner', 'admin']}>
          <Help />
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute allowedRoles={['user', 'owner', 'admin']}>
          <Chat />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
