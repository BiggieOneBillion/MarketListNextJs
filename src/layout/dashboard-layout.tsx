"use client"
import Sidenavbar from "../components/sidenavbar";
import { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";

// !any layout that would be shared across the dashboard route would be put here--like navigation e.t.c
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [on, setOn] = useState(false);

  const toggle = () => setOn(!on)

  return (
    <main className="min-h-screen bg-[#EDF4F2] flex items-start justify-start relative">
      {on && <div className="fixed z-10 inset-0 bg-black/30"></div>}
      <button
        className="sm:hidden lg:hidden absolute top-4 right-4 text-xl flex items-center gap-1"
        onClick={toggle}
      >
        <BsLayoutSidebar />
        <span className="text-sm">Menu</span>
      </button>
      <Sidenavbar on={on} toggle={toggle} />
      <section className="flex-1">{children}</section>
    </main>
  );
};

export default DashboardLayout;
