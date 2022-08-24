import Page from 'src/components/Page';
import { BreadcrumbSection } from 'src/container/breadcrumb';
import {
  HeroSection,
  ProductsListSection,
  ProductsPaginationSection,
  SortingSection,
} from 'src/container/products';
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
          title: 'Tất cả sản phẩm',
          description: 'Tất cả sản phẩm',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSection />
      <div className="container mt-10 flex flex-col gap-8">
        <BreadcrumbSection
          breadcrumbs={[
            {
              label: 'Tất cả sản phẩm',
              href: '/products',
            },
          ]}
        />
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
