import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}`);
  return NextResponse.json(res);
}
