import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Transactions from "./pages/Transactions";
import Stores from "./pages/Stores";
import NewProduct from "./pages/NewProduct";
import StockEntry from "./pages/StockEntry";
import StockExit from "./pages/StockExit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/entry" element={<StockEntry />} />
          <Route path="/stock/exit" element={<StockExit />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/stores" element={<Stores />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
