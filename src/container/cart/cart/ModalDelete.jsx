import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';

export default function ModalDelete({ handleDeleteCartItem, productName, confirm, setConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setConfirm((prev) => ({ ...prev, delete: false }));
    setIsOpen(false);
  };

  useEffect(() => {
    confirm.delete && setIsOpen(true);
  }, [confirm.delete]);

  return (
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
      <div className="flex flex-col gap-10">
        <p className="heading-5">Bạn chắc chắn muốn bỏ sản phẩm này?</p>
        <p>{productName}</p>
        <div className="flex justify-between gap-8 mt-10">
          <Button primary onClick={handleDeleteCartItem} wrapper="w-full">
            Đồng ý
          </Button>
          <Button outline onClick={handleCloseModal} wrapper="w-full">
            Không
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
