import { ObjectId } from 'mongodb';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { ContactSubmissionDoc } from './Types';

const collection = () => getDb().collection<ContactSubmissionDoc>(COLLECTIONS.contactSubmission);

/**
 * Stores a contact form submission.
 * @param input The visitor's name, email and message.
 * @returns The created submission document.
 * @throws Error when the insert is not acknowledged.
 */
export async function createContactSubmission(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactSubmissionDoc> {
  const doc: ContactSubmissionDoc = {
    submissionId: new ObjectId().toHexString(),
    name: input.name,
    email: input.email,
    message: input.message,
    createdAt: new Date(),
  };

  const result = await collection().insertOne(doc);
  if (!result.insertedId) {
    throw new Error('Failed to store contact submission');
  }

  return doc;
}

/**
 * Fetches contact submissions for the admin listing, newest first.
 * @returns The stored contact submission documents.
 */
export async function listContactSubmissions(): Promise<ContactSubmissionDoc[]> {
  return await collection().find({}).sort({ createdAt: -1 }).limit(500).toArray();
}
