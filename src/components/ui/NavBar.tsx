'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, MenuItem, ProductItem, HoveredLink } from './navbar-menu';
import { Button } from './Button';
import { Logo } from './Logo';
import type { MenuItem as MenuItemType } from '@/libs/builder/Types';

function MenuIcon(props: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {props.open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function toAbsoluteHref(href?: string): string {
  if (!href) {
    return '#';
  }
  if (/^(#|https?:\/\/|mailto:|tel:|\/)/.test(href)) {
    return href;
  }
  return `/${href}`;
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export type NavBarProps = {
  items?: MenuItemType[];
  active?: string;
  onNavigate?: (item: string) => void;
  cta?: string;
  onCta?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  secondary?: string;
  onSecondary?: () => void;
  floating?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export function NavBar({
  items: menuItems = [],
  cta = 'Join Us',
  onCta,
  secondary = 'Contact Us',
  onSecondary,
  floating = true,
  className = '',
  ...rest
}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [activeDesktop, setActiveDesktop] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleLogoClick = () => {
    setOpen(false);
    window.location.href = '/';
  };

  const handleSecondary = () => {
    setOpen(false);
    if (onSecondary) {
      onSecondary();
    } else {
      window.location.href = '/contact';
    }
  };

  const handleMobileItemClick = (href: string) => {
    setOpen(false);
    window.location.href = toAbsoluteHref(href);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-999 w-full px-[env(safe-area-inset-left)]">
      {/* Desktop: Aceternity navbar with dropdowns */}
      <nav
        className={`container hidden h-16 mx-auto w-[calc(100%-2rem)] max-w-[calc(var(--container-xl)-2rem)] items-center gap-3 rounded-ps-md border border-ps-white-700/10 bg-ps-white/85 px-5 shadow backdrop-blur-md lg:flex ${floating ? 'mt-[calc(env(safe-area-inset-top)+0.75rem)]' : 'mt-[env(safe-area-inset-top)]'} ${className}`.trim()}
        {...rest}
      >
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex shrink-0 border-none bg-transparent p-0 min-w-fit"
        >
          <Logo width={140} className="w-24 sm:w-32 lg:w-44.5" />
        </button>

        {/* Centered Aceternity Menu */}
        <Menu setActive={setActiveDesktop}>
          {menuItems.map((item) =>
            item.children && item.children.length > 0 ? (
              <MenuItem
                key={item.id}
                setActive={setActiveDesktop}
                active={activeDesktop}
                item={item.label}
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4">
                  {item.children.map((child) => (
                    <ProductItem
                      key={child.id}
                      title={child.label}
                      description={child.description || ''}
                      href={toAbsoluteHref(child.href)}
                      src={child.image}
                    />
                  ))}
                </div>
              </MenuItem>
            ) : (
              <HoveredLink key={item.id} href={toAbsoluteHref(item.href)}>
                {item.label}
              </HoveredLink>
            )
          )}
        </Menu>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-5">
          {secondary && (
            <button
              type="button"
              onClick={handleSecondary}
              className="hidden sm:inline-flex border-none bg-transparent p-2 sm:p-0 font-body text-xs sm:text-ps-sm font-semibold whitespace-nowrap text-ps-black hover:text-ps-ink-600 rounded-lg active:bg-ps-black/5"
            >
              {secondary}
            </button>
          )}
          {cta && (
            <Button size="md" onClick={onCta} className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              {cta}
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile: Hamburger + drawer */}
      <div className="fixed inset-x-3 top-[calc(env(safe-area-inset-top)+0.75rem)] mx-auto flex h-16 max-w-3xl items-center gap-2 rounded-ps-md border border-ps-white-700/10 bg-ps-white/90 px-3 shadow-sm backdrop-blur-md sm:inset-x-4 sm:h-18 sm:gap-3 sm:px-4 lg:hidden">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex shrink-0 border-none bg-transparent p-0 min-w-fit"
        >
          <Logo width={160} className="w-28 sm:w-36" />
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-3">
          {secondary && (
            <button
              type="button"
              onClick={handleSecondary}
              className="hidden sm:inline-flex border-none bg-transparent px-2 py-2 sm:px-3 sm:py-0 font-body text-xs sm:text-ps-sm font-semibold whitespace-nowrap text-ps-black hover:text-ps-ink-600 rounded-lg active:bg-ps-black/5 min-h-11"
            >
              {secondary}
            </button>
          )}
          {cta && (
            <Button size="md" onClick={onCta} className="hidden sm:inline-flex text-xs sm:text-sm px-3 sm:px-4 py-2">
              {cta}
            </Button>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              setOpen((v) => !v);
            }}
            className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-lg border-none bg-ps-black/5 hover:bg-ps-black/10 text-ps-black active:bg-ps-black/15 transition-colors"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
          className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+4.75rem)] bottom-0 lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 size-full cursor-default border-none bg-ps-black/20"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
          />
          <div
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            className="relative mx-3 flex max-h-[calc(100dvh-env(safe-area-inset-top)-5.5rem)] flex-col gap-1 overflow-y-auto overscroll-contain rounded-b-ps-xl border border-t-0 border-ps-white-700 bg-ps-white/98 px-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-md backdrop-blur-md sm:mx-4 sm:px-4 sm:py-4 md:mx-auto md:max-w-3xl"
          >
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-col gap-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.children && item.children.length > 0) {
                          setExpandedMobileItem(expandedMobileItem === item.id ? null : item.id);
                        } else {
                          handleMobileItemClick(item.href || '#');
                        }
                      }}
                      className="w-full cursor-pointer rounded-lg border-none bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-left font-body text-sm sm:text-ps-sm font-normal text-ps-black hover:bg-ps-black/4 active:bg-ps-black/6 flex items-center justify-between min-h-12 sm:min-h-14 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.children && item.children.length > 0 && (
                        <motion.div
                          animate={{ rotate: expandedMobileItem === item.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown />
                        </motion.div>
                      )}
                    </button>
                    {item.children && item.children.length > 0 && expandedMobileItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                          className="ml-3 flex flex-col gap-1 border-l-2 border-ps-grey-300 pl-3 sm:ml-4 sm:pl-4"
                      >
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => {
                              handleMobileItemClick(child.href || '#');
                            }}
                            className="cursor-pointer rounded-lg border-none bg-transparent px-2 sm:px-3 py-2 sm:py-3 text-left font-body text-xs sm:text-sm font-normal text-ps-ink-600 hover:text-ps-black hover:bg-ps-black/4 active:bg-ps-black/6 min-h-10 sm:min-h-11 transition-colors"
                          >
                            {child.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3 border-t border-ps-black/10 pt-3 sm:pt-4">
              {secondary && (
                <button
                  type="button"
                  onClick={handleSecondary}
                  className="border-none bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-left font-body text-sm sm:text-ps-sm font-semibold text-ps-black hover:bg-ps-black/4 active:bg-ps-black/6 rounded-lg min-h-12 sm:min-h-14 transition-colors"
                >
                  {secondary}
                </button>
              )}
              {cta && (
                <Button
                  size="md"
                  fullWidth
                  onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                    setOpen(false);
                    onCta?.(e);
                  }}
                  className="text-xs sm:text-sm py-3 sm:py-4"
                >
                  {cta}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
