import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionItem } from "@/libs/cms/Sections";
import Image from "next/image";

export default function FeaturesGrid({ features }: {
  features: SectionItem[]
}) {
  return (
    <section className="mx-auto max-w-7xl py-20">
      <div className="grid grid-cols-1 overflow-hidden rounded-[24px] sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => {

          return (
            <div
              key={index}
              className="
                relative
                -ml-px
                -mt-px
                border
                border-[#E7E7E7]
                bg-white
                p-8
                transition-all
                duration-300
                hover:z-10
                hover:shadow-xl
              "
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center `}
              >
                {item.image && <Image src={item.image} width={100} height={100} alt="logo" />}
              </div>
              {item.title && <SectionHeading
                title={item.title}
                titleSize="h5"
                align="left"
                description={item.body}
              />}

            </div>
          );
        })}
      </div>
    </section>
  );
}