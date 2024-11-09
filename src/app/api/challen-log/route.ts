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
    const id = searchParams.get('id');
    const nickName = searchParams.get('nickName');
    const challengeId = searchParams.get('challengeId');
    const text = searchParams.get('text');
    const maxCount = searchParams.get('maxCount');
    const likeCount = searchParams.get('likeCount');

    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/gathering`, {
      params: { id, nickName, challengeId, text, maxCount, likeCount },
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
