import classNames from 'classnames/bind';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { CaretDownIcon, SearchIcon, UserIcon } from 'src/components/Icons';
import { PATH } from 'src/routes';
import styles from './Header.module.css';
import { navCta, navLink } from './nav-config';

const mk = classNames.bind(styles);

export function Header() {
  const [iconDirection, setIconDirection] = useState('up');
  const { data: session } = useSession();

  const { pathname } = useRouter();

  return (
    <header className={mk('header', 'container')}>
      <nav className={mk('nav')}>
        <ul className="flex gap-10 mb-2">
          {navLink.map((item, index) => (
            <li key={index} className="flex items-center gap-14-px">
              <Button text internalLink={item.path} title={mk({ active: pathname === item.path })}>
                {item.title}
              </Button>
              {index === 1 && (
                <CaretDownIcon
                  direction={iconDirection}
                  className="cursor-pointer"
                  handleClick={() =>
                    setIconDirection((preState) => (preState === 'up' ? 'down' : 'up'))
                  }
                />
              )}
            </li>
          ))}
        </ul>
        <BrandLogo vertical />
        <div className="flex items-center">
          <div className="flex relative mr-8">
            <input placeholder="Tìm kiếm" className={mk('input-search')} />
            <SearchIcon className={mk('search-icon')} />
          </div>
          <ul className="flex gap-8">
            {navCta.map((item, index) => (
              <li key={index}>
                <Button icon internalLink={item.path}>
                  {item.icon}
                </Button>
              </li>
            ))}
            <li>
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
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
