import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';

export default function ModalQuantity({ availableQuantity, confirm, setConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setConfirm((prev) => ({ ...prev, quantity: false }));
    setIsOpen(false);
  };

  useEffect(() => {
    confirm.quantity && setIsOpen(true);
  }, [confirm.quantity]);
  return (
    <Dialog isOpen={isOpen} closeModal={handleClose} content="w-[600px] px-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <p>Chỉ còn {availableQuantity} sản phẩm cho mặt hàng này</p>
        <div className="flex justify-between gap-8 mt-10">
          <Button primary onClick={handleClose} wrapper="w-full">
            Đồng ý
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
