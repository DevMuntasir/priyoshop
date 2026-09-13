import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { Reveal } from '@/components/ui/Reveal';
import { APP_VIDEOS } from '@/constants/Videos';

export function AboutVideo() {
  return (
    <Reveal direction="scale" delay={0.1}>
      <ClickToPlayVideo
        videoPath={APP_VIDEOS.about.story.src}
        poster={APP_VIDEOS.about.story.poster}
        title="About PriyoShop Video"
      />
    </Reveal>
  );
}