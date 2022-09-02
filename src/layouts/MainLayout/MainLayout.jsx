import classNames from 'classnames/bind';

import BrandLogo from 'src/components/BrandLogo';
import Copyright from 'src/components/Copyright';
import { Footer, Header, Sidebar, SubHeader } from '../components';
import styles from './MainLayout.module.css';

const mk = classNames.bind(styles);

export default function MainLayout({ variant, children }) {
  switch (variant) {
    case 'footer':
      return (
        <div className={mk('wrapper', 'footer')}>
          <main className="m-auto">{children}</main>
          <Footer />
        </div>
      );

    case 'admin':
      return (
        <div className={mk('sub-wrapper', 'admin')}>
          <Sidebar />
          <div className="flex flex-col gap-8 w-5/6">
            <SubHeader />
            <main>{children}</main>
          </div>
        </div>
      );

    case '404':
      return (
        <div className={mk('sub-wrapper', 'not-found')}>
          <BrandLogo horizontal wrapper="mt-6" />
          <main className="m-auto">{children}</main>
          <Copyright>MikiShop © 2022. Thương hiệu thời trang hàng đầu Việt Nam</Copyright>
        </div>
      );

    default:
      return (
        <div className={mk('wrapper', 'default')}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      );
  }
}
