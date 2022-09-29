import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Animation, {
  BOTTOM_TOP,
  LEFT_RIGHT,
  RIGHT_LEFT,
  SCALE_ZOOM,
  TOP_BOTTOM,
} from 'src/components/Animation';

import styles from './ProductCategory.module.css';

const mk = classNames.bind(styles);

export function ProductCategory() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('product-category', 'container')}
    >
      <div className="flex items-center flex-wrap gap-10 w-[900px]">
        <Animation
          variant={SCALE_ZOOM}
          className="w-254-px h-254-px rounded-tl-secondary bg-product-category-ring bg-cover bg-center drop-shadow-product-category"
        >
          <div className="flex justify-center items-end w-auto h-full rounded-tl-secondary bg-product-category-ring-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Nhẫn</span>
          </div>
        </Animation>

        <Animation
          variant={SCALE_ZOOM}
          className="w-254-px h-254-px bg-product-category-watch bg-cover bg-center drop-shadow-product-category"
        >
          <div className="flex justify-center items-end w-auto h-full bg-product-category-watch-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Đồng hồ</span>
          </div>
        </Animation>

        <Animation variant={TOP_BOTTOM} className="ml-[-12px] heading text-40-px leading-48-px">
          <span>Miki Jewelry</span>
        </Animation>

        <Animation
          variant={LEFT_RIGHT}
          className="w-450-px h-254-px rounded-bl-secondary bg-product-category-bracelet bg-cover bg-center-22% drop-shadow-product-category"
        >
          <div className="flex justify-center items-end w-auto h-full rounded-bl-secondary bg-product-category-bracelet-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Lắc tay</span>
          </div>
        </Animation>

        <Animation
          variant={RIGHT_LEFT}
          className="w-352-px h-254-px bg-product-category-necklace bg-cover bg-center drop-shadow-product-category"
        >
          <div className="flex justify-center items-end w-auto h-full bg-product-category-necklace-rgba">
            <span className="mb-6 heading-4 text-neutral-5">Dây chuyền</span>
          </div>
        </Animation>
      </div>
      <Animation
        variant={BOTTOM_TOP}
        className="w-254-px h-548-px rounded-r-secondary bg-product-category-earring bg-cover bg-center drop-shadow-product-category"
      >
        <div className="flex justify-center items-end w-auto h-full rounded-r-secondary bg-product-category-earring-rgba">
          <span className="mb-6 heading-4 text-neutral-5">Bông tai</span>
        </div>
      </Animation>
    </motion.section>
  );
}
