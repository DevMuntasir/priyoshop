import { NextResponse } from 'next/server';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { deleteJobPosting, getJobPosting, isJobSlugTaken, updateJobPosting } from '@/libs/career/CareerRepository';
import { validateCareerSlug } from '@/libs/career/careerSlug';
import { updateJobPostingSchema } from '@/libs/career/careerValidation';
import { sanitizeJobHtml } from '@/libs/career/sanitizeJobHtml';
import type { JobLocaleContent, JobPostingDoc } from '@/libs/career/Types';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.careerRead);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const job = await getJobPosting(id);
  if (!job) {
    return NextResponse.json({ error: 'Job posting not found' }, { status: 404 });
  }

  return NextResponse.json({ job });
}

export async function PATCH(request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.careerUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = updateJobPostingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { slug, content, deadline, ...rest } = parsed.data;

  const updates: Partial<JobPostingDoc> = { ...rest };

  if (slug !== undefined) {
    const slugError = validateCareerSlug(slug);
    if (slugError) {
      return NextResponse.json({ error: slugError }, { status: 400 });
    }
    if (await isJobSlugTaken(slug, id)) {
      return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
    }
    updates.slug = slug;
  }

  if (content !== undefined) {
    // Sanitize every locale's rich text on write; rendering trusts the DB.
    const sanitized: Record<string, JobLocaleContent> = {
      en: { ...content.en, descriptionHtml: sanitizeJobHtml(content.en.descriptionHtml) },
    };
    if (content.bn) {
      sanitized.bn = {
        title: content.bn.title ?? '',
        descriptionHtml: sanitizeJobHtml(content.bn.descriptionHtml ?? ''),
        experienceRequirement: content.bn.experienceRequirement ?? '',
        metaTitle: content.bn.metaTitle,
        metaDescription: content.bn.metaDescription,
      };
    }
    updates.content = sanitized;
  }

  if (deadline !== undefined) {
    updates.deadline = new Date(deadline);
  }

  const job = await updateJobPosting(id, updates, guard.actor.user.id);
  if (!job) {
    return NextResponse.json({ error: 'Job posting not found' }, { status: 404 });
  }

  return NextResponse.json({ job });
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requirePermission(PERMISSIONS.careerUpdate);
  if (guard.error) {
    return guard.error;
  }

  const { id } = await context.params;
  const deleted = await deleteJobPosting(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Job posting not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
