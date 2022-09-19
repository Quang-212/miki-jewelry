import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import {
  Articles,
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
  Hero,
} from 'src/container/about/brand-history';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

BrandHistoryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function BrandHistoryPage() {
  const breadcrumbs = [
    {
      label: 'Về chúng tôi',
      href: PATH.BRAND_HISTORY,
    },
    {
      label: 'Thương hiệu lịch sử',
      href: PATH.BRAND_HISTORY,
    },
  ];

  return (
    <>
      <Page
        data={{
          title: 'Thương hiệu và lịch sử',
          description: '',
          url: PATH.BRAND_HISTORY,
          thumbnailUrl: images.aboutBrandHistoryHero,
        }}
      />
      <div className="flex flex-col gap-8 mt-6">
        <Breadcrumb breadcrumbs={breadcrumbs} className="container" />
        <Hero />
        <Articles />
      </div>
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </>
  );
}
