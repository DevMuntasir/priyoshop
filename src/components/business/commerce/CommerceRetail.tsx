import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function CommerceRetail(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className=' bg-section-gradient py-20'>
      <div className="container mx-auto p-5 rounded-ps-lg bg-gradient-to-b from-transparent to-white/70">

        <ClickToPlayVideo videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />
      </div>
    </section>
  );
}
