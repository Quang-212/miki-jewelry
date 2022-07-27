import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
import {
  AboutSection,
  FeaturedProductsSection,
  HeroSection,
  LatestCollectionSection,
  ProductCategorySection,
} from 'src/sections/main/home';

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  return (
    <div>
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
    </div>
  );
}
