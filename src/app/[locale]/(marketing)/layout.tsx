import { setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/seo/JsonLd';
import { FooterServer } from '@/components/ui/FooterServer';
import { NavBarServer } from '@/components/ui/NavBarServer';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/libs/seo/StructuredData';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="relative">
      <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd(locale)]} />
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('ps_preloader_seen')){document.body.classList.add('ps-preloader-skip')}}catch(e){}`,
        }}
      />
      {/* <Preloader /> */}
      <NavBarServer floating />
      <div>{props.children}</div>
      <FooterServer />
    </div>
  );
}
