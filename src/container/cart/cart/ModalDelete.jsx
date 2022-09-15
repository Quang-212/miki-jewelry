import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';

export default function ModalDelete({
  fallback,
  handleDeleteCartItem,
  productName,
  confirm,
  setConfirm,
}) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const handleCloseModalDelete = () => {
    setConfirm((prev) => ({ ...prev, delete: false }));
    setIsOpenModalDelete(false);
  };

  useEffect(() => {
    (fallback < 1 || confirm.delete) && setIsOpenModalDelete(true);
  }, [fallback, confirm.delete]);

  return (
    <Dialog
      isOpen={isOpenModalDelete}
      closeModal={handleCloseModalDelete}
      content="w-[600px] px-12"
    >
      <div className="flex flex-col gap-10">
        <p className="heading-5">Bạn chắc chắn muốn bỏ sản phẩm này?</p>
        <p>{productName}</p>
        <div className="flex justify-between gap-8 mt-10">
          <Button primary onClick={handleDeleteCartItem} wrapper="w-full">
            Đồng ý
          </Button>
          <Button outline onClick={handleCloseModalDelete} wrapper="w-full">
            Không
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
