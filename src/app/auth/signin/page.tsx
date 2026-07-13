"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#FFF2EF] bg-[radial-gradient(#1A2A4F33_1px,transparent_1px)] [background-size:24px_24px] flex flex-col items-center justify-center font-body-md p-4">
      <div className="bg-white p-8 md:p-12 rounded-sm shadow-[8px_8px_0px_0px_rgba(26,42,79,1)] border-2 border-[#1A2A4F] flex flex-col items-center max-w-md w-full text-center">
        <h1 className="font-display text-4xl text-[#1A2A4F] mb-2">Admin Login</h1>
        <p className="text-[#1A2A4F]/70 mb-8">Sign in with your authorized Google account to access the dashboard.</p>
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/settings" })}
          className="w-full bg-[#1A2A4F] hover:bg-[#1A2A4F]/90 text-[#FFF2EF] font-semibold py-4 px-6 flex items-center justify-center gap-3 transition-colors border border-[#1A2A4F] rounded-sm"
        >
          <div className="bg-white p-1 rounded-full">
            <FcGoogle size={20} />
          </div>
          <span>Sign in with Google</span>
        </button>

        <a href="/" className="mt-8 text-sm text-[#1A2A4F]/50 hover:text-[#1A2A4F] underline transition-colors">
          &larr; Back to Portfolio
        </a>
      </div>
    </div>
  );
}
