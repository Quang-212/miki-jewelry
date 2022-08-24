import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { MinusIcon, PlusIcon } from 'src/components/Icons';

export function ProductMainInformationSection() {
  return (
    <section className="flex flex-col gap-4 max-w-[539px]">
      <h2 className="heading-2">Bông tai Elean</h2>
      <div className="flex gap-24">
        <div className="flex items-center gap-4">
          <div>5.0 *****</div>
          <NormalDivider vertical="border-2 h-3 border-l-[1px] border-neutral-2" />
          <p>10 đã bán</p>
        </div>
        <span className="subtitle-1 text-caption-2">Còn hàng</span>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <span className="heading-3">500.000 đ</span>
        <NormalDivider vertical="border-2 h-5 border-l-[1px] border-neutral-2" />
        <span className="py-1 px-2 rounded-tag bg-discount text-neutral-5">-50%</span>
      </div>
      <span className="heading-1 text-primary-2">250.000 đ</span>
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-24">
          <div className="flex min-w-[100px]">Kích thước:</div>
          <div className="flex gap-8 flex-wrap">
            <span className="flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary">
              16
            </span>
            <span className="flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-primary text-neutral-5">
              17
            </span>
            <span className="flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary">
              18
            </span>
          </div>
        </div>
        <div className="flex gap-24">
          <div className="flex min-w-[100px]">Số lượng:</div>
          <div className="flex items-center gap-6">
            <Button icon wrapper="p-1 active:bg-primary active:rounded-full">
              <MinusIcon className="active:text-white h-6 w-6" />
            </Button>
            <span className="heading-5">1</span>
            <Button icon wrapper="active:bg-primary active:rounded-full">
              <PlusIcon className="active:text-white w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mt-4">
        <Button outline wrapper="w-254-px">
          Thêm vào giỏ hàng
        </Button>
        <Button primary>Mua ngay</Button>
      </div>
    </section>
  );
}
