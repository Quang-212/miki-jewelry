import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { BasketIcon, UserIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import Menu from 'src/components/Popper/Menu';
import { images } from 'src/constants';
import { useClientSide, useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import MenuCategory from '../MenuCategory';
import styles from './Header.module.css';
import {
  handleMenuItems,
  handleMenuUserItems,
  MENU_ITEMS,
  NAVIGATION_LINKS,
  PRODUCTS_CATEGORY_LINKS,
  USER_MENU_ITEMS,
} from './nav-config';
import Search from '../Search';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'src/recoils';
import { getLocalStorage } from 'src/utils/handleLocalStorage';
import { logoutForm } from 'src/fetching/auth';
import Avatar from 'src/components/Avatar';
import Cart from '../Cart';

const mk = classNames.bind(styles);

export function Header() {
  const isClient = useClientSide();

  const { data: session } = useSession();
  const { pathname, push, replace } = useRouter();

  const { user, isAuthenticated } = useRecoilValue(userState);

  const resetUserValue = useResetRecoilState(userState);

  const handleClickLogin = () => push(PATH.login);

  const handleClickLogout = async () => {
    if (user?._id) {
      const res = await logoutForm({ params: { userId: user?._id } });
      console.log(res);

      resetUserValue();
      replace(PATH.home);
    }
  };

  return (
    <header className={mk('header', 'container')}>
      <nav className={mk('nav')}>
        <ul className="flex gap-10 mb-2">
          {NAVIGATION_LINKS.map((item, index) => (
            <li key={index} className="flex items-center gap-14-px">
              <MenuCategory isCate={index === 1}>
                <Button
                  text
                  internalLink={item.path}
                  title={mk({ active: pathname === item.path })}
                >
                  {item.title}
                </Button>
              </MenuCategory>
            </li>
          ))}
        </ul>
        <BrandLogo vertical />
        <div className="flex items-center">
          <Search />

          <div className="flex gap-8">
            <Cart />

            <Menu
              items={
                isAuthenticated
                  ? handleMenuUserItems({ handleClickLogout })
                  : handleMenuItems(handleClickLogin)
              }
            >
              {isClient && isAuthenticated ? (
                <div className="flex items-center">
                  <Avatar name={user?.userName} imageUrl="" />
                </div>
              ) : (
                <div>
                  <Button icon>
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
