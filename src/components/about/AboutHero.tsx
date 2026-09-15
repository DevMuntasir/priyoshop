import { ResponsiveHeroBackground } from "@/components/ui/ResponsiveHeroBackground";
import { Reveal } from "@/components/ui/Reveal";
import { AccentedTitle } from "../ui/AccentedTitle";

export function AboutHero() {
  return (
    <div>
      <section className="relative mt-5 min-h-[32svh] w-full overflow-hidden lg:min-h-[100dvh]">
        <ResponsiveHeroBackground mobile="/about/ab-bg.png" />
        <div className="min-h-[32svh] bg-gradient-to-r from-white via-white/85 to-transparent lg:min-h-[100dvh]">
          <div className="container mx-auto flex min-h-[32svh] flex-col justify-center gap-3 px-4 pt-28 pb-12 sm:px-6 md:gap-0 lg:min-h-[100dvh] lg:gap-6 lg:px-8">
            <Reveal
              direction="left"

              className="flex flex-col items-start gap-6 md:max-w-[600px]  "

            >
              <h1 className="font-display text-ps-h2 leading-[1.25] font-extrabold text-left sm:text-ps-display">
                <AccentedTitle text="~PriyoShop~ Retail Distribution" emClass="bg-gradient-to-r font-extrabold from-ps-red-500 to-yellow-500 bg-clip-text text-transparent" strongClass="text-ps-red-500" />
              </h1>
            </Reveal>
            <Reveal
              direction="right"

              className="flex max-w-[300px] md:max-w-full flex-col items-start gap-6 md:max-w-[500px]  "

            >
              <p className=" font-body text-ps-body font-semibold">Infrastructure for MSMEs in Emerging Markets. </p>
            </Reveal>
          </div>
        </div>
      </section>
      {/* <RoadScrollHero /> */}
    </div>
  )
}
