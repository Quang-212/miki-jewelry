import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from 'src/components/Button';
import Drawer from 'src/components/Drawer';
import { ArrowForwardIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import List from 'src/components/List';
import { NAVBAR } from 'src/config';
import { images } from 'src/constants';
import { useCollapseDrawer } from 'src/hooks';
import { navConfig } from './nav-config';
import NavItemRoot from './NavItem';

import styles from './Sidebar.module.css';

const mk = classNames.bind(styles);

export function Sidebar({ className }) {
  const { isCollapseClick, isCollapse, onHoverEnter, onHoverLeave, onToggleClick } =
    useCollapseDrawer();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Drawer
        open={true}
        anchor="left"
        width={!isCollapse ? NAVBAR.WIDTH_COLLAPSE : NAVBAR.WIDTH_COLLAPSE_DRAWER}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
      >
        <div className="flex flex-col">
          <div className="justify-between items-center py-4 px-6 relative">
            <Image
              src={images.adminAvatar}
              alt="Ảnh đại diện admin"
              width={40}
              height={40}
              className="rounded-full block"
            />
            {!isCollapse && (
              <Button
                icon
                onClick={onToggleClick}
                className={`${
                  !isCollapseClick ? 'rotate-180' : ''
                } hover:bg-gray-300 rounded-full p-2 hover:transition-all hover:scale-110 absolute right-4 top-2/4 -translate-y-2/4`}
              >
                <ArrowForwardIcon />
              </Button>
            )}
          </div>
          <div>
            {navConfig.map((group, index) => (
              <List
                key={index}
                subheader={<div className={`${isCollapse && 'opacity-0'}`}>{group.subheader}</div>}
              >
                {group.items.map((list, index) => (
                  <NavItemRoot key={index} list={list} />
                ))}
              </List>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
}
