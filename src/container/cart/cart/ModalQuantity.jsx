import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';

export default function ModalQuantity({
  fallback,
  isOutOfStock,
  availableQuantity,
  confirm,
  setConfirm,
}) {
  const [isOpenModalQuantity, setIsOpenModalQuantity] = useState(false);

  const handleCloseModalQuantity = () => {
    setConfirm((prev) => ({ ...prev, quantity: false }));
    setIsOpenModalQuantity(false);
  };

  useEffect(() => {
    (isOutOfStock(fallback) || confirm.quantity) && setIsOpenModalQuantity(true);
  }, [fallback, confirm.quantity]);
  return (
    <Dialog
      isOpen={isOpenModalQuantity}
      closeModal={handleCloseModalQuantity}
      content="w-[600px] px-12"
    >
      <div className="flex flex-col gap-10">
        <p>Chỉ còn {availableQuantity} sản phẩm cho mặt hàng này</p>
        <div className="flex justify-between gap-8 mt-10">
          <Button primary onClick={handleCloseModalQuantity} wrapper="w-full">
            Đồng ý
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
