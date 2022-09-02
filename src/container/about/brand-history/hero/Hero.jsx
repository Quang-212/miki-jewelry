import classNames from 'classnames/bind';

import styles from './Hero.module.css';

const mk = classNames.bind(styles);

export default function Hero() {
  return (
    <section className={mk('hero')}>
      <div className={mk('bg-image-rgba')}>
        <article className={mk('content')}>
          <h1 className={mk('title')}>
            <q>Miki Jewelry - Tales of Happiness</q>
          </h1>
          <p>
            Lần đầu ra mắt thị trường vào năm 2015, Miki mong muốn mang tới những sản phẩm Nữ trang
            được đầu tư về thiết kế, minh bạch về thông tin giao dịch hàng hoá và mang đến khách
            hàng dịch vụ hậu mãi trọn vẹn.
          </p>
        </article>
      </div>
    </section>
  );
}
