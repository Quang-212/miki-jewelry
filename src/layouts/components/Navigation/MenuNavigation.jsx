import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { motion, useSpring } from 'framer-motion';

import Button from 'src/components/Button';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import Menu from 'src/components/Popper/Menu';
import { ABOUT_LINKS, PRODUCTS_CATEGORY_LINKS } from '../Header/nav-config';
import styles from './Navigation.module.css';

const mk = classNames.bind(styles);

export default function MenuNavigation({ link, children }) {
  const springConfig = { damping: 40, stiffness: 400 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  const renderCategory = (attrs) => {
    return (
      <motion.div className="w-[1136px]" tabIndex="-1" style={{ scale, opacity }} {...attrs}>
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
      </motion.div>
    );
  };

  switch (link) {
    case 'category':
      return (
        <Tippy
          interactive
          placement="bottom-start"
          delay={[200, 400]}
          offset={[-122, 18]}
          render={renderCategory}
          animation={true}
          onMount={onMount}
          onHide={onHide}
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
