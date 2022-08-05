import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';
import styles from './LatestCollection.module.css';

const mk = classNames.bind(styles);

export function LatestCollectionSection() {
  return (
    <section className={mk('latest-collection')}>
      <Image
        src={images.homeLatestCollection}
        alt="Home latest collection"
        objectFit="contain"
        layout="fill"
        className={mk('image')}
      />
      <div className={mk('framer')}></div>
      <article className={mk('article')}>
        <h6 className={mk('heading')}>Bộ sưu tập mới nhất</h6>
        <h6 className={mk('title')}>Ánh trăng người tình</h6>
        <p className={mk('body')}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button normal internalLink={PATH.products} wrapper={mk('btn')}>
          Tìm hiểu thêm
        </Button>
      </article>
    </section>
  );
}
