import BrandLogo from 'src/components/BrandLogo';
import Copyright from 'src/components/Copyright';
import Footer from '../components/Footer';
import Header from '../components/Header';
import classNames from 'classnames/bind';

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
      <div className={mk('relative', 'wrapper', 'admin')}>
        <Header />
        {/* <Sidebar /> */}
        <h1>Admin Layout</h1>
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  if (variant === '404') {
    return (
      <div className={mk('relative', 'wrapper', 'not-found')}>
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
