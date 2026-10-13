import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { SectionUpdateInput } from '@/validations/Section';
import { toDescriptionHtml } from './DescriptionHtml';
import type { SectionDoc } from './ContentRepository';
import { SECTION_REGISTRY } from './Sections';
import type { SectionKey } from './Sections';
import { toStepBodyHtml } from './StepBodyHtml';

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
  const content = SECTION_REGISTRY[key].editor?.richTextBody
    ? {
        ...input.content,
        items: input.content.items.map((item) => ({
          ...item,
          body: toStepBodyHtml(item.body ?? ''),
        })),
      }
    : input.content;

  const sanitizedContent = SECTION_REGISTRY[key].editor?.richTextDescription
    ? {
        ...content,
        heading: {
          ...content.heading,
          description: toDescriptionHtml(content.heading.description ?? ''),
        },
      }
    : content;

  await getDb()
    .collection<SectionDoc>(COLLECTIONS.sectionContent)
    .updateOne(
      { sectionKey: key },
      {
        $set: {
          enabled: input.enabled,
          order: input.order,
          style: input.style,
          [`content.${input.locale}`]: sanitizedContent,
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
