import axios from 'axios';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

async function getCookieData() {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  return { authorization };
}

export async function GET(request: NextRequest) {
  const { authorization } = await getCookieData();

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/badge`, {
    headers: {
      Authorization: authorization,
    },
  });

  if (res.status !== 200) {
    return NextResponse.error();
  }

  return NextResponse.json(res.data);
}
