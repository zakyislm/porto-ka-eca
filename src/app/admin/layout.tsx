import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#FFF2EF] bg-[radial-gradient(#1A2A4F33_1px,transparent_1px)] [background-size:24px_24px] text-[#1A2A4F] flex flex-col md:flex-row font-body-md">
        {session && <AdminSidebar email={session.user?.email} />}
        <main className="flex-1 p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
