import Page from 'src/components/Page';
import {
  HeroSection,
  ProductsListSection,
  ProductsPaginationSection,
} from 'src/container/products';
import { SortingSection } from 'src/container/products/sorting';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import getQueryUrl from 'src/utils/getQueryUrl';

ProductsList.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductsList({ initProducts }) {
  const { page, limit } = getQueryUrl();

  return (
    <>
      <Page
        data={{
          title: 'All Products',
          description: 'All Products',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSection />
      <div className="container mt-10 flex flex-col gap-8">
        <div>BreadCrumbs</div>
        <div className="flex justify-between mt-4">
          <span className="heading-2">Danh mục sản phẩm</span>
          <SortingSection />
        </div>
        <ProductsListSection initProducts={initProducts} page={page} limit={limit} />
        <ProductsPaginationSection />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      initProducts: products.data.productList,
    },
    revalidate: 10,
  };
};
