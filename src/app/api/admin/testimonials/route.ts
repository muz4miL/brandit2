import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/server/auth";
import { getCollections } from "@/server/db";

const COOKIE_NAME = "brandit_admin_session";

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function GET() {
  try {
    const session = await verifyAuth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const { testimonials } = await getCollections();
    const docs = await testimonials.find({}).sort({ order: 1, _id: 1 }).toArray();
    return NextResponse.json({
      success: true,
      testimonials: docs.map((d) => ({ ...d, _id: d._id?.toString() })),
    });
  } catch (err: unknown) {
    console.error("Admin testimonials GET error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
