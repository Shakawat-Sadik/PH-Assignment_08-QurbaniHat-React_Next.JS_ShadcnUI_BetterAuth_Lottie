import { NextResponse } from "next/server";
import animals from "@/providers/animalsEndpoint.json";

export function GET() {
  return NextResponse.json(animals);
}
