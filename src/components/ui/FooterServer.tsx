import {
  getFooterMenu,
  initializeFooterMenuIfNotExists,
} from '@/libs/builder/FooterMenuRepository';
import { Footer, type FooterProps } from './Footer';

export async function FooterServer(props: Omit<FooterProps, 'items' | 'settings'>) {
  let menu = await getFooterMenu();
  if (!menu) {
    menu = await initializeFooterMenuIfNotExists();
  }

  return <Footer {...props} items={menu.items} settings={menu.settings} />;
}
