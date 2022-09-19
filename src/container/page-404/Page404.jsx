import className from 'classnames/bind';

import Button from 'src/components/Button';
import { PATH } from 'src/routes';
import styles from './Page404.module.css';

const mk = className.bind(styles);

export default function Page404Section() {
  return (
    <section className={mk('page-not-found')}>
      <h2 className={mk('text-404', 'font-primary font-bold text-5xl leading-58-px text-primary')}>
        404
      </h2>
      <h1 className="mt-8 font-primary font-bold text-5xl leading-58-px text-primary font-black">
        Không tìm thấy nội dung
      </h1>
      <ul className="mt-4 flex flex-col items-center gap-2">
        <li>
          URL của nội dung này đã <strong>bị thay đổi</strong> hoặc{' '}
          <strong>không còn tồn tại</strong>.
        </li>
        <li>
          Nếu bạn <strong>đang lưu URL này</strong>, hãy thử{' '}
          <strong>truy cập lại từ trang chủ</strong> thay vì dùng URL đã lưu.
        </li>
      </ul>
      <Button primary internalLink={PATH.home} wrapper="mt-2">
        Truy cập trang chủ
      </Button>
      <p>
        👉 hoặc đi tới{' '}
        <Button text internalLink={PATH.products} title={mk('title-btn-products')}>
          Sản phẩm
        </Button>
      </p>
    </section>
  );
}
