import { NextResponse } from "next/server";
import { getPublicPortfolio } from "@/server/portfolio-service";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: await getPublicPortfolio() });
}
