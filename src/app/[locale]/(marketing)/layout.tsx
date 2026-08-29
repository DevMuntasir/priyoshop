import { setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/seo/JsonLd';
import { Footer } from '@/components/ui/Footer';
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
      <NavBarServer
        floating={false}
        className="fixed left-1/2 z-50 mx-auto mt-[18px] w-full -translate-x-1/2"
      />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
