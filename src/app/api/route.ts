import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = { message: `Hello from API! ${request.body ?? ""}` };
  return NextResponse.json(data);
}
