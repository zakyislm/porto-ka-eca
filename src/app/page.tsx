import { prisma } from "@/lib/prisma";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Experience from "../../components/Experience";
import Footer from "../../components/Footer";

export const revalidate = 86400;

export default async function Home() {
  const slug = process.env.PORTFOLIO_SLUG || "resha";
  
  // Fetch portfolio data
  let portfolio = await prisma.portfolio.findUnique({
    where: { slug },
    include: {
      educations: { orderBy: { order: 'asc' } },
      experiences: { orderBy: { order: 'asc' } }
    }
  });

  // If no portfolio found in DB, use default placeholder data
  if (!portfolio) {
    portfolio = {
      id: "default",
      slug,
      name: "Resha Eka Aulia",
      heroTitle: "Hi, I'm Resha Eka Aulia.",
      heroSubtitle: "Aspiring Communication professional bridging the gap between creative storytelling and strategic marketing.",
      greetings: "Hi, I'm Resha Eka Aulia.",
      heroDesc: "Aspiring Communication professional bridging the gap between creative storytelling and strategic marketing.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuByhQnZAN5T1SMa4C_qWytAveJrsDaL6dp084GQoHMdtmucYQKQgOLrd0NMlHrvKpBoFxXKTnIM1ErCymaRwxJJ5Pp0BYMs5WZlOJbzXaFK4e57lT_cYst-3uzXERYt7_ifdXzqF5aZXc0iqH4weMG6faJPPhOcf9EI2ZOo3OAmcYd1_1e1roes7OY_UJF_fL2hl-xu_BF98IoNUJp1XjcCzSTmp0qXFJQz0Kyn_R2SFlIYWWQC8k1NMrGk3WmCBiJ4EHmr-Lo2KiCM",
      cvFileUrl: "",
      floatingTags: ["Public Relations", "Social Media", "SEO"],
      aboutTitle: "ABOUT ME",
      aboutText: "As an aspiring Communication professional at UPN Veteran Jakarta, I bridge the gap between creative storytelling and strategic marketing. My expertise spans social media management, public relations, and SEO optimization. I thrive in dynamic environments where my problem-solving abilities and multitasking mindset deliver impactful, data-driven results.",
      educations: [
        { id: "e1", portfolioId: "default", institution: "Universitas Pembangunan Nasional Veteran Jakarta", degree: "Communication Student", major: "Public Relations", timeStart: 2023, timeEnd: null, description: "Focused on strategic communication, PR, and digital marketing.", order: 1 },
      ],
      experiences: [
        { id: "ex1", portfolioId: "default", title: "Research Intern", company: "B-Universe", period: "2024", description: "Conducted comprehensive market research and data gathering.", order: 1 }
      ],
      instagramUrl: "https://www.instagram.com/floo_.wiee",
      linkedinUrl: "https://www.linkedin.com/in/reshaekaaulia",
      whatsappUrl: "https://wa.me/6285716171168",
      emailUrl: "mailto:reshaekaauliaa@gmail.com",
    } as any;
  }

  return (
    <>
      <Navbar name={portfolio.name} />
      <main>
        <Hero 
          title={portfolio.greetings || portfolio.heroTitle || ""} 
          subtitle={portfolio.heroDesc || portfolio.heroSubtitle || ""} 
          imageUrl={portfolio.heroImage || ""} 
          cvFileUrl={portfolio.cvFileUrl || ""}
          floatingTags={portfolio.floatingTags}
        />
        <About 
          title={portfolio.aboutTitle || "ABOUT ME"}
          text={portfolio.aboutText || ""} 
        />
        <Experience 
          educations={portfolio.educations} 
          experiences={portfolio.experiences} 
        />
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
