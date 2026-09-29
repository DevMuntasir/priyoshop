import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { SectionUpdateInput } from '@/validations/Section';
import type { SectionDoc } from './ContentRepository';
import type { SectionKey } from './Sections';

/**
 * Updates a section with new content and metadata.
 * @param key The section key identifier.
 * @param input The update input with content and settings.
 * @param userId The ID of the user making the update.
 */
export const updateSection = async (
  key: SectionKey,
  input: SectionUpdateInput,
  userId: string,
): Promise<void> => {
  await getDb()
    .collection<SectionDoc>(COLLECTIONS.sectionContent)
    .updateOne(
      { sectionKey: key },
      {
        $set: {
          enabled: input.enabled,
          order: input.order,
          style: input.style,
          [`content.${input.locale}`]: input.content,
          updatedAt: new Date(),
          updatedBy: userId,
        },
        $setOnInsert: { sectionKey: key },
      },
      { upsert: true },
    );

  revalidatePath('/', 'layout');
};

const ORDER_STEP = 10;

/**
 * Reorders sections and updates timestamps.
 * @param keys Array of section keys in the new order.
 * @param userId The ID of the user making the update.
 */
export const reorderSections = async (keys: string[], userId: string): Promise<void> => {
  const updatedAt = new Date();
  await getDb()
    .collection<SectionDoc>(COLLECTIONS.sectionContent)
    .bulkWrite(
      keys.map((key, index) => ({
        updateOne: {
          filter: { sectionKey: key },
          update: {
            $set: { order: (index + 1) * ORDER_STEP, updatedAt, updatedBy: userId },
            $setOnInsert: { sectionKey: key, enabled: true },
          },
          upsert: true,
        },
      })),
    );

  revalidatePath('/', 'layout');
};
