import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { PATH } from 'src/routes';
import styles from './Hero.module.css';

const mk = classNames.bind(styles);

export function HeroSection() {
  return (
    <section className={mk('hero')}>
      <div className={mk('bg-image-rgba')}>
        <div className="flex flex-col items-center gap-60-px m-auto">
          <h1 className="display text-neutral-5">Thế Giới Nữ Trang</h1>
          <div className="flex flex-col items-center">
            <NormalDivider wrapper={mk('divider')} />
            <h3 className={mk('heading')}>
              Tôn vinh vẻ đẹp phái nữ - Trao quà tặng - Trao yêu thương
            </h3>
            <NormalDivider wrapper={mk('divider')} />
          </div>
          <Button normal internalLink={PATH.home}>
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
}
