import React, { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { CloseIcon } from 'src/components/Icons';

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
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <p className="text-lg">Chỉ còn {availableQuantity} sản phẩm cho mặt hàng này</p>
        <Button primary onClick={handleCloseModal} wrapper="w-full mt-10">
          Đồng ý
        </Button>
      </div>
    </Dialog>
  );
}
