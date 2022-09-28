import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { CloseIcon } from 'src/components/Icons';

export default function ModalLeaving({ isOpen, setIsOpen }) {
  const handleCloseModal = () => {
    return setIsOpen((prev) => ({ ...prev, leaving: false, review: false }));
  };

  const handleStayModal = () => {
    return setIsOpen((prev) => ({ ...prev, review: true, leaving: false }));
  };

  return (
    <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end cursor-pointer">
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <p className="text-lg">
          Đánh giá của bạn rất quan trọng đối với chúng tôi! Bạn có chắc muốn rời khỏi trang đánh
          giá này không?
        </p>
        <div className="flex justify-between gap-8 mt-10">
          <Button outline onClick={handleCloseModal} wrapper="w-full">
            Rời khỏi
          </Button>
          <Button primary onClick={handleStayModal} wrapper="w-full">
            Ở lại
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
