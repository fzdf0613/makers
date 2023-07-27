import { getUserById } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  return getUserById("admin@test.id").then((data) => NextResponse.json(data));
}
