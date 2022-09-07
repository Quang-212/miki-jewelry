import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from 'src/components/Popper';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';
import Header from './Header';

export default function Menu({ items = [], hideOnClick = false, children }) {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={
            isParent
              ? () => {
                  setHistory((prev) => [...prev, item.children]);
                }
              : item.onClick
          }
        />
      );
    });
  };

  return (
    <Tippy
      // visible
      interactive
      hideOnClick={hideOnClick}
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
            <ul className="overflow-y-scroll">{renderItems()}</ul>
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}
