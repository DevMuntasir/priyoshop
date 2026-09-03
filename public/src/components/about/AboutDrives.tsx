import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import Paragraph from "../ui/Paragaraph";


const items = [
  {
    title: "Retailer First",
    description: `
    Small retailers are at the center of everything we build.
    We work to make their sourcing easier, shelves fuller, and businesses stronger.
    `,
    icon: '/about/10.png',
  },
  {
    title: "Stronger Brand Access",
    description: `
    We help brands reach deeper into Bangladesh’s retail market through structured distribution, reliable execution and stronger retailer relationships.
    `,
    icon: '/about/11.png',
  },
  {
    title: "Smart Distribution",
    description: "We believe distribution should be faster, more visible, and more efficient powered by hubs, routes, data and technology.",
    icon: '/about/12.png',
  },
  {
    title: "Embedded Finance",
    description: "We enable retailers with working capital access so they can buy more, avoid stock-outs and grow without cash-flow pressure.        ",
    icon: '/about/13.png',
  },
  {
    title: "Data Intelligence",
    description: "We turn retail activity into actionable insights that help brands, retailers and partners make smarter business decisions.",
    icon: '/about/14.png',
  },
  {
    title: "Inclusive Growth",
    description: "We are building for millions of MSMEs, creating opportunities for retailers, employees, brands and local communities.",
    icon: '/about/14.png',
  },
];

export default function WhatDrivesUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="What Drives Us"
          description="We pinpoint major market challenges and provide focused solutions that empower businesses at every stage."
          align="center"
          eyebrow="What Drives Us"



        />

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
        rounded-[24px]
        border border-[#E8E8E8]
        bg-white
        px-9
        py-10
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${index < 3 ? "lg:col-span-2" : "lg:col-span-2"}
      `}
            >
              {/* Icon */}
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFF3F0]">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={84}
                  height={84}
                  className="h-20 w-20 object-contain"
                />
              </div>

              {/* Title */}
              <SectionHeading
                title={item.title}
                titleSize="h5"
                align="left"
              />
              <Paragraph
                text={item.description}
                className=" mt-5"
              />


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}