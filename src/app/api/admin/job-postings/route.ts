import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { createJobPosting, isJobSlugTaken, listJobPostings } from '@/libs/career/CareerRepository';
import { validateCareerSlug } from '@/libs/career/careerSlug';
import { createJobPostingSchema } from '@/libs/career/careerValidation';

export async function GET() {
  const guard = await requirePermission(PERMISSIONS.careerRead);
  if (guard.error) {
    return guard.error;
  }

  const jobs = await listJobPostings();
  return NextResponse.json({ jobs });
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.careerUpdate);
  if (guard.error) {
    return guard.error;
  }

  const body = await request.json().catch(() => null);
  const parsed = createJobPostingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, title } = parsed.data;

  const slugError = validateCareerSlug(slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  const taken = await isJobSlugTaken(slug);
  if (taken) {
    return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
  }

  const job = await createJobPosting({ slug, title }, guard.actor.user.id);
  return NextResponse.json({ job }, { status: 201 });
}
