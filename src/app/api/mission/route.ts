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
    const district = searchParams.get('district');
    const bigCategory = searchParams.get('bigCategory');

    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/mission`, {
      params: { district, bigCategory },
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
