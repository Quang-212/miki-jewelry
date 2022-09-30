import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Animation, {
  BOTTOM_TOP,
  LEFT_RIGHT,
  RIGHT_LEFT,
  SCALE_ZOOM,
  TOP_BOTTOM,
} from 'src/components/Animation';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';

import styles from './ProductCategory.module.css';

const mk = classNames.bind(styles);

export function ProductCategory() {
  const { push } = useRouter();

  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('product-category', 'container')}
    >
      <div className="flex items-center flex-wrap gap-10 w-[900px]">
        <Animation scroll variant={SCALE_ZOOM}>
          <Animation
            gestures
            className="w-254-px h-254-px rounded-tl-secondary bg-product-category-ring bg-cover bg-center drop-shadow-product-category cursor-pointer hover:rounded-secondary duration-200 "
          >
            <div
              onClick={() => push(PATH.PRODUCT_CATEGORY('ring'))}
              className="flex justify-center items-end w-auto h-full rounded-tl-secondary bg-product-category-ring-rgba hover:rounded-secondary duration-200 "
            >
              <span className="mb-6 heading-4 text-neutral-5">Nhẫn</span>
            </div>
          </Animation>
        </Animation>

        <Animation scroll variant={SCALE_ZOOM}>
          <Animation
            gestures
            className="w-254-px h-254-px bg-product-category-watch bg-cover bg-center drop-shadow-product-category hover:rounded-secondary duration-200"
          >
            <div
              onClick={() => push(PATH.PRODUCT_CATEGORY('ring'))}
              className="flex justify-center items-end w-auto h-full bg-product-category-watch-rgba cursor-pointer hover:rounded-secondary duration-200"
            >
              <span className="mb-6 heading-4 text-neutral-5">Đồng hồ</span>
            </div>
          </Animation>
        </Animation>

        <Animation
          scroll
          variant={TOP_BOTTOM}
          className="ml-[-12px] heading text-40-px leading-48-px"
        >
          <span>Miki Jewelry</span>
        </Animation>

        <Animation scroll variant={LEFT_RIGHT}>
          <Animation
            gestures
            className="w-450-px h-254-px rounded-bl-secondary bg-product-category-bracelet bg-cover bg-center-22% drop-shadow-product-category hover:rounded-secondary duration-200"
          >
            <div
              onClick={() => push(PATH.PRODUCT_CATEGORY('bracelet'))}
              className="flex justify-center items-end w-auto h-full rounded-bl-secondary bg-product-category-bracelet-rgba cursor-pointer hover:rounded-secondary duration-200"
            >
              <span className="mb-6 heading-4 text-neutral-5">Lắc tay</span>
            </div>
          </Animation>
        </Animation>

        <Animation scroll variant={RIGHT_LEFT}>
          <Animation
            gestures
            className="w-352-px h-254-px bg-product-category-necklace bg-cover bg-center drop-shadow-product-category hover:rounded-secondary duration-200"
          >
            <div
              onClick={() => push(PATH.PRODUCT_CATEGORY('necklace'))}
              className="flex justify-center items-end w-auto h-full bg-product-category-necklace-rgba cursor-pointer hover:rounded-secondary duration-200"
            >
              <span className="mb-6 heading-4 text-neutral-5">Dây chuyền</span>
            </div>
          </Animation>
        </Animation>
      </div>

      <Animation scroll variant={BOTTOM_TOP}>
        <Animation
          gestures
          className="w-254-px h-548-px rounded-r-secondary bg-product-category-earring bg-cover bg-center drop-shadow-product-category hover:rounded-secondary duration-200"
        >
          <div
            onClick={() => push(PATH.PRODUCT_CATEGORY('earring'))}
            className="flex justify-center items-end w-auto h-full rounded-r-secondary bg-product-category-earring-rgba cursor-pointer hover:rounded-secondary duration-200"
          >
            <span className="mb-6 heading-4 text-neutral-5">Bông tai</span>
          </div>
        </Animation>
      </Animation>
    </motion.section>
  );
}
