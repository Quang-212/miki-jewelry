import React, { createContext, useState } from 'react';

const initialState = {
  isCollapse: false,
  isCollapseClick: false,
  isCollapseHover: false,
  onToggleClick: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseDrawerContext = createContext(initialState);

const CollapseDrawerProvider = ({ children }) => {
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  const handlerToggleClick = () => {
    setCollapse((prev) => ({ ...prev, click: !prev.click }));
  };

  const handlerMouseHover = () => {
    setCollapse((prev) => ({ ...prev, hover: true }));
  };

  const handlerMouseLeave = () => {
    setCollapse((prev) => ({ ...prev, hover: false }));
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        isCollapseClick: collapse.click,
        isCollapseHover: collapse.hover,
        onToggleClick: handlerToggleClick,
        onHoverEnter: handlerMouseHover,
        onHoverLeave: handlerMouseLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
};

export { CollapseDrawerProvider, CollapseDrawerContext };
