import classNames from 'classnames/bind';

import BrandLogo from 'src/components/BrandLogo';
import Copyright from 'src/components/Copyright';
import { Footer, Header, Sidebar, SubHeader } from '../components';
import styles from './MainLayout.module.css';

const mk = classNames.bind(styles);

export default function MainLayout({ variant, children }) {
  if (variant === 'footer') {
    return (
      <div className={mk('relative', 'wrapper', 'footer')}>
        <main className="m-auto">{children}</main>
        <Footer />
      </div>
    );
  }

  if (variant === 'admin') {
    return (
      <div className={mk('relative', 'sub-wrapper', 'admin')}>
        <Sidebar />
        <div className="flex flex-col gap-8 w-5/6">
          <SubHeader />
          <main>{children}</main>
        </div>
      </div>
    );
  }

  if (variant === '404') {
    return (
      <div className={mk('relative', 'sub-wrapper', 'not-found')}>
        <BrandLogo horizontal wrapper="mt-6" />
        <main className="m-auto">{children}</main>
        <Copyright>MikiShop © 2022. Thương hiệu thời trang hàng đầu Việt Nam</Copyright>
      </div>
    );
  }

  return (
    <div className="relative wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
