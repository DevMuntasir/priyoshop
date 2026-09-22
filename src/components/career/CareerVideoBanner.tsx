import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/**
 * Plays the career video inside a scroll-expanding frame using CMS section content.
 */
export function CareerVideoBanner(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const videoUrl = props.data.heading.videoPath || APP_VIDEOS.career.banner.src;
  const poster =
    props.data.heading.backgroundImage || APP_VIDEOS.career.banner.poster || '/career/7.png';

  return (
    <section className={`${resolved.wrapperClass} bg-about-gradient py-8 sm:py-12 lg:py-16 rounded-ps-hero`}>
      <ScrollExpand
        src={videoUrl}
        mediaType="video"
        poster={poster}
        alt={props.data.heading.title || 'Play video'}
        useWindowScroll
        scrollHint="Scroll to expand"
        startWidth={58}
        startHeight={64}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.25}
        scrollDistance={1.2}
        holdDistance={0.3}
        overlayScrim={0.45}
      />
    </section>
  );
}
