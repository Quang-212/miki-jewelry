import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import 'tippy.js/dist/tippy.css';

import BrandLogo from 'src/components/BrandLogo';
import Cart from '../Cart';
import Navigation from '../Navigation';
import Search from '../Search';
import User from '../User';
import styles from './Header.module.css';

const mk = classNames.bind(styles);

export function Header() {
  const { data: session } = useSession();

  return (
    <header className={mk('header')}>
      <nav className={mk('nav')}>
        <Navigation />
        <BrandLogo vertical />
        <div className="flex items-center">
          <Search />
          <div className="flex gap-8">
            <Cart />
            <User />

            {/* <li>
              {session ? (
                <>
                  <Image width={40} height={40} className="rounded-full" src={session.user.image} />
                  <span>{session.user.email}</span>
                  <button onClick={() => signOut()}>Đăng xuất</button>
                </>
              ) : (
                <Button icon internalLink={PATH.login}>
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
