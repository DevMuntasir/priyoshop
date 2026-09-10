import Image from 'next/image';
import type * as React from 'react';
import { Logo } from './Logo';
import { TextHoverEffect } from './text-hover-effect';

const SOCIALS = {
  x: 'M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z',
  instagram:
    'M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.903.333 4.14.63a5.8 5.8 0 0 0-2.096 1.365A5.8 5.8 0 0 0 .68 4.09C.382 4.854.18 5.726.121 7.003.063 8.284.049 8.693.049 11.952c0 3.259.014 3.668.072 4.948.059 1.277.261 2.149.558 2.913a5.8 5.8 0 0 0 1.365 2.096 5.8 5.8 0 0 0 2.096 1.365c.764.297 1.636.499 2.913.558 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.277-.059 2.149-.261 2.913-.558a5.8 5.8 0 0 0 2.096-1.365 5.8 5.8 0 0 0 1.365-2.096c.297-.764.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.949c-.059-1.277-.261-2.149-.558-2.913a5.8 5.8 0 0 0-1.365-2.096A5.8 5.8 0 0 0 19.86.63c-.764-.297-1.636-.499-2.913-.558C15.668.014 15.259 0 12 0Zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.7 3.7 0 0 1-1.38-.898 3.7 3.7 0 0 1-.898-1.38c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.054-1.17.249-1.805.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.85-.07Zm0 3.678a6.159 6.159 0 1 0 0 12.318 6.159 6.159 0 0 0 0-12.318ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z',
  linkedin:
    'M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z',
  facebook:
    'M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z',
};

function Social({ path, label }: { path: string; label: string }) {
  return (
    // oxlint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder destination until real social URLs are wired up
    <a
      href="#"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors duration-150 ease-in-out hover:bg-white/10 hover:text-ps-red-500"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

type ColumnLink = { label: string; href: string };

function Column({ heading, links }: { heading: string; links: ColumnLink[] }) {
  return (
    <div className="min-w-0 flex flex-col gap-4 sm:gap-6">
      <span className="font-body text-ps-h6 font-bold tracking-wide text-white">{heading}</span>
      <div className="flex flex-col gap-2.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="inline-flex min-h-11 items-center font-body text-ps-sm font-normal text-white/78 no-underline transition-colors hover:text-white sm:text-ps-body"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function OfficeCard({
  city,
  address,
  imagePath,
}: {
  city: string;
  address: string;
  imagePath?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-start gap-4 bg-ps-ink-900 px-5 py-6 sm:items-center sm:gap-6 sm:px-10 sm:py-7">
      {imagePath ? (
        <Image
          src={imagePath}
          alt={`${city} office`}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 object-cover"
        />
      ) : (
        <span aria-hidden="true" className="shrink-0 text-[40px] leading-none">
          📍
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="font-body text-ps-h6 md:text-ps-h5 font-bold text-ps-grey-150">{city}</span>
        <span className="font-body text-ps-body font-normal wrap-break-word text-white/78">
          {address}
        </span>
      </div>
    </div>
  );
}

export type FooterProps = React.HTMLAttributes<HTMLElement>;

export function Footer({ className = '', ...rest }: FooterProps) {
  return (
    <footer
      className={`overflow-hidden bg-black px-4 pt-14 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-white sm:px-6 md:px-8 lg:px-12 lg:pt-20 xl:px-16 xl:pt-28 ${className}`.trim()}
      {...rest}
    >
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.8fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col">
            <Logo width={220} tone="light" className="h-auto w-44 sm:w-55" />
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-10 sm:gap-4">
              <Social path={SOCIALS.x} label="X" />
              <Social path={SOCIALS.instagram} label="Instagram" />
              <Social path={SOCIALS.linkedin} label="LinkedIn" />
              <Social path={SOCIALS.facebook} label="Facebook" />
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:gap-12">
            <Column
              heading="ABOUT"
              links={[
                { label: 'Investor Relations', href: '/pages/investor-relations' },
                { label: 'Press Release', href: '/news' },
                { label: 'Career', href: '/career' },
              ]}
            />
            <Column
              heading="USEFUL LINK"
              links={[
                { label: 'Terms of Service', href: '/pages/terms-of-service' },
                { label: 'Privacy Policy', href: '/pages/privacy-policy' },
                { label: 'Return Policy', href: '/pages/return-policy' },
                { label: 'Join Us', href: '/career' },
              ]}
            />
            <Column
              heading="CONTACT US"
              links={[
                { label: 'Phone: 09610989922', href: 'tel:+8809610989922' },
                { label: 'Email: support@priyoshop.com', href: 'mailto:support@priyoshop.com' },
              ]}
            />
          </div>
        </div>
        <div className="-mx-2 overflow-hidden md:-mb-14">
          <TextHoverEffect text="PriyoShop" />
        </div>

        <div className="mb-10 flex h-fit flex-col overflow-hidden rounded-ps-xl border-y-[2px] border-ps-line-dark sm:mb-14 md:flex-row">
          <OfficeCard
            imagePath="/footer/02.png"
            city="BANGLADESH"
            address="31/A, Dhanmondi-8, Dhaka-1205"
          />
          <span className="h-0.5 w-full bg-ps-line-dark md:h-auto md:w-0.5" />
          <OfficeCard
            imagePath="/footer/01.png"
            city="SINGAPORE"
            address="160, Robinson Road #24-09, Singapore 068914"
          />
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-ps-line-dark pt-6 text-center font-body text-sm text-white/78 sm:text-[17px]">
          © 2026 PriyoShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
