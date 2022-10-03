import classNames from 'classnames/bind';

import BrandLogo from 'src/components/BrandLogo';
import Cart from '../Cart';
import Navigation from '../Navigation';
import { Notifications } from '../Notifications';
import Search from '../Search';
import User from '../User';
import GlobalEvent from './GlobalEvent';
import styles from './Header.module.css';

const mk = classNames.bind(styles);

export function Header() {
  return (
    <header className={mk('header')}>
      <GlobalEvent />
      <nav className={mk('nav')}>
        <Navigation />
        <BrandLogo vertical />
        <div className="flex items-center">
          <Search />
          <div className="flex gap-8">
            <Cart />
            <Notifications />
            <User />
          </div>
        </div>
      </nav>
    </header>
  );
}
