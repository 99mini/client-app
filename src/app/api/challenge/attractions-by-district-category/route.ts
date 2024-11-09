import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const district = searchParams.get('district');
  const bigCategory = searchParams.get('bigCategory');

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/challenge/attractions-by-district-category`, {
    params: { district, bigCategory },
  });

  return NextResponse.json(res.data);
}
