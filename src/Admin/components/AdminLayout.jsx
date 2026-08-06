import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F8F5EE] min-h-screen">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-72">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 md:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}