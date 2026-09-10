import { NextResponse } from 'next/server';
import { createContactSubmission } from '@/libs/contact/ContactRepository';
import { createContactSubmissionSchema } from '@/libs/contact/contactValidation';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createContactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  await createContactSubmission(parsed.data);
  return NextResponse.json({ ok: true }, { status: 201 });
}
