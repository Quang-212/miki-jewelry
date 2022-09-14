import Page from 'src/components/Page';
import Breadcrumb from 'src/components/Breadcrumb';
import { Hero, Pagination, ProductsList, Sorting } from 'src/container/products';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

ProductsAll.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductsAll({ products, pageCount }) {
  const breadcrumbs = [{ label: 'Tất cả sản phẩm', href: '/products' }];

  return (
    <>
      <Page
        data={{
          title: 'Tất cả sản phẩm',
          description: 'Tất cả sản phẩm',
          url: PATH.products,
          thumbnailUrl: '',
        }}
      />
      <Hero />
      <div className="container mt-10 flex flex-col gap-8">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="flex justify-between mt-4">
          <span className="heading-2">Danh mục sản phẩm</span>
          <Sorting />
        </div>
        <ProductsList products={products} />
        <Pagination pageCount={pageCount} />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  // console.log(query);
  const products = await getProducts([], {
    limit: 2,
    page: query.page,
    category: query.category,
    sortBy: query.sortBy,
    order: query.order,
    select: {
      __v: 0,
      coupon: 0,
      visibilityStatus: 0,
    },
  });
  // console.log(products.data.productList);

  return {
    props: {
      products: products.data.productList,
      pageCount: Math.ceil(products.data.total) / 2,
    },
  };
};
