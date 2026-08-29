import { Reveal } from "@/components/ui/Reveal";
import { AccentedTitle } from "../ui/AccentedTitle";

export function AboutHero() {
  return (
    <div>
      <section className="relative min-h-[100vh] bg-[url(/about/ab-bg.png)] bg-cover bg-center bg-no-repeat w-full">

        <div className=" bg-gradient-to-r from-white to-transfarent">
          <div className="container mx-auto content-center min-h-[100vh] px-4 py-12 md:py-0 gap-6 md:gap-0">
            <Reveal
              direction="left"

              className="flex flex-col items-start gap-6 md:max-w-[600px]  "

            >
              <h1 className="text-ps-display font-display leading-[1.4]  font-display !font-extrabold text-center text-left ">
                <AccentedTitle text="~PriyoShop~ Retail Distribution" emClass="bg-gradient-to-r font-extrabold from-ps-red-500 to-yellow-500 bg-clip-text text-transparent" strongClass="text-ps-red-500" />
              </h1>
            </Reveal>
            <Reveal
              direction="right"

              className="flex flex-col items-start gap-6 md:max-w-[500px]  "

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