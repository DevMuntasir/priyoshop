import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { TeamConfig, TeamMember } from './data';
import { TEAM_CONFIG } from './data';
import Image from 'next/image';
import Link from 'next/link';

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className=" mx-auto" style={{ background: 'url(/team/s1.png) ', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 450 }}>


      <Image
        src={member.image}
        alt={member.name}
        width={400}
        height={450}
      />

      <div className=' absolute top-[80%] w-full  !gap-0 left-1/2 -translate-[50%]'>
        <SectionHeading
          title={member.name}
          description={member.role}
          descriptionFontClass=" m-0"
          titleClassName='m-0 block !font-bold !w-full'
          titleSize='h5'
          className='  w-full  !gap-0 '
        />
        <Link href={member.ctaHref || ''} className='w-full block'>
          <Image
            src={'/team/l.png'}
            alt={member.name}
            width={60}
            className=' mx-auto mt-5 cursor-pointer'
            height={20}
          />
        </Link>
      </div>
    </div>
  );
}

export function Team({
  config = TEAM_CONFIG,
}: {
  config?: TeamConfig;
}) {
  return (
    <section className="flex mt-10 px-6 w-full justify-center bg-white">
      <div className="container">
        {/* Header */}
        <Reveal direction="up" distance={40}>
          <SectionHeading
            title={config.title}
            eyebrow={config.badge}
            description={config.description}
            align="center"
          />
        </Reveal>

        {/* Core Team Section */}
        <div className="mt-12">


          {/* Team Members Grid with staggered reveal */}
          <RevealGroup stagger={0.1} delayChildren={0.3}>
            <div className="flex justify-center my-14 gap-10">
              {config.members.map((member) => (
                <Reveal key={member.id} direction="up" distance={48} item>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
