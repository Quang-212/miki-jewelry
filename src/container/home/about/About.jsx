import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { PATH } from 'src/routes';
import styles from './About.module.css';

const mk = classNames.bind(styles);

export function About() {
  return (
    <section className={mk('about')}>
      <article className={mk('article')}>
        <h2 className={mk('title')}>Về chúng tôi</h2>
        <q className={mk('font-secondary font-bold text-5xl leading-58-px text-primary uppercase')}>
          Ngày mai phải tốt hơn ngày hôm nay
        </q>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button primary internalLink={PATH.brandHistory} wrapper={mk('btn')}>
          Tìm hiểu thêm
        </Button>
      </article>
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
    </section>
  );
}
