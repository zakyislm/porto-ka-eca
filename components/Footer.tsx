import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Settings } from "iconoir-react";

interface FooterProps {
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  whatsappUrl?: string | null;
  emailUrl?: string | null;
}

export default function Footer({ instagramUrl, linkedinUrl, whatsappUrl, emailUrl }: FooterProps) {
  const cleanLinkedin = linkedinUrl?.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '');
  const cleanInstagram = instagramUrl?.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '');
  const cleanWhatsapp = whatsappUrl?.replace(/^https?:\/\/wa\.me\//i, '').replace(/\/$/, '');
  const cleanEmail = emailUrl?.replace(/^mailto:/i, '');

  return (
    <footer className="w-full pt-[160px] pb-12 px-8 md:px-container-padding bg-[#1A2A4F]" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-24">
        <h2 className="font-display text-[64px] md:text-[100px] text-[#FFF2EF] text-center leading-[1.05] tracking-tight max-w-[1400px]">
          Let's create impactful stories together.
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {linkedinUrl && (
            <a
              className="font-label-caps text-label-caps uppercase text-[#FFF2EF] hover:text-[#F7A5A5] transition-all duration-300 ease-out border-b border-transparent hover:border-[#F7A5A5] pb-1"
              href={`https://www.linkedin.com/in/${cleanLinkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {linkedinUrl && emailUrl && <span className="hidden md:block text-[#FFF2EF]/20">/</span>}
          {emailUrl && (
            <a
              className="font-label-caps text-label-caps uppercase text-[#FFF2EF] hover:text-[#F7A5A5] transition-all duration-300 ease-out border-b border-transparent hover:border-[#F7A5A5] pb-1"
              href={`mailto:${cleanEmail}`}
            >
              Email
            </a>
          )}
          {(linkedinUrl || emailUrl) && whatsappUrl && <span className="hidden md:block text-[#FFF2EF]/20">/</span>}
          {whatsappUrl && (
            <a
              className="font-label-caps text-label-caps uppercase text-[#FFF2EF] hover:text-[#F7A5A5] transition-all duration-300 ease-out border-b border-transparent hover:border-[#F7A5A5] pb-1"
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
          {(linkedinUrl || emailUrl || whatsappUrl) && instagramUrl && <span className="hidden md:block text-[#FFF2EF]/20">/</span>}
          {instagramUrl && (
            <a
              className="font-label-caps text-label-caps uppercase text-[#FFF2EF] hover:text-[#F7A5A5] transition-all duration-300 ease-out border-b border-transparent hover:border-[#F7A5A5] pb-1"
              href={`https://www.instagram.com/${cleanInstagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
        </div>
        <div className="w-full pt-8 border-t border-[#FFF2EF]/20 flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
          <div className="flex flex-col items-start gap-1">
            <p className="font-display text-[20px] text-[#FFF2EF] font-medium">Resha Eka Aulia</p>
            <div className="text-xs text-[#FFF2EF]/60 flex items-center gap-1.5 font-body-md mt-2">
              <Link
                href="https://zakyislm.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <FaGithub size={14} />
                <span>by zakyislm</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <p className="text-xs text-[#FFF2EF]/60 font-body-md">
                Copyright &copy; Resha Eka Aulia {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <Link href="/admin/settings" className="text-[#FFF2EF]/60 hover:text-white transition-colors mt-4 md:mt-0" title="Admin Settings">
            <Settings width={24} height={24} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
