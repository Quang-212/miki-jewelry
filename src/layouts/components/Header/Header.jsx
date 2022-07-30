import Link from 'next/link';
import { useState } from 'react';
import Button from 'src/components/Button';

import { CaretDownIcon, LogoIcon, SearchIcon } from 'src/components/Icons';
import { PATH } from 'src/routes/path';
import { navCta, navLink } from './navConfig';

export default function Header() {
  const [iconDirection, setIconDirection] = useState('up');

  return (
    <header className="relative z-50 container">
      <nav className="flex justify-between pt-6 pb-4">
        <ul className="flex gap-10 mb-12">
          {navLink.map((item, index) => (
            <li key={index} className="flex items-center gap-14-px">
              <Button text internalLink={item.path} wrapper="flex items-center gap-4">
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
        <div className="flex flex-col items-center">
          <Link href={PATH.home}>
            <a>
              <LogoIcon className="fill-primary-1" />
            </a>
          </Link>
          <span className="heading text-4xl">Miki Jewelry</span>
        </div>
        <div className="flex">
          <div className="flex relative mr-8">
            <input
              placeholder="Tìm kiếm"
              className="h-10 w-56 py-2 px-4 rounded-primary border border-neutral-1 bg-white"
            />
            <SearchIcon className="absolute mt-2 ml-48" />
          </div>
          <ul className="flex gap-8 mb-12">
            {navCta.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <a>{item.icon}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
