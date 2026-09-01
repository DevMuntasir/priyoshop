import { Image } from "../ui/Image";
import Paragraph from "../ui/Paragaraph";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
const description = `
PriyoShop is Bangladesh’s leading retail infrastructure platform, enabling MSME retailers through a combination of supply chain, embedded finance and last-mile logistics.

With nationwide coverage, PriyoShop connects brands, financial institutions and retailers through a single digital ecosystem.

The platform offers real-time inventory access, working capital solutions and efficient distribution powered by green logistics.

Building the backbone of inclusive commerce in Bangladesh.



`
export default function AboutStory() {
  return (
    <Section>
      <div className="flex flex-col items-stretch gap-10 py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        <div className="w-full lg:w-1/2">
          <SectionHeading
            eyebrow="About Us"
            title="Our Story"
            align="left"
            titleSize="h2"
            titleColor="text-ps-black font-desktop"
          />
          <Paragraph
            text={description}
            lineHeight="relaxed"
            paragraphGap="lg"
            className="text-lg font-normal text-[#444] mt-5 font-body font-semibold max-w-[480px]"
          />
        </div>
        <div className="min-h-64 w-full rounded-ps-lg bg-gray-50 sm:min-h-80 lg:min-h-[400px] lg:w-1/2" >

        </div>
      </div>

      <div className="mt-12 flex flex-col gap-10 sm:mt-16 lg:mt-20 lg:flex-row lg:gap-20">
        <div className="w-full lg:w-1/2 lg:pr-20">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Our Mission & Vision"

            align="left"
            titleSize="h2"
            titleColor="text-ps-black font-extrabold font-desktop"
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-6 sm:gap-10 lg:w-1/2">

          <div className="h-fit rounded-ps-sm border border-ps-grey-200 bg-gray-50 p-5 sm:p-8">
            <Image src="/about/v.svg" alt="Our Vision" width={80} height={80} />
            <h5 className="font-display font-bold text-ps-h5 my-3">Vision</h5>
            <p className="text-gray-600 font-body font-semibold">
              To build the retail infrastructure layer for Bangladesh and emerging markets, enabling millions of MSME retailers to grow through smarter distribution, inclusive finance, technology and data.
            </p>
          </div>

          <div className="h-fit rounded-ps-sm border border-ps-grey-200 bg-gray-50 p-5 sm:p-8">
            <Image src="/about/m.svg" alt="Our Mission" width={80} height={80} />
            <h5 className="font-display font-bold text-ps-h5 my-3">Mission</h5>
            <p className="text-gray-600 font-body font-semibold">

              To empower MSME retailers by simplifying access to products, distribution, digital tools, data, and financial services through a connected retail infrastructure platform.            </p>
          </div>
        </div>
      </div>
    </Section>
  );


}
