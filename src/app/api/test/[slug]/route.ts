import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const data = await axios.get(`https://api.plankton-hackathon.com/api/test/${slug}`);
  console.log(data);
  if (!data) {
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }

  return NextResponse.json({ data: data.data });
}
