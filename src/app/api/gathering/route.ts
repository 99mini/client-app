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

    const searchParams = request.nextUrl.searchParams;
    const challengeId = searchParams.get('challengeId');

    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/gathering`, {
      params: { challengeId },
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
  const body = await request.json();
  const { authorization } = await getCookieData();

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/gathering`, body, {
    headers: {
      Authorization: authorization,
    },
  });

  if (!res) {
    console.error('Failed to sign in');
    return NextResponse.error();
  }

  return NextResponse.json(res.data);
}
