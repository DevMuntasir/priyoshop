import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DiptyDownloadApp(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container px-4">
        <div className="relative rounded-ps-md bg-[url(/dipty/app.png)] bg-cover bg-no-repeat bg-center px-6 py-12 sm:px-10 lg:min-h-86 lg:px-14">

          <div className="relative z-10 max-w-[550px] lg:flex lg:min-h-62 lg:flex-col lg:justify-center">
            <h2 className="m-0 font-display text-ps-h3 leading-tight font-bold tracking-tight text-ps-black">
              {heading.title}
            </h2>

            {heading.description && (
              <p className="m-0 mt-5 max-w-2xl font-body text-ps-sm leading-relaxed text-ps-black-400">
                {heading.description}
              </p>
            )}

            {heading.ctaLabel && (
              <div className="mt-6">
                <Button href={heading.ctaHref} size="md" tone="light">
                  {heading.ctaLabel}
                </Button>
              </div>
            )}
          </div>

          {/* <Image
            src="/dipty/app-phone.png"
            width={1024}
            height={1536}
            alt=""
            aria-hidden="true"
            className="absolute -right-6 -bottom-35 z-20 h-92 w-auto sm:right-6 sm:h-104 lg:-right-16 lg:-bottom-63 lg:h-150"
          /> */}
        </div>
      </div>
    </section>
  );
}
