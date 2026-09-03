import Image from 'next/image';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Impact(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;

  return (
    <section className="relative mt-10 overflow-hidden bg-[#fff6f6] py-12 sm:py-14 lg:min-h-[700px] xl:aspect-[7/3.6]">
      {/* Background */}
      <Image
        src="/impact/section.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative mx-auto h-full max-w-[1400px] px-4 sm:px-6 lg:min-h-full lg:content-center lg:px-12">
        {/* LEFT CONTENT */}
        <div className="relative z-20 ">
          <div className="w-full lg:w-[40%]  h-full">
            <SectionHeading title={heading.title}
              description={heading.description}
              eyebrow={heading.eyebrow}
              align={style.base.align}
            />
          </div>
        </div>

        {/* RIGHT IMAGE COLLAGE */}
        <div
          className="
            relative mx-auto mt-10
            aspect-[43/50] w-full max-w-[600px]
            lg:absolute lg:right-4 lg:top-1/2 lg:mt-0
            lg:w-[52%] lg:-translate-y-1/2
          "
        >
          <div className="absolute top-[14%] right-[30%] h-[30%] w-[9%] rounded-[18px] bg-linear-to-b from-[#ed3b6a] via-[#f47494] to-[#ffd6df] shadow-[0_15px_30px_rgba(224,50,90,0.25)]" />
          <div className="absolute top-[56%] left-[6%] h-[14%] w-[9%] rounded-[16px] bg-linear-to-b from-[#ed3b6a] via-[#f47494] to-[#ffd6df] shadow-[0_15px_30px_rgba(224,50,90,0.25)]" />
          <div className="absolute top-[49%] left-[57%] h-[18%] w-[10%] rounded-[18px] bg-linear-to-b from-[#ed3b6a] via-[#f47494] to-[#ffd6df] shadow-[0_15px_30px_rgba(224,50,90,0.25)]" />

          <div className="absolute top-[8.5%] left-[17.5%] z-10 ">
            <Image
              src="/impact/Image 01 1.png"
              alt="Retailer presenting the PriyoShop app"
              width={389}
              height={344}
              sizes="(min-width: 1024px) 27vw, 51vw"
              className="h-auto w-full"
            />
          </div>

          <div className="absolute top-0 right-0 z-10 ">
            <Image
              src="/impact/Image 05 1.png"
              alt="Woman using a PriyoShop financial service"
              width={244}
              height={288}
              sizes="(min-width: 1024px) 16vw, 31vw"
              className="h-auto w-full"
            />
          </div>

          <div className="absolute top-[45%] right-[40%] z-10 w-[50%]">
            <Image
              src="/impact/Image 02 1.png"
              alt="PriyoShop delivery representative"
              width={246}
              height={197}
              sizes="(min-width: 1024px) 16vw, 31vw"
              className="h-auto w-full"
            />
          </div>

          <div className="absolute top-[30.5%] right-0 z-10 ">
            <Image
              src="/impact/Image 04 1.png"
              alt="Retailer receiving digital support from PriyoShop"
              width={244}
              height={578}
              sizes="(min-width: 1024px) 16vw, 31vw"
              className="h-auto w-full"
            />
          </div>





          <div className="absolute -bottom-[30px] right-[30%] z-10 ">
            <Image
              src="/impact/Image 03 1.png"
              alt="PriyoShop green hub in Dinajpur"
              width={512}
              height={244}
              sizes="(min-width: 1024px) 36vw, 70vw"
              className="h-auto w-full"
            />
          </div>

          <div className="absolute top-[40%] left-[53%] z-20 w-[22%]">
            <Image
              src="/impact/r1.png"
              alt=""
              width={1233}
              height={1276}
              sizes="(min-width: 1024px) 12vw, 22vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
