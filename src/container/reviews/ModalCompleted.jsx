import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { CloseIcon } from 'src/components/Icons';

export default function ModalCompleted({ isOpen, setIsOpen }) {
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
        <p className="heading-4">Cảm ơn bạn đã đánh giá!</p>
        <p className="text-lg">
          Chúng tôi sẽ thông báo đến bạn khi đánh giá được duyệt. Đánh giá của bạn sẽ giúp mọi người
          mua sắm tốt hơn.
        </p>
        <Button primary onClick={handleCloseModal} wrapper="w-full mt-10">
          Không có gì
        </Button>
      </div>
    </Dialog>
  );
}
