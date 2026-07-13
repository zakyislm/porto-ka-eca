import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = process.env.PORTFOLIO_SLUG || "resha";

  try {
    let portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        educations: { orderBy: { order: 'asc' } },
        experiences: { orderBy: { order: 'asc' } }
      }
    });

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

    return NextResponse.json({ portfolio });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = process.env.PORTFOLIO_SLUG || "resha";

  try {
    const data = await req.json();

    // Pastikan portfolio ada
    const existing = await prisma.portfolio.findUnique({ where: { slug } });
    if (!existing) {
      await prisma.portfolio.create({
        data: {
          slug,
          name: data.name || "My Portfolio",
        }
      });
    }

    // Update data utama
    await prisma.portfolio.update({
      where: { slug },
      data: {
        name: data.name,
        greetings: data.greetings,
        heroTitle: data.heroTitle,
        heroDesc: data.heroDesc,
        heroSubtitle: data.heroSubtitle,
        heroImage: data.heroImage,
        cvFileUrl: data.cvFileUrl,
        floatingTags: data.floatingTags,
        aboutTitle: data.aboutTitle,
        aboutText: data.aboutText,
        instagramUrl: data.instagramUrl,
        linkedinUrl: data.linkedinUrl,
        whatsappUrl: data.whatsappUrl,
        emailUrl: data.emailUrl,
      }
    });

    // Update Educations (delete all and recreate for simplicity in CMS)
    if (data.educations) {
      await prisma.education.deleteMany({ where: { portfolio: { slug } } });
      for (const [index, ed] of data.educations.entries()) {
        await prisma.education.create({
          data: {
            portfolio: { connect: { slug } },
            institution: ed.institution,
            degree: ed.degree,
            major: ed.major,
            timeStart: ed.timeStart,
            timeEnd: ed.timeEnd,
            description: ed.description,
            order: index,
          }
        });
      }
    }

    // Update Experiences
    if (data.experiences) {
      await prisma.experience.deleteMany({ where: { portfolio: { slug } } });
      for (const [index, ex] of data.experiences.entries()) {
        await prisma.experience.create({
          data: {
            portfolio: { connect: { slug } },
            title: ex.title,
            company: ex.company,
            period: ex.period,
            description: ex.description,
            order: index,
          }
        });
      }
    }

    // Revalidate the home page to update the static cache
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Content Update Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
