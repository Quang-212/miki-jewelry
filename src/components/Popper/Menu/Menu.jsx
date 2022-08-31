import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from 'src/components/Popper';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';
import Header from './Header';

export default function Menu({ items = [], onChange, children }) {
  const [history, setHistory] = useState([{ data: items }]);
  // console.log(history);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              // console.log(item.children);
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      // visible
      interactive
      placement="bottom-end"
      delay={[200, 400]}
      offset={[12, 16]}
      render={(attrs) => (
        <div className="w-64" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {history.length > 1 && (
              <Header
                title="Languages"
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <ul className="flex flex-col pb-2">{renderItems()}</ul>
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}
