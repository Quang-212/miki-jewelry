import Page from 'src/components/Page';
import Breadcrumb from 'src/components/Breadcrumb';
import { Hero, Pagination, ProductsList, Sorting } from 'src/container/products-list';
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
          <span className="font-primary font-bold text-32-px leading-10 text-primary">
            Danh mục sản phẩm
          </span>
          <Sorting />
        </div>
        <ProductsList products={products} />
        <Pagination pageCount={pageCount} />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const products = await getProducts([], {
    limit: 8,
    page: query.page,
    category: query.category,
    sortBy: query.sortBy,
    order: query.order,
    search: query.search,
    select: {
      visibilityStatus: 0,
    },
  });

  return {
    props: {
      products: products.data.data.products,
      pageCount: products.data.data.pageCount,
    },
  };
};
