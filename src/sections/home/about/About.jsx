import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';
import styles from './About.module.css';

const mk = classNames.bind(styles);

export function AboutSection() {
  return (
    <section className={mk('about', 'container')}>
      <article className={mk('col-1')}>
        <h2 className="heading-2">Về chúng tôi</h2>
        <q className="heading">Ngày mai phải tốt hơn ngày hôm nay</q>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <Button primary internalLink={PATH.brandHistory} wrapper="mt-66-px max-w-218-px">
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
