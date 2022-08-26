import axios from 'axios';
import { StarDivider } from 'src/components/Dividers';
import Page from 'src/components/Page';
import { Breadcrumb } from 'src/container/breadcrumb';
import { Images, MainInformation, MoreInformation, Suggestion } from 'src/container/product';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductDetail({ product, relatedProducts }) {
  // console.log(product);
  // console.log('relatedProducts: ' + relatedProducts);
  const { name, description, slug, images, discount, stocks } = product;

  return (
    <>
      <Page
        data={{
          title: name,
          description: description,
          url: '',
          thumbnailUrl: images.find((image) => image.type === 'primary'),
        }}
      />
      <div className="container flex flex-col gap-8 mt-6">
        <Breadcrumb
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
              href: `/products/${slug}`,
            },
          ]}
        />
        <div className="flex justify-between gap-10">
          <Images images={images} />
          <MainInformation name={name} discount={discount} stocks={stocks} />
        </div>
        <MoreInformation />
        <StarDivider wrapper="mt-8" />
        <div>Sản phẩm đã xem</div>
        <Suggestion />
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await getProducts();
  const products = await res.data.productList;
  const paths = products.map((product) => ({ params: { slug: product.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  // console.log(params);
  const slug = params.slug;

  const product = await getProducts({ params: [slug] });
  console.log('product: ' + product.data.product);

  const { category } = await product.data.product;
  console.log('category: ' + category);

  // const productsCategory = await axios.get(
  //   `http://localhost:3000/api/products?category=${category}`,
  // );
  const productsCategory = await getProducts({ params: [category] });
  console.log('productsCategory' + productsCategory.data.productList);

  // const products = await getProducts();
  // console.log('products: ' + products.data.productList);
  return {
    props: {
      // relatedProducts: productsCategory.data.productList,
      product: product.data.product,
    },
    revalidate: 10,
  };
};
