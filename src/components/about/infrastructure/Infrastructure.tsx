import { ClickToPlayVideo } from "@/components/ui/ClickToPlayVideo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Infrastructure() {

  return (
    <section className="bg-ps-black rounded-t-ps-hero min-h-screen py-20 mb-25">
      <SectionHeading
        eyebrow="Business Model"
        title="PriyoShop Infrastructuree"
        titleSize="h2"
        titleColor="text-ps-white font-extrabold font-desktop"
        description="Platform and Technology-Based"
        eyebrowMode="light"
        descriptionColor="text-ps-white-600 "

      />
      <Reveal direction="scale" delay={0.1}>
        <ClickToPlayVideo
          videoPath={'/videos/infrastructure.mp4'}
          title="YouTube video player"
          className="my-10 h-72 w-full sm:my-14 sm:h-96 lg:my-20 lg:h-125"
        />
      </Reveal>
    </section>
  )
}
