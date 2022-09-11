import classNames from 'classnames/bind';

import { BellRingIcon, SearchIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { NAVBAR } from 'src/config';
import { images } from 'src/constants';
import { useCollapseDrawer } from 'src/hooks';
import styles from './SubHeader.module.css';

const mk = classNames.bind(styles);

export function SubHeader() {
  const { isCollapseClick } = useCollapseDrawer();

  const headerStyle = {
    width: isCollapseClick
      ? `calc(100% - ${NAVBAR.WIDTH_COLLAPSE_DRAWER}px)`
      : `calc(100% - ${NAVBAR.WIDTH_DRAWER}px)`,
  };

  return (
    <header className={mk('root')} style={headerStyle}>
      <nav className="flex justify-between items-center ">
        <div className="flex relative">
          <input
            placeholder="Tìm kiếm"
            className="h-10 max-w-[228px] py-2 px-4 rounded-primary border border-neutral-1 bg-white"
          />
          <SearchIcon className="absolute mt-2 ml-48 cursor-pointer" />
        </div>
        <ul className="flex items-center gap-8">
          <li>{<BellRingIcon className="fill-primary-1" />}</li>
          <li>
            <div className="flex flex-col">
              <span className="subtitle-1">ngockhoi96</span>
              <span className="caption">Admin Profile</span>
            </div>
          </li>
          <li>
            <Image
              src={images.adminAvatar}
              alt="Ảnh đại diện admin"
              width={40}
              height={40}
              className="rounded-full"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
