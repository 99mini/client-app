import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const data = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/test/${slug}`);

  if (!data) {
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }

  return NextResponse.json({ data: data.data });
}
