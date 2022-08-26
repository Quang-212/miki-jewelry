import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';
import {
  About,
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
  FeaturedProducts,
  Hero,
  LatestCollection,
  ProductCategory,
} from 'src/container/home';

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  return (
    <>
      <Page
        data={{
          title: 'Trang chủ',
          description: 'Trang chủ',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <Hero />
      <About />
      <FeaturedProducts />
      <LatestCollection />
      <ProductCategory />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </>
  );
}
