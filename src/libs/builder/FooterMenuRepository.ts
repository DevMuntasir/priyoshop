import { revalidatePath } from 'next/cache';
import { getDb, COLLECTIONS } from '@/libs/db/Mongodb';
import { defaultFooterMenuItems, defaultFooterSettings } from './FooterMenuDefaults';
import type { FooterMenuDoc } from './Types';

const MENU_ID = 'footer-nav' as const;

/** Fetches the footer navigation menu. */
export async function getFooterMenu(): Promise<FooterMenuDoc | null> {
  const collection = getDb().collection<FooterMenuDoc>(COLLECTIONS.navMenu);

  return collection.findOne({ menuId: MENU_ID });
}

/** Updates the entire footer navigation menu. */
export async function updateFooterMenu(menu: FooterMenuDoc): Promise<FooterMenuDoc | null> {
  const collection = getDb().collection<FooterMenuDoc>(COLLECTIONS.navMenu);
  const doc: FooterMenuDoc = {
    ...menu,
    menuId: MENU_ID,
    updatedAt: new Date(),
  };

  const result = await collection.findOneAndUpdate(
    { menuId: MENU_ID },
    { $set: doc },
    { returnDocument: 'after', upsert: true }
  );

  revalidatePath('/', 'layout');

  return result ?? null;
}

/** Initializes the footer menu with the current static footer links. */
export async function initializeFooterMenuIfNotExists(): Promise<FooterMenuDoc> {
  const existing = await getFooterMenu();
  if (existing) {
    return existing;
  }

  const collection = getDb().collection<FooterMenuDoc>(COLLECTIONS.navMenu);
  const defaultMenu: FooterMenuDoc = {
    menuId: MENU_ID,
    items: defaultFooterMenuItems,
    settings: defaultFooterSettings,
    updatedAt: new Date(),
  };

  await collection.insertOne(defaultMenu);
  return defaultMenu;
}
