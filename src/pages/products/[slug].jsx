import axios from 'axios';
import { StarDivider } from 'src/components/Dividers';
import Page from 'src/components/Page';
import { BreadcrumbSection } from 'src/container/breadcrumb';
import { ProductMainInformationSection, ProductImagesSection } from 'src/container/product';
import { ProductMoreInformationSection } from 'src/container/product/more-information';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductDetail() {
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
      <div className="container flex flex-col gap-8 mt-6">
        <BreadcrumbSection
          breadcrumbs={[
            {
              label: 'Tất cả sản phẩm',
              href: PATH.products,
            },
            {
              label: 'Bông tai',
              href: '/products/bong-tai',
            },
            {
              label: 'Bông tai Elean',
              href: '',
            },
          ]}
        />
        <div className="flex justify-between gap-10">
          <ProductImagesSection />
          <ProductMainInformationSection />
        </div>
        <ProductMoreInformationSection />
        <StarDivider wrapper="mt-8" />
        <div>Sản phẩm đã xem</div>
        <div>Có thể bạn cũng thích</div>
      </div>
    </>
  );
}

// export const getStaticPaths = async () => {};

// export const getStaticProps = async ({ params }) => {
//   console.log(params);
//   const product = await axios.get(`http://localhost:3000/api/products/${slug}`);
//   const products = await getProducts();
//   return {
//     props: {
//       initProducts: products.data.productList,
//     },
//     revalidate: 10,
//   };
// };
