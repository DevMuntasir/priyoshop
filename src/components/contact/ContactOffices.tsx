import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';

const DHAKA_MAP_SRC
  = 'https://www.google.com/maps?q=31%2FA%2C%20Road%208%2C%20Dhanmondi%2C%20Dhaka%201209%2C%20Bangladesh&z=16&output=embed';
const SINGAPORE_MAP_SRC
  = 'https://www.google.com/maps?q=160%20Robinson%20Road%2C%20Singapore%20068914&z=15&output=embed';
const SINGAPORE_MAP_LINK = 'https://www.google.com/maps?q=160+Robinson+Road,+Singapore+068914';

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth={1.8} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22a3a3" strokeWidth={1.8} aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PinIcon(props: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={props.color} strokeWidth={1.8} aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InfoCard(props: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-ps-md border border-ps-grey-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-body text-ps-sm font-normal text-ps-ink-400">{props.label}</span>
        {props.icon}
      </div>
      <p className="m-0 mt-4 font-display text-ps-h6 font-semibold text-ps-black">{props.value}</p>
    </div>
  );
}

/* "Our Offices" section: Dhaka map embed, Singapore map card and the
   email / phone / office-address info cards. */
export async function ContactOffices(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Contact' });

  return (
    <section className="bg-white pb-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={t('offices_eyebrow')}
          title={t('offices_title')}
          titleSize="h3"
          description={t('offices_description')}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[3.2fr_1fr]">
          <div className="h-64 overflow-hidden rounded-ps-xl sm:h-72">
            <iframe
              src={DHAKA_MAP_SRC}
              title={t('bd_office_label')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
          <a
            href={SINGAPORE_MAP_LINK}
            target="_blank"
            rel="noreferrer"
            className="relative block h-64 overflow-hidden rounded-ps-xl sm:h-72"
          >
            <iframe
              src={SINGAPORE_MAP_SRC}
              title={t('sg_office_label')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none size-full border-0 grayscale"
              tabIndex={-1}
            />
            <span className="absolute inset-0 bg-ps-black/50" />
            <span className="absolute top-24 left-5 font-display text-ps-h6 leading-snug font-bold tracking-wide text-white uppercase sm:top-28">
              {t('sg_overlay')}
            </span>
          </a>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_2.1fr]">
          <InfoCard label={t('email_card_label')} value={t('email_value')} icon={<MailIcon />} />
          <InfoCard
            label={t('bd_office_label')}
            value={t('bd_office_address')}
            icon={<PinIcon color="#d9a514" />}
          />
          <InfoCard label={t('phone_card_label')} value={t('phone_value')} icon={<PhoneIcon />} />
          <InfoCard
            label={t('sg_office_label')}
            value={t('sg_office_address')}
            icon={<PinIcon color="#f4511e" />}
          />
        </div>
      </div>
    </section>
  );
}
