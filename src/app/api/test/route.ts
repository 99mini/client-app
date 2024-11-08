import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await axios.get(`https://api.plankton-hackathon.com/api/test/3`);
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  console.log('post');
  const res = await axios.post(`https://api.plankton-hackathon.com/api/test`);
  return NextResponse.json(res);
}
