import Page from 'src/components/Page';
import { Breadcrumb } from 'src/container/breadcrumb';
import { Hero, ProductsList, Pagination, Sorting } from 'src/container/products';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import getQueryUrl from 'src/utils/getQueryUrl';

ProductsAll.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductsAll({ products }) {
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
      <Hero />
      <div className="container mt-10 flex flex-col gap-8">
        <Breadcrumb
          breadcrumbs={[
            {
              label: 'Tất cả sản phẩm',
              href: '/products',
            },
          ]}
        />
        <div className="flex justify-between mt-4">
          <span className="heading-2">Danh mục sản phẩm</span>
          <Sorting />
        </div>
        <ProductsList initProducts={products} page={page} limit={limit} />
        <Pagination />
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   const products = await getProducts();

//   return {
//     props: {
//       initProducts: products.data.productList,
//     },
//     revalidate: 10,
//   };
// };

export const getServerSideProps = async ({ query }) => {
  console.log(query);
  const products = await getProducts({ category: query.category });
  // console.log(products.data.productList);

  return {
    props: {
      products: products.data.productList,
    },
  };
};
