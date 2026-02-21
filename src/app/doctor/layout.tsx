"use client";

import { useState } from "react";
import Sidebar from "@/component/doctor/Sidebar";
import Navbar from "@/component/genericInput/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f1f3f8]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-56">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="py-4 md:py-1">{children}</main>
      </div>
    </div>
  );
}
