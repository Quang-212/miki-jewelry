import classNames from 'classnames/bind';

import { EllipseIcon } from 'src/components/Icons';
import styles from './ProductCategory.module.css';

const mk = classNames.bind(styles);

export function ProductCategory() {
  return (
    <section className={mk('product-category')}>
      <div className="flex items-center flex-wrap gap-10 w-[900px]">
        <div className="w-254-px h-254-px rounded-tl-secondary bg-product-category-ring bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full rounded-tl-secondary bg-product-category-ring-rgba">
            <span className="mb-6 font-primary font-bold text-2xl leading-8 text-primary text-neutral-5">
              Nhẫn
            </span>
          </div>
        </div>
        <div className="w-254-px h-254-px bg-product-category-watch bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full bg-product-category-watch-rgba">
            <span className="mb-6 font-primary font-bold text-2xl leading-8 text-primary text-neutral-5">
              Đồng hồ
            </span>
          </div>
        </div>
        <span className="ml-[-12px] font-secondary font-bold text-5xl leading-58-px text-primary uppercase text-40-px leading-48-px">
          Miki Jewelry
        </span>
        <div className="w-450-px h-254-px rounded-bl-secondary bg-product-category-bracelet bg-cover bg-center-22% drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full rounded-bl-secondary bg-product-category-bracelet-rgba">
            <span className="mb-6 font-primary font-bold text-2xl leading-8 text-primary text-neutral-5">
              Lắc tay
            </span>
          </div>
        </div>
        <div className="w-352-px h-254-px bg-product-category-necklace bg-cover bg-center drop-shadow-product-category">
          <div className="flex justify-center items-end w-auto h-full bg-product-category-necklace-rgba">
            <span className="mb-6 font-primary font-bold text-2xl leading-8 text-primary text-neutral-5">
              Dây chuyền
            </span>
          </div>
        </div>
      </div>
      <div className="w-254-px h-548-px rounded-r-secondary bg-product-category-earring bg-cover bg-center drop-shadow-product-category">
        <div className="flex justify-center items-end w-auto h-full rounded-r-secondary bg-product-category-earring-rgba">
          <span className="mb-6 font-primary font-bold text-2xl leading-8 text-primary text-neutral-5">
            Bông tai
          </span>
        </div>
      </div>
    </section>
  );
}
