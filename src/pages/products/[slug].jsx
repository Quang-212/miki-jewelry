import axios from 'axios';
import Page from 'src/components/Page';
import { useProducts } from 'src/hooks/useProducts';
import MainLayout from 'src/layouts/MainLayout';
import { HeroSection, ProductsListSection } from 'src/container/products';
import qs from 'qs';
import { getProducts } from 'src/fetching/products';

ProductsList.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductsList({ products }) {
  // const { productsState, isLoading, isError } = useProducts(
  //   {
  //     limit: 8,
  //     select: {
  //       _id: 1,
  //       name: 1,
  //       images: 1,
  //       stocks: 1,
  //     },
  //   },
  // );
  // console.log(productsState);

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
      <ProductsListSection products={products} />
    </>
  );
}

export const getServerSideProps = async ({ params, query }) => {
  const products = await getProducts(query);

  return {
    props: {
      products: products.data.productList,
    },
  };
};
