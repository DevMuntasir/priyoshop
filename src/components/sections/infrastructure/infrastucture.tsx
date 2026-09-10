import type { ResolvedSection } from '@/libs/cms/Sections';
// import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Image from 'next/image';

export function Infrastructure(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  return (

    <div className="bg-black pb-5">
      <div className='container'>

        <SectionHeading
          title={heading.title}
          description={heading.description}
          align="left"
          eyebrow={heading.eyebrow}
          titleColor="text-white"
          descriptionColor="text-white"
          eyebrowMode="light"
          className="px-5"
        />

        <div className=" grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-14">
          {items.map((item, index) => (
            <Image
              key={index}
              src={item.image ?? '/infrastucture/1.png'}
              alt={item.imageAlt ?? heading.title}
              width={300}
              height={600}
              className="rounded-ps-md object-cover"
            />
          ))}
        </div>
      </div>
    </div>

  );
}