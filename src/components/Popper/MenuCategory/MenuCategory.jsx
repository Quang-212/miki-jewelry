import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from 'src/components/Popper';
import styles from './MenuCategory.module.css';
import { PRODUCTS_CATEGORY_LINKS } from '../Header/nav-config';
import Button from 'src/components/Button';
import MenuCategoryItem from './MenuCategoryItem';

const mk = classNames.bind(styles);

export default function MenuCategory({ items = [], children }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuCategoryItem key={index} data={item} />);
  };

  return (
    <Tippy
      // visible
      interactive
      placement="bottom-start"
      delay={[200, 400]}
      offset={[-122, 16]}
      render={(attrs) => (
        <div className="w-[1136px]" tabIndex="-1" {...attrs}>
          <PopperWrapper className="h-[186px]">
            <ul className="grid grid-cols-4 content-center rounded-primary text-center">
              {renderItems()}
              <hr className="absolute top-7 left-[220px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
              <hr className="absolute top-7 left-[504px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
              <hr className="absolute top-7 left-[788px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
            </ul>
          </PopperWrapper>
        </div>
      )}
    >
      <h2>{children}</h2>
    </Tippy>
  );
}
