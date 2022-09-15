import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import Menu from 'src/components/Popper/Menu';
import { ABOUT_LINKS, PRODUCTS_CATEGORY_LINKS } from '../Header/nav-config';
import styles from './Navigation.module.css';

const mk = classNames.bind(styles);

export default function MenuNavigation({ link, children }) {
  const renderCategory = (attrs) => {
    return (
      <div className="w-[1136px]" tabIndex="-1" {...attrs}>
        <PopperWrapper className="h-[186px]">
          <ul className="grid grid-cols-4 content-center rounded-primary text-center">
            {PRODUCTS_CATEGORY_LINKS.map((category, index) => (
              <ul key={index} className="grid grid-rows-5 grid-flow-col content-center gap-2">
                <li>
                  <Button text internalLink={category.path} title="subtitle-1">
                    {category.heading}
                  </Button>
                </li>
                {category.content.map((subCategory, index) => (
                  <li key={index}>
                    <Button
                      text
                      internalLink={subCategory.path}
                      wrapper="px-4 hover:text-primary-1 hover:font-semibold transition-all duration-500 ease-in-out"
                    >
                      {subCategory.title}
                    </Button>
                    <hr className="absolute top-7 left-[220px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                    <hr className="absolute top-7 left-[504px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                    <hr className="absolute top-7 left-[788px] border rotate-90 w-[129px] mt-16 border-neutral-1" />
                  </li>
                ))}
              </ul>
            ))}
          </ul>
        </PopperWrapper>
      </div>
    );
  };

  switch (link) {
    case 'category':
      return (
        <Tippy
          interactive
          placement="bottom-start"
          delay={[200, 400]}
          offset={[-122, 16]}
          render={renderCategory}
        >
          <h2>{children}</h2>
        </Tippy>
      );
    case 'about':
      return (
        <Menu items={ABOUT_LINKS}>
          <h2>{children}</h2>
        </Menu>
      );
    default:
      return <>{children}</>;
  }
}
