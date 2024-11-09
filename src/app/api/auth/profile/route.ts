import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const req: { token: string } = await request.json();

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`, { req });

  return NextResponse.json(res);
}
