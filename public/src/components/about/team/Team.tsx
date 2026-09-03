import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { TeamConfig, TeamMember } from './data';
import { TEAM_CONFIG } from './data';
import Image from 'next/image';

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className=" mx-auto">


      <Image
        src={member.image}
        alt={member.name}
        width={400}
        height={450}
      />



    </div>
  );
}

export function Team({
  config = TEAM_CONFIG,
}: {
  config?: TeamConfig;
}) {
  return (
    <section className="flex px-6 w-full justify-center bg-white">
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
            <div className="flex justify-center my-14">
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
