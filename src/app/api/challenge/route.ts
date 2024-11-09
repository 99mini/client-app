import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/challenge`);

  return NextResponse.json(res.data);
}
