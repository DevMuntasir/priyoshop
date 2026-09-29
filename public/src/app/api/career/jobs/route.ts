import { NextResponse } from 'next/server';
import { listPublishedJobPostings } from '@/libs/career/CareerRepository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const jobs = await listPublishedJobPostings(locale);
  return NextResponse.json({ jobs });
}
