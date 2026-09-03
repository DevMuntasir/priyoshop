import { revalidatePath } from 'next/cache';
import { getDb, COLLECTIONS } from '@/libs/db/Mongodb';
import type { NavMenuDoc } from './Types';

const MENU_ID = 'main-nav' as const;

/**
 * Fetches the main navigation menu.
 */
export async function getNavMenu(): Promise<NavMenuDoc | null> {
  const collection = getDb().collection<NavMenuDoc>(COLLECTIONS.navMenu);

  return collection.findOne({ menuId: MENU_ID });
}

/**
 * Updates the entire navigation menu (replaces items).
 */
export async function updateNavMenu(menu: NavMenuDoc): Promise<NavMenuDoc | null> {
  const collection = getDb().collection<NavMenuDoc>(COLLECTIONS.navMenu);

  const doc: NavMenuDoc = {
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

/**
 * Initializes the nav menu with default (empty) state if it doesn't exist.
 */
export async function initializeNavMenuIfNotExists(): Promise<NavMenuDoc> {
  const existing = await getNavMenu();
  if (existing) {
    return existing;
  }

  const collection = getDb().collection<NavMenuDoc>(COLLECTIONS.navMenu);

  const defaultMenu: NavMenuDoc = {
    menuId: MENU_ID,
    items: [],
    updatedAt: new Date(),
  };

  await collection.insertOne(defaultMenu);
  return defaultMenu;
}
