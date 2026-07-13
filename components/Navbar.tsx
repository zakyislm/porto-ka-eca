"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FFF2EF] border-b border-[#1A2A4F]/10">
      <div className="flex justify-between items-center px-8 md:px-[64px] py-6 max-w-7xl mx-auto">
        <Link href="#" className="font-display text-[24px] tracking-tight text-[#1A2A4F] font-semibold">
          {name || "Portfolio"}
        </Link>
        
        <div className="hidden md:flex gap-[32px] items-center">
          <Link href="#home" className="font-label-caps text-[12px] uppercase text-[#1A2A4F] border-b border-[#1A2A4F] pb-1 hover:opacity-70 transition-opacity duration-300">
            Home
          </Link>
          <Link href="#about" className="font-label-caps text-[12px] uppercase text-[#1A2A4F]/80 hover:text-[#1A2A4F] hover:opacity-70 transition-colors duration-300">
            About
          </Link>
          <Link href="#services" className="font-label-caps text-[12px] uppercase text-[#1A2A4F]/80 hover:text-[#1A2A4F] hover:opacity-70 transition-colors duration-300">
            Services
          </Link>
          <Link href="#contact" className="font-label-caps text-[12px] uppercase text-[#1A2A4F]/80 hover:text-[#1A2A4F] hover:opacity-70 transition-colors duration-300">
            Contact
          </Link>
        </div>
        
        <button onClick={toggleMenu} className="md:hidden text-[#1A2A4F] focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FFF2EF] border-b border-[#1A2A4F]/10 shadow-lg flex flex-col px-8 py-6 gap-6">
          <Link href="#home" onClick={closeMenu} className="font-label-caps text-[12px] uppercase text-[#1A2A4F] border-b border-[#1A2A4F]/10 pb-2 hover:opacity-70 transition-opacity duration-300">Home</Link>
          <Link href="#about" onClick={closeMenu} className="font-label-caps text-[12px] uppercase text-[#1A2A4F] border-b border-[#1A2A4F]/10 pb-2 hover:opacity-70 transition-opacity duration-300">About</Link>
          <Link href="#services" onClick={closeMenu} className="font-label-caps text-[12px] uppercase text-[#1A2A4F] border-b border-[#1A2A4F]/10 pb-2 hover:opacity-70 transition-opacity duration-300">Services</Link>
          <Link href="#contact" onClick={closeMenu} className="font-label-caps text-[12px] uppercase text-[#1A2A4F] pb-2 hover:opacity-70 transition-opacity duration-300">Contact</Link>
        </div>
      )}
    </nav>
  );
}
