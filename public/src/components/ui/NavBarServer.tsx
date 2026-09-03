import { getNavMenu, initializeNavMenuIfNotExists } from '@/libs/builder/NavMenuRepository';
import { NavBar, type NavBarProps } from './NavBar';

export async function NavBarServer(props: Omit<NavBarProps, 'items'>) {
  let menu = await getNavMenu();
  if (!menu) {
    menu = await initializeNavMenuIfNotExists();
  }

  return <NavBar {...props} items={menu.items} />;
}
