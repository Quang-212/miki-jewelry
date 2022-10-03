import decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Breadcrumb from 'src/components/Breadcrumb';
import { StarDivider } from 'src/components/Dividers';
import Page from 'src/components/Page';
import {
  Images,
  MainInformation,
  MoreInformation,
  RelatedProducts,
  ViewedProducts,
} from 'src/container/product-details';
import { getFeedbackByFilters, getStableFeedbackProperties } from 'src/fetching/feedback';
import { getProducts } from 'src/fetching/products';
import MainLayout from 'src/layouts/MainLayout';
import { feedbackFilterState } from 'src/recoils/feedbackFilterState';
import { PATH } from 'src/routes';
import { averageRating } from 'src/utils/averageRating';

ProductDetail.getLayout = (page) => <MainLayout>{page}</MainLayout>;

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

export default function ProductDetail({ product = {}, relatedProducts }) {
  const [reviews, setReviews] = useState({});

  const { type, filters } = useRecoilValue(feedbackFilterState);

  const { _id, name, category, description, slug, images } = product;

  useEffect(() => {
    if (_id) {
      getFeedbackByFilters({
        productId: _id,
        find_type: type,
        rating: filters.rating,
        ...(filters.others.includes('newest') && { order: 'newest' }),
        properties: filters.others,
      })
        .then(({ data: feedbacks }) => {
          setReviews((prev) => ({ ...prev, ...feedbacks.data }));
        })
        .catch((error) => console.log(error));
    }
  }, [_id, type, filters]);

  useEffect(() => {
    if (_id) {
      getStableFeedbackProperties({ productId: _id })
        .then(({ data: feedbackProperties }) => {
          setReviews((prev) => ({ ...prev, ...feedbackProperties.data }));
        })
        .catch((error) => console.log(error));
    }
  }, [_id]);

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  const breadcrumbs = [
    {
      label: 'Tất cả sản phẩm',
      href: PATH.PRODUCTS,
    },
    {
      label: generateCategory(category),
      href: PATH.PRODUCT_CATEGORY(category),
    },
    {
      label: name,
      href: PATH.PRODUCT_DETAIL(slug),
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
          <MainInformation product={product} averageRating={averageRating(reviews?.rating)} />
        </div>
        <MoreInformation reviews={reviews} />
        <StarDivider wrapper="mt-8" />
        <ViewedProducts />
        <RelatedProducts relatedProducts={relatedProducts} />
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
      limit: 16,
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
