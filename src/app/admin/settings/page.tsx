"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Admin {
  id: string;
  email: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    } else if (status === "authenticated") {
      fetchAdmins();
    }
  }, [status, router]);

  const fetchAdmins = async () => {
    setLoading(true);
    const res = await fetch("/api/admin");
    if (res.ok) {
      setAdmins(await res.json());
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", email: newEmail })
    });
    if (res.ok) {
      setNewEmail("");
      fetchAdmins();
    } else {
      alert("Gagal menambahkan email");
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Hapus admin ini?")) return;
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", id })
    });
    if (res.ok) {
      fetchAdmins();
    } else {
      alert("Gagal menghapus email");
    }
  };

  if (status === "loading" || loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <h1 className="font-display text-3xl font-bold text-[#1A2A4F]">Settings</h1>

      <div className="bg-white p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F]">
        <h2 className="font-display text-xl font-semibold mb-2 text-[#1A2A4F]">Admin Whitelist</h2>
        <p className="font-body-md text-sm text-[#1A2A4F]/60 mb-8">
          Hanya email yang terdaftar di bawah ini yang dapat login ke dashboard admin.
        </p>

        <form onSubmit={handleAdd} className="flex gap-4 mb-8">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Tambahkan email..."
            className="flex-1 p-3 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] font-body-md"
            required
          />
          <button type="submit" className="bg-[#1A2A4F] text-white font-label-caps uppercase text-sm px-6 py-3 rounded-sm hover:bg-[#1A2A4F]/90 transition-colors">
            Add
          </button>
        </form>

        <div className="flex flex-col gap-3">
          {admins.map((admin) => (
            <div key={admin.id} className="flex justify-between items-center p-4 bg-[#FFF2EF] border border-[#1A2A4F]/10 rounded-sm hover:border-[#F7A5A5] transition-colors">
              <span className="font-body-md font-medium text-[#1A2A4F]">{admin.email}</span>
              <button
                onClick={() => handleRemove(admin.id)}
                className="text-[#1A2A4F]/50 hover:text-red-500 text-sm font-label-caps uppercase transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          {admins.length === 0 && <p className="text-[#1A2A4F]/50 italic text-sm font-body-md">Belum ada admin terdaftar.</p>}
        </div>
      </div>
    </div>
  );
}
