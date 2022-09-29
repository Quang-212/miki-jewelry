import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Animation, {
  BOTTOM_TOP,
  LEFT_RIGHT,
  RIGHT_LEFT,
  SCALE_ZOOM,
  TOP_BOTTOM,
} from 'src/components/Animation';
import styles from './Hero.module.css';

const mk = classNames.bind(styles);

export default function Hero() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('hero')}
    >
      <div className={mk('bg-image-rgba')}>
        <article className={mk('content')}>
          <Animation variant={TOP_BOTTOM}>
            <h1 className={mk('title')}>
              <q>Miki Jewelry - Tales of Happiness</q>
            </h1>
          </Animation>
          <Animation variant={LEFT_RIGHT}>
            <p>
              Lần đầu ra mắt thị trường vào năm 2015, Miki mong muốn mang tới những sản phẩm Nữ
              trang được đầu tư về thiết kế, minh bạch về thông tin giao dịch hàng hoá và mang đến
              khách hàng dịch vụ hậu mãi trọn vẹn.
            </p>
          </Animation>
        </article>
      </div>
    </motion.section>
  );
}
