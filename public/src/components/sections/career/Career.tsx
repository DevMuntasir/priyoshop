import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

const GALLERY_DOT_CLASSES = [
  'left-[22%] top-[14%]',
  'left-[54%] top-[4%]',
  'left-[50%] top-[35%]',
  'left-[43%] top-[54%]',
  'right-[3%] top-[22%]',
  'right-[2%] bottom-[31%]',
] as const;

const DEFAULT_GALLERY_IMAGE = '/career/all.png';

const toGalleryItems = (items: SectionItem[], title: string) => {
  const imageSrc = items.find((item) => item.image)?.image ?? DEFAULT_GALLERY_IMAGE;
  const itemTitle = items.find((item) => 'title' in item && item.title)?.title;
  const imageAlt = items.find((item) => 'imageAlt' in item && item.imageAlt)?.imageAlt;

  return [
    {
      alt: imageAlt ?? itemTitle ?? title,
      className:
        'col-span-6 row-span-5 sm:col-span-6 sm:row-span-5 lg:col-span-10 lg:row-span-8',
      src: imageSrc,
    },
  ];
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
              <SectionHeading
                title={props.data.heading.title}
                description={props.data.heading.description}
                eyebrow={props.data.heading.eyebrow}
                align={resolved.align}
                titleSize="h2"
              />

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

            <div className="relative mx-auto w-full  aspect-[4/3] ">
              {galleryItems.map((item) => (
                <div
                  key={`${item.src}-${item.className}`}
                  className={`${item.className} `}
                >
                  {/* oxlint-disable-next-line next/no-img-element -- section images are managed in /public and can be overridden by CMS URLs */}
                  <img src={item.src} alt={item.alt} className="size-full object-cover" />
                </div>
              ))}


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
