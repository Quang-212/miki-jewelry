import { EllipseDashIcon, EllipseIcon } from 'src/components/Icons';

export function ProductCategorySection() {
  return (
    <section className="relative flex justify-between mt-120-px container">
      <div className="flex items-center flex-wrap gap-10 w-[900px]">
        <div className="w-254-px h-254-px rounded-tl-secondary bg-product-category-ring bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full rounded-tl-secondary bg-product-category-ring-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Nhẫn</span>
          </div>
        </div>
        <div className="w-254-px h-254-px bg-product-category-watch bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full bg-product-category-watch-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Đồng hồ</span>
          </div>
        </div>
        <span className="ml-[-12px] heading text-40-px leading-48-px">Miki Jewelry</span>
        <div className="w-450-px h-254-px rounded-bl-secondary bg-product-category-bracelet bg-cover bg-center-22% drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full rounded-bl-secondary bg-product-category-bracelet-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Lắc tay</span>
          </div>
        </div>
        <div className="w-352-px h-254-px bg-product-category-necklace bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full bg-product-category-necklace-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Dây chuyền</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-254-px h-548-px rounded-r-secondary bg-product-category-earring bg-cover bg-center drop-shadow-product-category">
        <div className="flex justify-center items-end w-auto h-full rounded-r-secondary bg-product-category-earring-rgba">
          <span className="mb-6 heading-4 text-neutral-5">Bông tai</span>
        </div>
      </div>
      <EllipseIcon
        width="112"
        height="551"
        cx="-163.5"
        cy="275.5"
        r="275.5"
        fillOpacity="0.15"
        className="absolute top-[62%] left-[0%]"
      />
      <EllipseIcon
        width="57"
        height="441"
        cx="-163.5"
        cy="220.5"
        r="220.453"
        fillOpacity="0.1"
        className="absolute top-[72%] left-[0%]"
      />
      <EllipseIcon
        width="111"
        height="387"
        cx="275.5"
        cy="275.5"
        r="275.5"
        fillOpacity="0.15"
        className="absolute top-[146.7%] left-[92.3%]"
      />
      <EllipseIcon
        width="56"
        height="332"
        cx="220.5"
        cy="220.5"
        r="220.453"
        fillOpacity="0.1"
        className="absolute top-[156.8%] left-[96.1%]"
      />
      <EllipseDashIcon
        width="328"
        height="833"
        cx="416.5"
        cy="416.5"
        r="416"
        className="absolute top-[-98%] left-[77%]"
      />
      <EllipseDashIcon
        width="35"
        height="246"
        cx="123"
        cy="123"
        r="122.5"
        className="absolute top-[-37%] left-[97.7%]"
      />
    </section>
  );
}
