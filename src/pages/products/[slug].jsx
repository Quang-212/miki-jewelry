import decode from 'jwt-decode';
import Breadcrumb from 'src/components/Breadcrumb';
import { StarDivider } from 'src/components/Dividers';
import Page from 'src/components/Page';
import { Images, MainInformation, MoreInformation, Suggestion } from 'src/container/product';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ProductDetail({ product = {}, relatedProducts }) {
  console.log(relatedProducts);
  const { name, category, description, slug, images } = product;
  const generateCategory = (category) => {
    switch (category) {
      case 'ring':
        return 'Nhẫn';
      case 'necklace':
        return 'Dây chuyền';
      case 'earring':
        return 'Bông tai';
      default:
        return 'Lắc';
    }
  };

  const breadcrumbs = [
    {
      label: 'Tất cả sản phẩm',
      href: PATH.products,
    },
    {
      label: generateCategory(category),
      href: `/products?category=${category}`,
    },
    {
      label: name,
      href: `/products/${slug}`,
    },
  ];

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
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="flex justify-between gap-10">
          <Images images={images} name={name} />
          <MainInformation product={product} />
        </div>
        <MoreInformation />
        <StarDivider wrapper="mt-8" />
        <div>Sản phẩm đã xem</div>
        <Suggestion relatedProducts={relatedProducts} />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params, req }) => {
  try {
    const slug = params.slug;
    const token = req.cookies.refreshToken;
    const payload = token && decode(token);
    const product = await getProducts([slug], {
      ...(payload && { userId: payload._id }),
    });
    const { category } = product.data.data;

    const relatedProducts = await getProducts([], {
      category,
      limit: 4,
      sortBy: 'sold',
      order: -1,
    });
    return {
      props: {
        product: product.data.data || {},
        relatedProducts: relatedProducts.data.data.products || [],
      },
    };
  } catch (error) {
    console.log(error);
  }
};
