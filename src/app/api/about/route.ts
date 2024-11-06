import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = { message: `Hello from About! ${request}` };
  return NextResponse.json(data);
}
