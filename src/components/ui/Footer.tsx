import Image from 'next/image';
import type * as React from 'react';
import { Icon } from './Icon';
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

const AI_PROMPT = 'What is PriyoShop Retail?';
const ENCODED_PROMPT = encodeURIComponent(AI_PROMPT);

const AI_OPTIONS = [
  {
    name: 'ChatGPT',
    href: `https://chatgpt.com/?q=${ENCODED_PROMPT}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    href: `https://claude.ai/new?q=${ENCODED_PROMPT}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    href: `https://www.perplexity.ai/search?q=${ENCODED_PROMPT}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path fillRule="evenodd" d="M8 .188a.5.5 0 0 1 .503.5V4.03l3.022-2.92.059-.048a.51.51 0 0 1 .49-.054.5.5 0 0 1 .306.46v3.247h1.117l.1.01a.5.5 0 0 1 .403.49v5.558a.5.5 0 0 1-.503.5H12.38v3.258a.5.5 0 0 1-.312.462.51.51 0 0 1-.55-.11l-3.016-3.018v3.448c0 .275-.225.5-.503.5a.5.5 0 0 1-.503-.5v-3.448l-3.018 3.019a.51.51 0 0 1-.548.11.5.5 0 0 1-.312-.463v-3.258H2.503a.5.5 0 0 1-.503-.5V5.215l.01-.1c.047-.229.25-.4.493-.4H3.62V1.469l.006-.074a.5.5 0 0 1 .302-.387.51.51 0 0 1 .547.102l3.023 2.92V.687c0-.276.225-.5.503-.5M4.626 9.333v3.984l2.87-2.872v-4.01zm3.877 1.113 2.871 2.871V9.333l-2.87-2.897zm3.733-1.668a.5.5 0 0 1 .145.35v1.145h.612V5.715H9.201zm-9.23 1.495h.613V9.13c0-.131.052-.257.145-.35l3.033-3.064h-3.79zm1.62-5.558H6.76L4.626 2.652zm4.613 0h2.134V2.652z" />
      </svg>
    ),
  },
];

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

        <div className="mb-8 flex flex-col gap-3.5 sm:mb-10">
          <span className="font-body text-ps-sm font-medium text-white sm:text-ps-body">
            Ask AI about PriyoShop Retail
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {AI_OPTIONS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 items-center justify-center gap-2.5 rounded-xl border border-ps-line-dark bg-transparent px-4 text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5 active:scale-[0.99]"
              >
                {item.icon}
                <span className="font-body text-sm font-medium sm:text-base">{item.name}</span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="shrink-0 text-white/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-4 text-center font-body text-sm text-white/78 sm:text-[17px]">
          © 2026 PriyoShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
