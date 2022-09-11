import classNames from 'classnames/bind';

import BrandLogo from 'src/components/BrandLogo';
import Copyright from 'src/components/Copyright';
import { NAVBAR } from 'src/config';
import { useCollapseDrawer } from 'src/hooks';
import { Footer, Header, Sidebar, SubHeader } from '../components';
import styles from './MainLayout.module.css';

const mk = classNames.bind(styles);

export default function MainLayout({ variant, children }) {
  const { isCollapseClick } = useCollapseDrawer();

  const mainStyle = {
    width: isCollapseClick
      ? `calc(100% - ${NAVBAR.WIDTH_COLLAPSE_DRAWER}px)`
      : `calc(100% - ${NAVBAR.WIDTH_DRAWER}px)`,
  };

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
        <div className={mk('admin')}>
          <SubHeader />
          <div className="flex-1">
            <Sidebar />
          </div>
          <main className={mk('main-admin')} style={mainStyle}>
            {children}
          </main>
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
