"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function AdminSidebar({ email }: { email?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#1A2A4F] text-[#FFF2EF] font-display font-bold w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen z-40 bg-white border-r border-[#1A2A4F]/10 p-6 flex flex-col gap-6 shadow-[4px_0px_0px_0px_rgba(26,42,79,0.05)] transition-transform duration-300 w-64 shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="font-display font-bold text-2xl tracking-tight text-[#1A2A4F]">Admin Panel</div>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/editor" onClick={() => setIsOpen(false)} className="p-3 font-semibold hover:bg-[#FFDBB6]/30 hover:text-[#F7A5A5] transition-colors rounded-sm border border-transparent hover:border-[#1A2A4F]/10">
            Content Editor
          </Link>
          <Link href="/admin/settings" onClick={() => setIsOpen(false)} className="p-3 font-semibold hover:bg-[#FFDBB6]/30 hover:text-[#F7A5A5] transition-colors rounded-sm border border-transparent hover:border-[#1A2A4F]/10">
            Settings
          </Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="p-3 font-semibold hover:bg-[#FFDBB6]/30 hover:text-[#F7A5A5] transition-colors rounded-sm border border-transparent hover:border-[#1A2A4F]/10 text-sm mt-4">
            ← Back to Site
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-[#1A2A4F]/10 text-sm opacity-80 flex flex-col gap-2">
          <div>
            Logged in as<br />
            <span className="font-semibold break-all">{email}</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-2 w-full text-left font-label-caps text-[12px] font-bold uppercase text-red-600 hover:text-red-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
