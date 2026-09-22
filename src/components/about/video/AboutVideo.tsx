import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { APP_VIDEOS } from '@/constants/Videos';

export function AboutVideo() {
  return (
    <div className="pb-12 sm:pb-16 lg:pb-20">
      <ScrollExpand
        src={APP_VIDEOS.about.story.src}
        mediaType="video"
        poster={APP_VIDEOS.about.story.poster}
        alt={APP_VIDEOS.about.story.title}
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
      >
        {/* <div className="max-w-2xl px-4 text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {APP_VIDEOS.about.story.title}
          </h3>
        </div> */}
      </ScrollExpand>
    </div>
  );
}