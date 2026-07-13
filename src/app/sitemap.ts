import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const revalidate = 86400; // Cache for 24 hours, similar to the main page

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace this with the actual production domain in environment variables later
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resha.vercel.app';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  try {
    const slug = process.env.PORTFOLIO_SLUG || "resha";
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      select: { updatedAt: true }
    });

    if (portfolio) {
      // Update the lastModified date to whenever the content was last updated in the DB!
      routes[0].lastModified = portfolio.updatedAt;
    }
  } catch (error) {
    console.error("Error generating sitemap", error);
  }

  return routes;
}
