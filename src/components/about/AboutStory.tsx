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
      <div className="flex items-center gap-16 py-20">
        <div className="w-1/2 ">
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
        <div className="w-1/2 bg-gray-50 min-h-[400px]" >

        </div>
      </div>

      <div className="flex gap-20 mt-20 ">
        <div className="w-1/2 pr-20 ">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Our Mission & Vision"

            align="left"
            titleSize="h2"
            titleColor="text-ps-black font-extrabold font-desktop"
          />
        </div>
        <div className="w-1/2  flex flex-col gap-10 justify-center" >

          <div className="bg-gray-50 h-full  p-8 rounded-ps-sm !border-[1px]  h-fit">
            <Image src="/about/v.svg" alt="Our Vision" width={80} height={80} />
            <h5 className="font-display font-bold text-ps-h5 my-3">Vision</h5>
            <p className="text-gray-600 font-body font-semibold">
              To build the retail infrastructure layer for Bangladesh and emerging markets, enabling millions of MSME retailers to grow through smarter distribution, inclusive finance, technology and data.
            </p>
          </div>

          <div className="bg-gray-50  p-8 rounded-ps-sm !border-[1px]  h-fit">
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