import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import Animation, { LEFT_RIGHT, RIGHT_LEFT, SCALE_ZOOM } from 'src/components/Animation';

import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { PATH } from 'src/routes';
import styles from './About.module.css';

const mk = classNames.bind(styles);

export function About() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('about', 'container')}
    >
      <Animation scroll variant={LEFT_RIGHT} className={mk('article')}>
        <h2 className={mk('title')}>Về chúng tôi</h2>
        <q className={mk('heading')}>Ngày mai phải tốt hơn ngày hôm nay</q>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button primary internalLink={PATH.BRAND_HISTORY} wrapper={mk('btn')}>
          Tìm hiểu thêm
        </Button>
      </Animation>

      <Animation scroll variant={SCALE_ZOOM} className="z-50">
        <Image
          src={images.homeAbout}
          alt="Picture of Miki about"
          width={548}
          height={537}
          priority
          objectFit="cover"
          placeholder="blur"
          className={mk('image')}
        />
      </Animation>
    </motion.section>
  );
}
