import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function CommerceRetail(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="bg-section-gradient py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-ps-lg bg-gradient-to-b from-transparent to-white/70 p-2 sm:p-5">
          <ClickToPlayVideo
            videoPath={heading.videoPath ?? '/video/1.mp4'}
            title={heading.title}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
