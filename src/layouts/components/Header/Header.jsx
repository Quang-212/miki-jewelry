import classNames from 'classnames/bind';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import HeadlessTippy from '@tippyjs/react/headless';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { CaretDownIcon, SearchIcon, UserIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import useRouter from 'src/hooks/useRouter';
import { PATH } from 'src/routes';
import styles from './Header.module.css';
import { navCta, NAVIGATION_LINKS } from './nav-config';
import ProductsCategoryMenu from './ProductsCategoryMenu';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import ProductItem from 'src/components/ProductItem';

const mk = classNames.bind(styles);

export function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const { data: session } = useSession();

  const { pathname, push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3, 4]);
    }, 3000);
  }, []);

  return (
    <header className={mk('header', 'container')}>
      <nav className={mk('nav')}>
        <ul className="flex gap-10 mb-2">
          {NAVIGATION_LINKS.map((item, index) => (
            <li key={index} className="flex items-center gap-14-px">
              {index === 1 ? (
                <ProductsCategoryMenu
                  title={item.title}
                  button={
                    pathname === item.path
                      ? 'flex items-center gap-2 font-bold'
                      : 'flex items-center gap-2'
                  }
                  href={item.path}
                />
              ) : (
                <Button
                  text
                  internalLink={item.path}
                  title={mk({ active: pathname === item.path })}
                >
                  {item.title}
                </Button>
              )}
            </li>
          ))}
        </ul>
        <BrandLogo vertical />
        <div className="flex items-center">
          <HeadlessTippy
            visible={searchResult.length > 0}
            interactive
            render={(attrs) => (
              <div className="w-[400px]" tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <h4 className="py-1 px-3">Sản phẩm: 4</h4>
                  <div className="flex flex-col divide-y-2">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                  </div>
                </PopperWrapper>
              </div>
            )}
          >
            <div className="flex relative mr-8">
              <input placeholder="Tìm kiếm" className={mk('input-search')} />
              <SearchIcon className={mk('search-icon')} />
            </div>
          </HeadlessTippy>

          <ul className="flex gap-8">
            {navCta.map((item, index) => (
              <li key={index}>
                <Button icon internalLink={item.path}>
                  {item.icon}
                </Button>
              </li>
            ))}
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
