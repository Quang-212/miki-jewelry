import classNames from 'classnames/bind';
import { useState } from 'react';
import Avatar from 'src/components/Avatar';
import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import Collapse from 'src/components/Collapse';
import Drawer from 'src/components/Drawer';
import {
  ArrowForwardIcon,
  BellRingIcon,
  CategoryIcon,
  CustomerIcon,
  HomeIcon,
  LogoIcon,
  NotificationIcon,
  OrderIcon,
  ProductIcon,
} from 'src/components/Icons';
import Image from 'src/components/Image';
import List from 'src/components/List';
import ListIconButton from 'src/components/ListIconButton';
import ListItemButton from 'src/components/ListItemButton';
import { NAVBAR } from 'src/config';
import { images } from 'src/constants';
import { useCollapseDrawer } from 'src/hooks';
import { navConfig } from './navConfig';
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
    // <aside className={className}>
    //   <div className="flex gap-2">
    //     <LogoIcon className="fill-primary-1 w-6 h-6" />
    //     <span>Miki Shop</span>
    //   </div>
    //   <ul>
    //     <li>
    //       <HomeIcon className="fill-primary-1" />
    //       <span>Dashboard</span>
    //     </li>
    //     <li>
    //       <ProductIcon className="fill-primary-1" />
    //       <span>Products</span>
    //       <ul>
    //         <li>Products List</li>
    //         <li>Product Detail</li>
    //       </ul>
    //     </li>
    //     <li>
    //       <CategoryIcon className="fill-primary-1" />
    //       <span>Categories</span>
    //       <ul>
    //         <li>Categories List</li>
    //         <li>Categories Detail</li>
    //       </ul>
    //     </li>
    //     <li>
    //       <CustomerIcon className="fill-primary-1" />
    //       <span>Customers</span>
    //       <ul>
    //         <li>Customers List</li>
    //         <li>Customers Detail</li>
    //       </ul>
    //     </li>
    //     <li>
    //       <OrderIcon className="fill-primary-1" />
    //       Orders
    //       <ul>
    //         <li>Orders List</li>
    //         <li>Order Detail</li>
    //       </ul>
    //     </li>
    //   </ul>
    // </aside>
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
