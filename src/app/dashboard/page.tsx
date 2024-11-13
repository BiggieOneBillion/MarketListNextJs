"use client";
import Marketlist from "@/components/dashboard/marketlist/marketlist";
import ProtectedRoute from "@/layout/ProtectedRoute";
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Marketlist />
    </ProtectedRoute>
  );
}
