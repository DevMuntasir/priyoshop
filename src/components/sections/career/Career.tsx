import { Button } from '@/components/ui/Button';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

type GalleryItem = {
  image: string;
  imageAlt: string;
};

const GALLERY_CARD_CLASSES = [
  'col-span-3 row-span-3 sm:col-span-2 sm:row-span-3 lg:col-span-3 lg:col-start-1 lg:row-span-4 lg:row-start-2',
  'col-span-3 row-span-3 sm:col-span-4 sm:row-span-3 lg:col-span-4 lg:col-start-4 lg:row-span-3 lg:row-start-1',
  'col-span-3 row-span-3 sm:col-span-3 sm:row-span-3 lg:col-span-3 lg:col-start-3 lg:row-span-4 lg:row-start-5',
  'col-span-3 row-span-4 sm:col-span-2 sm:row-span-4 lg:col-span-2 lg:col-start-7 lg:row-span-4 lg:row-start-4',
  'col-span-3 row-span-3 sm:col-span-3 sm:row-span-3 lg:col-span-3 lg:col-start-8 lg:row-span-3 lg:row-start-2',
  'col-span-6 row-span-2 sm:col-span-3 sm:row-span-2 lg:col-span-3 lg:col-start-8 lg:row-span-2 lg:row-start-7',
] as const;

const GALLERY_DOT_CLASSES = [
  'left-[22%] top-[14%]',
  'left-[54%] top-[4%]',
  'left-[50%] top-[35%]',
  'left-[43%] top-[54%]',
  'right-[3%] top-[22%]',
  'right-[2%] bottom-[31%]',
] as const;

const FALLBACK_ITEMS = [
  { image: '/career/1.png', imageAlt: 'PriyoShop team members at work' },
  { image: '/career/5.png', imageAlt: 'PriyoShop award celebration' },
  { image: '/career/3.png', imageAlt: 'PriyoShop event performance' },
  { image: '/career/4.png', imageAlt: 'PriyoShop speaker on stage' },
  { image: '/career/6.png', imageAlt: 'PriyoShop team collaboration' },
  { image: '/career/7.png', imageAlt: 'PriyoShop team outing' },
] satisfies readonly GalleryItem[];

const defaultFallback: GalleryItem = FALLBACK_ITEMS[0]!;

const toGalleryItems = (items: SectionItem[], title: string) => {
  const gallery = [...items.filter((item) => item.image), ...FALLBACK_ITEMS];

  return GALLERY_CARD_CLASSES.map((className, index) => {
    const fallbackItem = FALLBACK_ITEMS[index] ?? defaultFallback;
    const item = gallery[index] ?? fallbackItem;

    const imageAlt = 'imageAlt' in item ? item.imageAlt : undefined;
    const itemTitle = 'title' in item ? item.title : undefined;
    const imageSrc = 'image' in item ? item.image : undefined;

    return {
      alt: imageAlt ?? itemTitle ?? title,
      className,
      src: imageSrc ?? fallbackItem.image,
    };
  });
};

export function Career(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const galleryItems = toGalleryItems(props.data.items, props.data.heading.title);

  return (
    <section className={`${resolved.wrapperClass} px-4 sm:px-6 lg:px-8`}>
      <div className="container mx-auto min-w-0">
        <div className="relative overflow-hidden rounded-ps-xl bg-[#f4f6fa] px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[2rem] sm:px-8 sm:py-10 lg:px-14 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(221,210,255,0.85),rgba(221,210,255,0)_28%),radial-gradient(circle_at_84%_88%,rgba(208,229,246,0.95),rgba(208,229,246,0)_34%),linear-gradient(135deg,#f8fafc_0%,#f6f1f8_100%)]" />
          <div className="absolute -right-16 top-0 h-72 w-72 rounded-full border-[34px] border-[#d9c7ff]/50 lg:h-96 lg:w-96 lg:border-[42px]" />
          <div className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full border-[40px] border-[#d7e7f5] lg:h-[26rem] lg:w-[26rem] lg:border-[56px]" />
          <div className="relative container grid items-center gap-10 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-12">
            <div className="min-w-0 w-full max-w-[550px]">
              {props.data.heading.eyebrow ? (
                <span className="inline-flex items-center rounded-full border border-black px-4 py-1 font-body text-ps-sm font-semibold text-ps-ink-700">
                  {props.data.heading.eyebrow}
                </span>
              ) : null}

              <h2
                className={`mt-6 text-balance font-display text-ps-h3 font-bold leading-[1.2] tracking-tight sm:text-ps-h2 lg:text-ps-h1 ${resolved.titleColorClass}`}
              >
                {props.data.heading.title}
              </h2>

              {props.data.heading.description ? (
                <p className="mt-5 max-w-lg text-pretty font-body text-ps-body font-medium leading-8 text-ps-ink-600">
                  {props.data.heading.description}
                </p>
              ) : null}

              {props.data.heading.ctaLabel ? (
                <Button
                  href={props.data.heading.ctaHref ?? '/career'}
                  size="md"
                  variant="filled"
                  className="mt-8"
                >
                  {props.data.heading.ctaLabel}
                </Button>
              ) : null}
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="grid auto-rows-[4.5rem] grid-cols-6 gap-3 sm:auto-rows-[5rem] lg:auto-rows-[4.25rem] lg:grid-cols-10 lg:gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={`${item.src}-${item.className}`}
                    className={`${item.className} overflow-hidden rounded-ps-md border-4 border-white bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:rounded-[1.75rem] sm:border-[7px]`}
                  >
                    {/* oxlint-disable-next-line next/no-img-element -- section images are managed in /public and can be overridden by CMS URLs */}
                    <img src={item.src} alt={item.alt} className="size-full object-cover" />
                  </div>
                ))}
              </div>

              {GALLERY_DOT_CLASSES.map((className) => (
                <span
                  key={className}
                  aria-hidden="true"
                  className={`absolute hidden h-5 w-5 rounded-full border border-black/20 bg-white shadow-sm lg:block ${className}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
