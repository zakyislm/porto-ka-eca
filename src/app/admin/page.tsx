"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/editor");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto gap-6 mt-24">
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="text-gray-500 text-center">
          Silakan login dengan akun Google yang sudah terdaftar di whitelist untuk mengakses panel admin.
        </p>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p>Logged in but redirecting...</p>
      <button onClick={() => signOut()} className="text-sm underline text-red-600">
        Sign out
      </button>
    </div>
  );
}
