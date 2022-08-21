import axios from 'axios';
import Page from 'src/components/Page';
import { useProducts } from 'src/hooks/useProducts';
import MainLayout from 'src/layouts/MainLayout';
import { HeroSection, ProductsListSection, ProductsPagination } from 'src/container/products';
import qs from 'qs';
import { getProducts } from 'src/fetching/products';
import useSWR from 'swr';
import getQueryUrl from 'src/utils/getQueryUrl';

ProductsList.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductsList({ initProducts }) {
  return (
    <>
      <Page
        data={{
          title: '',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSection />
      <ProductsListSection initProducts={initProducts} />
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
