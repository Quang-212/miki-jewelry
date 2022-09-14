export default function ModalDelete() {
  return (
    <Dialog isOpen={isOpen} onClose={handleCloseModal} content="w-[600px] px-12">
      <div className="flex flex-col gap-10">
        <p className="heading-5">Bạn chắc chắn muốn bỏ sản phẩm này?</p>
        <p>
          Ram laptop 4gb DDR3L hoặc DDR3 bus 1600, 1333 và 1066 dùng cho laptop, và các loại khác,
          bảo hành 3 năm (2GB DDR3 BUS 1066,SAMSUNG).
        </p>
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
