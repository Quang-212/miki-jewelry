import classNames from 'classnames/bind';
// import { useSession } from 'next-auth/react';

import BrandLogo from 'src/components/BrandLogo';
import { BellRingIcon } from 'src/components/Icons';
import Cart from '../Cart';
import Navigation from '../Navigation';
import { Notifications } from '../Notifications';
import Search from '../Search';
import User from '../User';
import GlobalEvent from './GlobalEvent';
import styles from './Header.module.css';

const mk = classNames.bind(styles);

export function Header() {
  // const { data: session } = useSession();

  return (
    <header className={mk('header', 'container')}>
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

            {/* <li>
              {session ? (
                <>
                  <Image width={40} height={40} className="rounded-full" src={session.user.image} />
                  <span>{session.user.email}</span>
                  <button onClick={() => signOut()}>Đăng xuất</button>
                </>
              ) : (
                <Button icon internalLink={PATH.LOGIN}>
                  <UserIcon />
                </Button>
              )}
            </li> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
