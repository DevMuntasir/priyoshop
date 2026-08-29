'use client';

import { animate, motion, useMotionValue } from 'motion/react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

type Product = {
  name: string;
  image: string;
  size: string;
  category: string;
  code: string;
  manufacturer: string;
};

const SPRING = {
  type: 'spring',
  stiffness: 150,
  damping: 26,
} as const;

/* =========================================
   PRODUCT CARD
========================================= */

function ProductCard({ product }: { product: Product }) {
  const packSizes = product.size
    .split(/[,|/]/)
    .map(size => size.trim())
    .filter(Boolean);

  return (
    <div
      className="
        flex
        h-[280px]
        w-full
        items-center
        overflow-hidden
        rounded-[16px]
        border
        border-[#E4E7E4]
        bg-white
        px-[30px]

        max-[1200px]:h-[250px]
        max-[1200px]:px-[26px]

        max-[900px]:h-[230px]
        max-[900px]:px-[22px]

        max-[640px]:h-[210px]
        max-[640px]:px-[16px]
      "
    >
      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div
        className="
          flex
          h-full
          w-[225px]
          shrink-0
          items-center
          justify-center

          max-[1200px]:w-[195px]
          max-[900px]:w-[170px]
          max-[640px]:w-[42%]
        "
      >
        {product.image && (
          // oxlint-disable-next-line next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            draggable={false}
            className="
              block
              max-h-[190px]
              max-w-[195px]
              select-none
              object-contain

              max-[1200px]:max-h-[165px]
              max-[1200px]:max-w-[170px]

              max-[900px]:max-h-[145px]
              max-[900px]:max-w-[150px]

              max-[640px]:max-h-[140px]
              max-[640px]:max-w-[125px]
            "
          />
        )}
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          justify-center
          pl-[24px]
          pr-[8px]

          max-[1200px]:pl-[20px]
          max-[900px]:pl-[16px]
          max-[640px]:pl-[12px]
          max-[640px]:pr-0
        "
      >
        {/* PRODUCT TITLE */}

        <h3
          title={product.name}
          className="
            m-0
            max-w-full
            truncate
            font-body
            text-[26px]
            font-bold
            leading-[1.2]
            tracking-[-0.5px]
            text-[#111111]

            max-[1200px]:text-[23px]
            max-[900px]:text-[21px]
            max-[640px]:text-[18px]
          "
        >
          {product.name}
        </h3>

        {/* PRODUCT DESCRIPTION */}

        {product.category && (
          <p
            className="
              mb-0
              mt-[20px]
              max-w-[240px]
              font-body
              text-[18px]
              font-normal
              leading-[1.55]
              text-[#454545]

              max-[1200px]:mt-[16px]
              max-[1200px]:text-[16px]

              max-[900px]:mt-[14px]
              max-[900px]:text-[15px]

              max-[640px]:mt-[10px]
              max-[640px]:text-[13px]
              max-[640px]:leading-[1.45]
            "
          >
            {product.category}
          </p>
        )}

        {/* PACK SIZE */}

        {packSizes.length > 0 && (
          <div
            className="
              mt-[18px]

              max-[1200px]:mt-[15px]
              max-[900px]:mt-[13px]
              max-[640px]:mt-[11px]
            "
          >
            <p
              className="
                m-0
                mb-[10px]
                font-body
                text-[11px]
                font-bold
                uppercase
                leading-none
                tracking-[0.06em]
                text-[#222222]

                max-[900px]:text-[10px]
                max-[640px]:mb-[7px]
                max-[640px]:text-[9px]
              "
            >
              Pack Size
            </p>

            <div className="flex flex-wrap items-center gap-[8px]">
              {packSizes.map((size, index) => (
                <span
                  key={`${size}-${index}`}
                  className="
                    inline-flex
                    h-[28px]
                    min-w-[44px]
                    items-center
                    justify-center
                    whitespace-nowrap
                    rounded-full
                    border
                    border-[#CFE1D2]
                    bg-[#F3F8F3]
                    px-[11px]
                    font-body
                    text-[11px]
                    font-medium
                    leading-none
                    text-[#263D2B]

                    max-[900px]:h-[25px]
                    max-[900px]:min-w-[40px]
                    max-[900px]:px-[9px]
                    max-[900px]:text-[10px]

                    max-[640px]:h-[22px]
                    max-[640px]:min-w-[34px]
                    max-[640px]:px-[7px]
                    max-[640px]:text-[9px]
                  "
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================
   DIPTY PRODUCTS SECTION
========================================= */

export function DiptyProducts({
  data,
}: {
  data: ResolvedSection;
}) {
  const { heading, items } = data;

  const products: Product[] = items.map(item => ({
    name: item.title ?? '',
    image: item.image ?? '',
    size: item.value ?? '',
    category: item.tag ?? '',
    code: item.caption ?? '',
    manufacturer: item.name ?? '',
  }));

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const x = useMotionValue(0);

  /* =========================================
     GET SLIDE OFFSET
  ========================================= */

  const offsetForIndex = (index: number) => {
    const track = trackRef.current;

    if (!track) {
      return 0;
    }

    const currentChild = track.children[index];
    const firstChild = track.children[0];

    if (
      !(currentChild instanceof HTMLElement) ||
      !(firstChild instanceof HTMLElement)
    ) {
      return 0;
    }

    return -(currentChild.offsetLeft - firstChild.offsetLeft);
  };

  /* =========================================
     CHANGE SLIDE
  ========================================= */
  function ArrowLeftIcon() {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M19 12H5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M11 18L5 12L11 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function ArrowRightIcon() {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M13 6L19 12L13 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const goToIndex = (index: number) => {
    if (!products.length) {
      return;
    }

    const clampedIndex = Math.max(
      0,
      Math.min(products.length - 1, index),
    );

    setActiveIndex(clampedIndex);

    animate(
      x,
      offsetForIndex(clampedIndex),
      SPRING,
    );
  };

  if (!products.length) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-b to-[#EAF5EB] from-white
       
        pt-[64px]
        pb-[70px]
 
        max-[900px]:pt-[52px]
        max-[900px]:pb-[56px]

        max-[640px]:pt-[42px]
        max-[640px]:pb-[46px]
      "
    >
      {/* ======================================
          SECTION HEADING
      ====================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[920px]
          px-6
          text-center

          [&>div]:!items-center
          [&>div]:!text-center

          [&_h1]:!mx-auto
          [&_h1]:!max-w-[900px]
          [&_h1]:!text-center
          [&_h1]:!text-[48px]
          [&_h1]:!font-bold
          [&_h1]:!leading-[1.08]
          [&_h1]:!tracking-[-1.5px]

          [&_h2]:!mx-auto
          [&_h2]:!max-w-[900px]
          [&_h2]:!text-center
          [&_h2]:!text-[48px]
          [&_h2]:!font-bold
          [&_h2]:!leading-[1.08]
          [&_h2]:!tracking-[-1.5px]

          [&_h3]:!mx-auto
          [&_h3]:!max-w-[900px]
          [&_h3]:!text-center

          [&_p]:!mx-auto
          [&_p]:!mt-[18px]
          [&_p]:!max-w-[760px]
          [&_p]:!text-center
          [&_p]:!text-[18px]
          [&_p]:!leading-[1.6]

          max-[900px]:[&_h1]:!text-[40px]
          max-[900px]:[&_h2]:!text-[40px]
          max-[900px]:[&_p]:!text-[16px]

          max-[640px]:[&_h1]:!text-[30px]
          max-[640px]:[&_h1]:!tracking-[-0.8px]

          max-[640px]:[&_h2]:!text-[30px]
          max-[640px]:[&_h2]:!tracking-[-0.8px]

          max-[640px]:[&_p]:!mt-[12px]
          max-[640px]:[&_p]:!text-[14px]
          max-[640px]:[&_p]:!leading-[1.55]
        "
      >
        <SectionHeading {...heading} />
      </div>

      {/* ======================================
          CAROUSEL VIEWPORT
      ====================================== */}

      <div
        ref={viewportRef}
        className="
          mt-[66px]
          w-full
          overflow-hidden

          max-[900px]:mt-[52px]
          max-[640px]:mt-[38px]
        "
      >
        {/* ====================================
            CAROUSEL TRACK
        ==================================== */}

        <motion.div
          ref={trackRef}
          style={{ x }}
          drag={products.length > 1 ? 'x' : false}
          dragMomentum={false}
          dragElastic={0.05}
          onDragEnd={(_, info) => {
            const swipeLeft =
              info.offset.x < -80 ||
              info.velocity.x < -400;

            const swipeRight =
              info.offset.x > 80 ||
              info.velocity.x > 400;

            if (swipeLeft) {
              goToIndex(activeIndex + 1);
              return;
            }

            if (swipeRight) {
              goToIndex(activeIndex - 1);
              return;
            }

            goToIndex(activeIndex);
          }}
          className="
            flex
            cursor-grab
            select-none
            items-center
            gap-[24px]
            pb-[3px]
            pl-[12vw]
            pr-[5vw]
            active:cursor-grabbing

            max-[1200px]:gap-[20px]
            max-[1200px]:pl-[8vw]

            max-[900px]:gap-[18px]
            max-[900px]:pl-[6vw]

            max-[640px]:gap-[14px]
            max-[640px]:pl-[6vw]
            max-[640px]:pr-[6vw]
          "
        >
          {products.map((product, index) => (
            <motion.div
              key={
                product.code ||
                `${product.name}-${index}`
              }
              className="
                w-[570px]
                shrink-0

                max-[1200px]:w-[500px]

                max-[900px]:w-[440px]

                max-[640px]:w-[88vw]
              "
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ======================================
          CAROUSEL NAVIGATION
      ====================================== */}

      {products.length > 1 && (
        <div
          className="
            mt-[58px]
            flex
            items-center
            justify-center
            gap-[14px]

            max-[900px]:mt-[45px]
            max-[640px]:mt-[36px]
          "
        >
          <IconButton
            size="md"
            variant="outline"
            tone="dark"
            disabled={activeIndex === 0}
            onClick={() => {
              goToIndex(activeIndex - 1);
            }}
            ariaLabel="Previous product"
          >
            <ArrowLeftIcon />
          </IconButton>

          {/* NEXT */}

          <IconButton
            size="md"
            variant="filled"
            tone="dark"
            disabled={
              activeIndex === products.length - 1
            }
            onClick={() => {
              goToIndex(activeIndex + 1);
            }}
            ariaLabel="Next product"
          >
            <ArrowRightIcon />
          </IconButton>
        </div>
      )}

      {/* ======================================
          OPTIONAL CTA
      ====================================== */}

      <div className=' container py-10'>
        {(heading.ctaSecondaryLabel ||
          heading.ctaLabel) && (
            <div
              className="
            mt-[40px]
            flex
           
            items-center
            justify-between
            gap-4
            px-20
           
            text-center
            bg-[url(/dipty/CTA.png)] bg-cover bg-no-repeat bg-center h-[150px]

          "


            >
              <h2 className=' text-ps-h3 font-semibold font-display text-white'>
                Wants to place order?
              </h2>
              <Button className='bg-white !text-black ' >
                Install Our App Now
              </Button>
            </div>
          )}
      </div>
    </section>
  );
}