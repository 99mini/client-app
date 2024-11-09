import { SignRequestType } from '@/types/Auth';
import axios from 'axios';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

async function getCookieData() {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  return { authorization };
}

export async function GET(request: NextRequest) {
  try {
    const { authorization } = await getCookieData();

    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/boards`, {
      headers: {
        Authorization: authorization,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.debug(error);

    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  const body: SignRequestType = await request.json();

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/boards`, body);

  if (!res) {
    console.error('Failed to sign in');
    return NextResponse.error();
  }

  return NextResponse.json(res.data);
}
