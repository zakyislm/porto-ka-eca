import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET untuk mengambil daftar whitelist email
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = process.env.PORTFOLIO_SLUG || "resha";

  try {
    const admins = await prisma.admin.findMany({
      where: { portfolio: { slug } }
    });
    return NextResponse.json(admins);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST untuk menambah/menghapus whitelist email
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = process.env.PORTFOLIO_SLUG || "resha";

  try {
    const { action, email, id } = await req.json();

    if (action === "add" && email) {
      await prisma.admin.create({
        data: {
          email,
          portfolio: { connect: { slug } }
        }
      });
    } else if (action === "remove" && id) {
      await prisma.admin.delete({
        where: { id }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
