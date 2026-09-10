import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { InspiringStories, type InspiringStory } from './InspiringStories';

/** Displays employee stories in an interactive card row. */
export async function CareerInspiration(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });
  const stories = [
    {
      id: 'sharmin-akter',
      image: '/career/1.png',
      name: t('story_sharmin_name'),
      description: t('story_sharmin_description'),
    },
    {
      id: 'arafat-shimanto',
      image: '/career/2.png',
      name: t('story_arafat_name'),
      description: t('story_arafat_description'),
    },
    {
      id: 'amlan-saha',
      image: '/career/3.png',
      name: t('story_amlan_name'),
      description: t('story_amlan_description'),
    },
  ] satisfies InspiringStory[];

  return (
    <section className="bg-about-gradient py-20">
      <div className="container mx-auto flex flex-col items-center px-4 pb-16 lg:pb-24">
        <Badge variant="outline">{t('stories_eyebrow')}</Badge>
        <h2 className="mt-4 mb-10 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4 lg:mb-14">
          {t('stories_title')}
        </h2>
        <InspiringStories stories={stories} />
      </div>
    </section>
  );
}
