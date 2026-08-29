import Image from 'next/image';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Impact(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;

  return (
    <section className="relative  mt-10 overflow-hidden py-14 xl:aspect-[7/3.6] bg-[#fff6f6]">
      {/* Background */}
      <Image
        src="/impact/section.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative mx-auto content-center h-full min-h-[650px] max-w-[1400px] px-6 lg:min-h-full lg:px-12">
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
            h-[520px] w-full max-w-[600px]
            lg:absolute lg:right-4 lg:top-1/2 lg:mt-0
            lg:h-[650px] lg:w-[52%]
            lg:-translate-y-1/2
          "
        >
          {/* MAIN WOMAN IMAGE */}
          <div
            className="
              absolute
              left-[7%] top-[12%]
              h-[34%] w-[54%]
              overflow-hidden
              rounded-[24px]
              border-[4px] border-white
              shadow-[0_12px_30px_rgba(74,22,22,0.18)]
            "
          >
            <Image
              src="/impact/p-bg.png"
              alt="Customer using mobile application"
              fill
              className="object-cover"
            />
          </div>

          {/* TOP RIGHT IMAGE */}
          <div
            className="
              absolute
              right-[3%] top-[3%]
              h-[29%] w-[32%]
              overflow-hidden
              rounded-[24px]
              border-[4px] border-white
              shadow-[0_12px_30px_rgba(74,22,22,0.18)]
            "
          >
            <Image
              src="/impact/p1.png"
              alt="Woman using financial service"
              fill
              className="object-cover"
            />
          </div>

          {/* SMALL DELIVERY IMAGE */}
          <div
            className="
              absolute
              left-0 top-[48%]
              h-[24%] w-[62%]
              overflow-hidden
              rounded-[22px]
              border-[4px] border-white
              shadow-[0_12px_30px_rgba(74,22,22,0.18)]
            "
          >
            <Image
              src="/impact/d1.png"
              alt="Delivery service"
              fill
              className="object-cover"
            />

          </div>

          {/* RIGHT TALL IMAGE */}
          <div
            className="
              absolute
              right-[3%] top-[35%]
              h-[58%] w-[32%]
              overflow-hidden
              rounded-[24px]
              border-[4px] border-white
              shadow-[0_12px_30px_rgba(74,22,22,0.18)]
            "
          >
            <Image
              src="/impact/d2.png"
              alt="Digital payment"
              fill
              className="object-cover"
            />
          </div>

          {/* BOTTOM WIDE IMAGE */}
          <div
            className="
              absolute
              bottom-0 left-0
              h-[25%] w-[51%]
              overflow-hidden
              rounded-[24px]
              border-[4px] border-white
              shadow-[0_12px_30px_rgba(74,22,22,0.18)]
            "
          >
            <Image
              src="/impact/d1.png"
              alt="Local shop"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="
              absolute
              bottom-0
              left-[54%]
              h-[160px] w-[50px]
              rounded-[18px]
              bg-gradient-to-b
              from-[#ed3b6a]
              via-[#f47494]
              to-[#ffd6df]
              shadow-[0_15px_30px_rgba(224,50,90,0.25)]
            "
          />
          {/* ROCKET / CENTER DECORATION */}
          <div
            className="
              absolute
              left-[58%] top-[53%]
              z-20
              h-[105px] w-[105px]
              -translate-x-1/2
              -translate-y-1/2
              rotate-[8deg]
              lg:h-[140px] lg:w-[140px]
            "
          >
            <Image
              src="/impact/r1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>



        </div>
      </div>
    </section>
  );
}