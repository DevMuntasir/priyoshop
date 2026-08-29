import { getTranslations } from 'next-intl/server';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';

/** Plays the career video inside a bordered poster frame. */
export async function CareerVideoBanner(props: { locale: string; poster: string; videoUrl?: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <section className="bg-about-gradient px-4 py-8 sm:px-10 lg:py-20 rounded-ps-hero">
      <div className="container mx-auto rounded-ps-lg bg-[linear-gradient(180deg,#ffbd9c_0%,#ffe7d7_48%,#ffffff_100%)] p-px">
        <div className="rounded-[19px]  bg-white p-4 sm:p-14">
          <ClickToPlayVideo
            videoPath={props.videoUrl ?? '/video/1.mp4'}
            poster={props.poster}
            title={t('video_play_label')}
            className='!rounded-[10px] overflow-hidden'
          />
        </div>
      </div>
    </section>
  );
}
