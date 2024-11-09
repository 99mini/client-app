import { SignRequestType } from '@/types/Auth';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body: SignRequestType = await request.json();

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/sign-in`, body);

  if (!res) {
    console.error('Failed to sign in');
    return NextResponse.error();
  }
  return NextResponse.json(res.data);
}
