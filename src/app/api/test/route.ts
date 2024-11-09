import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/test/3`);
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/test`);
  return NextResponse.json(res);
}
