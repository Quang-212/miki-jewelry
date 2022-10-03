import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { useRouter } from 'src/hooks';
import Header from './Header';
import MenuItem from './MenuItem';

export default function Menu({ items = [], hideOnClick = false, children }) {
  const [history, setHistory] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const current = history[history.length - 1] || {};

  const renderItems = () => {
    const handleClick = (item) => {
      const isParent = !!item.children;
      if (isParent) {
        return setHistory((prev) => [...prev, item.children]);
      }
      item.onClick ? item.onClick() : push(item.path);
    };

    return current.data?.map((item, index) => {
      return (
        <li key={index}>
          <MenuItem data={item} onClick={() => handleClick(item)} />
        </li>
      );
    });
  };

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
    setHistory((prev) => prev.slice(0, 1));
  };

  const renderResult = (attrs) => {
    return (
      <motion.div className="w-64" tabIndex="-1" style={{ scale, opacity }} {...attrs}>
        <PopperWrapper>
          {history.length > 1 && (
            <Header
              title="Languages"
              onBack={() => {
                setHistory((prev) => prev.slice(0, prev.length - 1));
              }}
            />
          )}
          <ul className="overflow-y-scroll">{renderItems()}</ul>
        </PopperWrapper>
      </motion.div>
    );
  };

  return (
    <Tippy
      interactive
      hideOnClick={hideOnClick}
      placement="bottom-end"
      delay={[200, 400]}
      offset={[12, 16]}
      render={renderResult}
      animation={true}
      onMount={onMount}
      onHide={onHide}
    >
      {children}
    </Tippy>
  );
}
