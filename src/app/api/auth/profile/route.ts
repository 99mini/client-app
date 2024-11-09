import axios from 'axios';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`, {
    headers: {
      Authorization: authorization,
    },
  });

  if (res.status !== 200) {
    return NextResponse.error();
  }

  return NextResponse.json(res.data);
}
