import { NextResponse } from "next/server";
import { getPublicShowcaseData } from "@/server/showcase-service";

export async function GET() {
  const data = await getPublicShowcaseData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
