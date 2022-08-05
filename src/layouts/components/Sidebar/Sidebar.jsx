import classNames from 'classnames/bind';
import BrandLogo from 'src/components/BrandLogo';
import {
  CategoryIcon,
  CustomerIcon,
  HomeIcon,
  LogoIcon,
  OrderIcon,
  ProductIcon,
} from 'src/components/Icons';

import styles from './Sidebar.module.css';

const mk = classNames.bind(styles);

export function Sidebar({ className }) {
  return (
    <aside className={className}>
      <div className="flex gap-2">
        <LogoIcon className="fill-primary-1 w-6 h-6" />
        <span>Miki Shop</span>
      </div>
      <ul>
        <li>
          <HomeIcon className="fill-primary-1" />
          <span>Dashboard</span>
        </li>
        <li>
          <ProductIcon className="fill-primary-1" />
          <span>Products</span>
          <ul>
            <li>Products List</li>
            <li>Product Detail</li>
          </ul>
        </li>
        <li>
          <CategoryIcon className="fill-primary-1" />
          <span>Categories</span>
          <ul>
            <li>Categories List</li>
            <li>Categories Detail</li>
          </ul>
        </li>
        <li>
          <CustomerIcon className="fill-primary-1" />
          <span>Customers</span>
          <ul>
            <li>Customers List</li>
            <li>Customers Detail</li>
          </ul>
        </li>
        <li>
          <OrderIcon className="fill-primary-1" />
          Orders
          <ul>
            <li>Orders List</li>
            <li>Order Detail</li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
