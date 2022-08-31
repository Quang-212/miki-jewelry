import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { BasketIcon, UserIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import Menu from 'src/components/Popper/Menu';
import { images } from 'src/constants';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import MenuCategory from '../MenuCategory';
import styles from './Header.module.css';
import { MENU_ITEMS, NAVIGATION_LINKS, USER_MENU_ITEMS } from './nav-config';
import Search from '../Search';

const mk = classNames.bind(styles);

export function Header() {
  const { data: session } = useSession();

  const { pathname, push } = useRouter();

  const currentUser = true;

  const handleMenuChange = (menuItem) => {
    // console.log(menuItem);
    switch (menuItem.type) {
      case 'language':
      // handle change language
      default:
    }
  };

  return (
    <header className={mk('header', 'container')}>
      <nav className={mk('nav')}>
        <ul className="flex gap-10 mb-2">
          {NAVIGATION_LINKS.map((item, index) => {
            const NavLinkItemWrapper = index === 1 ? MenuCategory : Fragment;

            return (
              <li key={index} className="flex items-center gap-14-px">
                <NavLinkItemWrapper>
                  <Button
                    text
                    internalLink={item.path}
                    title={mk({ active: pathname === item.path })}
                  >
                    {item.title}
                  </Button>
                </NavLinkItemWrapper>
              </li>
            );
          })}
        </ul>
        <BrandLogo vertical />
        <div className="flex items-center">
          <Search />

          <div className="flex gap-8">
            <Button icon internalLink={PATH.home}>
              <BasketIcon />
            </Button>

            <Menu items={currentUser ? USER_MENU_ITEMS : MENU_ITEMS} onChange={handleMenuChange}>
              {currentUser ? (
                <div className="flex items-center">
                  <Image
                    src={images.adminAvatar}
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="">
                  <Button icon internalLink={PATH.login}>
                    <UserIcon />
                  </Button>
                </div>
              )}
            </Menu>

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
