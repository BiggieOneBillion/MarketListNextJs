import DashboardLayout from "@/layout/dashboard-layout";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <main>
        <DashboardLayout>
            {children}
        </DashboardLayout>
     </main>
    );
  }