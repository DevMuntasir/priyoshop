import { createNavigation } from 'next-intl/navigation';
import { routing } from './I18nRouting';

export const { getPathname, Link, usePathname, useRouter } = createNavigation(routing);
