import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResolvedSection } from "@/libs/cms/Sections";
import Image from "next/image";
import { ReactNode } from "react";

const steps = [
  {
    step: "Step 1",
    title: "Login to app",
    description:
      "Access your account to explore personalized retail insights and stay ahead with the latest sales trends.",
    image: "/about/1.png", // Replace with actual image URL
  },
  {
    step: "Step 2",
    title: "Place Voice Order",
    description:
      "Easily place your order using just your voice for a faster, hands-free experience.",
    image: "/about/2.png", // Replace with actual image URL
  },
  {
    step: "Step 3",
    title: "Access credit based on profile",
    description:
      "Unlock credit options tailored to your unique profile and financial history.",
    image: "/about/3.png", // Replace with actual image URL
  },
  {
    step: "Step 4",
    title: "Complete order",
    description:
      "Confirm your details and finalize your purchase quickly and securely.",
    image: "/about/4.png", // Replace with actual image URL
  },
];

const StepBadge = ({ children }: {
  children: ReactNode
}) => (
  <span className="inline-block bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
    {children}
  </span>
);
export function CommerceHowWork(props: { data: ResolvedSection }) {
  const { heading } = props.data;
  return (<div className="my-20">
    <SectionHeading
      title={heading.title}
      description={heading.description}
      eyebrow={heading.eyebrow}

    />
    <div className="max-w-4xl my-20 mx-auto ">
      {steps.map((item, index) => {
        const reversed = index % 2 === 1;

        return (
          <div
            key={index}
            className={`grid grid-cols-1 max-w-4xl mt-10 mx-auto  lg:grid-cols-2 gap-10  items-center ${reversed ? "lg:[&>div:first-child]:order-2" : ""
              }`}
          >
            {/* Image Container */}
            <div className="flex relative after:bg-ps-white-700/50 after:-translate-x-[50%] after:left-[50%] after:w-[120%] after:h-[1px] after:absolute after:bottom-0 ">
              <div className="border-2 !border-b-[0] p-5 rounded-t-ps-hero bg-ps-white-600">
                <Image
                  src={item.image}
                  alt={`${item.title} screenshot`}
                  className="w-full min-w-[400px] max-w-[430px]  h-auto object-contain"
                  width={430}
                  height={200}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="">
              <StepBadge>{item.step}</StepBadge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 leading-tight">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed text-[15px]">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>)
}