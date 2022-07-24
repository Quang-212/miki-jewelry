import Link from 'next/link';

import { CaretDownIcon, LogoIcon } from 'src/components/Icons';
import { navCta, navLink } from './navConfig';

export default function Header() {
  return (
    <header className="">
      <nav className="flex justify-between py-6 px-40">
        <ul className="flex gap-10 mb-12">
          {navLink.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <Link href={item.path}>
                <a className="flex items-center gap-4">{item.title}</a>
              </Link>
              {index === 1 && (
                <CaretDownIcon
                  className="cursor-pointer"
                  handleClick={(event) => console.log(event.target)}
                />
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center">
          <LogoIcon className="fill-secondary" />
          <span className="heading">Miki Jewelry</span>
        </div>
        <ul className="flex gap-10 mb-12">
          {navCta.map((item, index) => (
            <li key={index}>{item.icon}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
