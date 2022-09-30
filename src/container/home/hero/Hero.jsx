import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Animation, { LEFT_RIGHT, RIGHT_LEFT, SCALE_ZOOM } from 'src/components/Animation';
import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { PATH } from 'src/routes';
import styles from './Hero.module.css';

const mk = classNames.bind(styles);

export function Hero() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className={mk('hero')}>
        <div className={mk('bg-image-rgba')}>
          <div className="flex flex-col items-center gap-60-px m-auto">
            <Animation scroll variant={LEFT_RIGHT}>
              <h1 className="display text-neutral-5">Thế Giới Nữ Trang</h1>
            </Animation>
            <div className="flex flex-col items-center">
              <Animation scroll variant={RIGHT_LEFT}>
                <NormalDivider wrapper={mk('divider')} />
                <h3 className={mk('heading')}>
                  Tôn vinh vẻ đẹp phái nữ - Trao quà tặng - Trao yêu thương
                </h3>
                <NormalDivider wrapper={mk('divider')} />
              </Animation>
            </div>
            <Animation scroll variant={SCALE_ZOOM}>
              <Button normal internalLink={PATH.HOME}>
                Tìm hiểu thêm
              </Button>
            </Animation>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
