import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
import {
  AboutSection,
  BestSellerSection,
  HeroSection,
  LatestCollectionSection,
  ProductCategorySection,
} from 'src/sections/main/home';
//always import from src folder, not "./", "../", "../../",...

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
      <h1 className="text-green-500">Home Page</h1>
      <HeroSection />
      <AboutSection />
      <BestSellerSection />
      <LatestCollectionSection />
      <ProductCategorySection />
    </div>
  );
}
