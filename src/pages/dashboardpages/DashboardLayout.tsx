// layouts/DashboardLayout.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Sidebar from "../../components/dashboardcomponents/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)] lg:grid lg:grid-cols-[280px_1fr]">
      
      {/* ✅ Mobile Menu Button - Fora de qualquer transform */}
      <motion.button
        onClick={() => setIsMobileOpen(true)}
        className="
          lg:hidden fixed top-4 left-4 z-50 w-11 h-11
          flex items-center justify-center rounded-[var(--border-radius-sm)]
          bg-[var(--card-background-glass)] backdrop-blur-[var(--blur-amount)]
          border border-[var(--color-border)]
          text-[var(--color-text)] shadow-lg
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={22} />
      </motion.button>

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="
        min-h-screen
        w-full
        pt-20 pb-6 px-4
        lg:pt-6 lg:pb-8 lg:px-6 xl:px-8
        overflow-x-hidden
      ">
        <div className="max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;