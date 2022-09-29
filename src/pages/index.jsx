import Page from 'src/components/Page';
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
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function HomePage({ products }) {
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
      <FeaturedProducts products={products} />
      <LatestCollection />
      <ProductCategory />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </>
  );
}
export const getServerSideProps = async () => {
  try {
    const featuredProducts = await getProducts([], {
      limit: 8,
      sortBy: 'sold',
      order: -1,
    });

    return {
      props: {
        products: featuredProducts.data.data.products || [],
      },
      // revalidate: 10 * 60, // 10 minutes
    };
  } catch (error) {
    console.log(error);
  }
};
