import { prisma } from "@/lib/prisma";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default async function NotFound() {
  const slug = process.env.PORTFOLIO_SLUG || "resha";
  
  // Fetch portfolio data to populate Navbar and Footer
  let portfolio = await prisma.portfolio.findUnique({
    where: { slug }
  });

  // Fallback if no DB record
  if (!portfolio) {
    portfolio = {
      name: "Resha Eka Aulia",
      instagramUrl: "https://www.instagram.com/floo_.wiee",
      linkedinUrl: "https://www.linkedin.com/in/reshaekaaulia",
      whatsappUrl: "https://wa.me/6285716171168",
      emailUrl: "mailto:reshaekaauliaa@gmail.com",
    } as any;
  }

  return (
    <>
      <Navbar name={portfolio.name} />
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-white bg-[radial-gradient(#1A2A4F33_1px,transparent_1px)] [background-size:24px_24px] px-8 text-center pt-[100px]">
        <h1 className="font-display text-[100px] md:text-[150px] text-[#1A2A4F] leading-none mb-2">404</h1>
        <h2 className="font-display text-3xl md:text-4xl text-[#1A2A4F] mb-6">Page Not Found</h2>
        <p className="text-[#1A2A4F]/70 font-body-md max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="bg-[#1A2A4F] hover:bg-[#1A2A4F]/90 text-[#FFF2EF] px-8 py-3 rounded-full font-body-md transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer 
        instagramUrl={portfolio.instagramUrl}
        linkedinUrl={portfolio.linkedinUrl}
        whatsappUrl={portfolio.whatsappUrl}
        emailUrl={portfolio.emailUrl}
      />
    </>
  );
}
