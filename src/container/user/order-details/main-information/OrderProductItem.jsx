import { useState } from 'react';

import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { ModalCompleted, ModalLeaving, ModalReview } from 'src/container/reviews';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';

export default function OrderProductItem({ data }) {
  const [isOpen, setIsOpen] = useState({
    review: false,
    leaving: false,
    completed: false,
  });

  const { push } = useRouter();

  const { product, size, quantity } = data;

  const handleComment = () => {
    setIsOpen((prev) => ({ ...prev, review: true }));
  };

  const primaryImageURL = (images) => images.find((image) => image.type === 'primary').url;

  const generatePrice = (product) => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const oldPrice = generatePrice(product);
  const discountPrice = (oldPrice * product.discount) / 100;
  const newPrice = oldPrice - discountPrice;

  const handleGoToDetail = () => push(PATH.PRODUCT_DETAIL(product.slug));

  return (
    <>
      <div className="grid grid-cols-12 gap-x-4 mt-2">
        <div className="col-span-6 grid grid-cols-12 gap-y-2">
          <div className="col-span-2 row-span-4 flex items-start">
            <Image src={primaryImageURL(product.images)} alt="" width={80} height={80} />
          </div>
          <p className="col-span-10">{product.name}</p>
          <p className="col-span-10">Kích thước: {size}</p>
          <p className="col-span-10">Sku: 2489747574223</p>
          <Button outline onClick={handleComment} wrapper="col-span-5 mt-2 mr-2">
            Viết nhận xét
          </Button>
          <Button outline onClick={handleGoToDetail} wrapper="col-span-5 mt-2 ml-2">
            Mua lại
          </Button>
        </div>
        <span className="col-span-2 justify-self-center">{formatVndCurrency(oldPrice)}</span>
        <span className="col-span-1 justify-self-center">{quantity}</span>
        <span className="col-span-1 justify-self-center">{formatVndCurrency(discountPrice)}</span>
        <span className="col-span-2 justify-self-center">{formatVndCurrency(newPrice)}</span>
      </div>

      <ModalReview isOpen={isOpen.review} order={data} setIsOpen={setIsOpen} />
      <ModalLeaving isOpen={isOpen.leaving} setIsOpen={setIsOpen} />
      <ModalCompleted isOpen={isOpen.completed} setIsOpen={setIsOpen} />
    </>
  );
}
