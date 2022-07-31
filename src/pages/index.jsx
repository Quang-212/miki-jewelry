import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
import {
  AboutSection,
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
  FeaturedProductsSection,
  HeroSection,
  LatestCollectionSection,
  ProductCategorySection,
} from 'src/sections/main/home';

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  return (
    <>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSection />
      <AboutSection />
      <FeaturedProductsSection />
      <LatestCollectionSection />
      <ProductCategorySection />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </>
  );
}
