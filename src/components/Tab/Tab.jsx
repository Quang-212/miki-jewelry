import { Tab as HeadlessTab } from '@headlessui/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Tab.module.css';

const mk = classNames.bind(styles);

export default function Tab({
  tabs,
  selectedIndex,
  onTabChange,
  orders,
  isLoadingMore,
  children,
  wrapper,
  tabList,
  tab,
  tabSelected,
  tabPanels,
  panel,
  className,
}) {
  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });
  const classTabList = mk('tabList', {
    [tabList]: tabList,
  });
  const classTab = mk('tab', {
    [tab]: tab,
  });
  const classTabSelected = mk('tabSelected', {
    [tabSelected]: tabSelected,
  });
  const classTabPanels = mk('tabPanels', {
    [tabPanels]: tabPanels,
  });
  const classPanel = mk('panel', {
    [panel]: panel,
  });

  return (
    <HeadlessTab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={onTabChange}
      className={classWrapper}
    >
      <HeadlessTab.List className={classTabList}>
        {tabs.map(({ title }, index) => (
          <HeadlessTab
            key={index}
            className={({ selected }) => (selected ? classTabSelected : classTab)}
          >
            {title}
          </HeadlessTab>
        ))}
      </HeadlessTab.List>
      {children}
      <HeadlessTab.Panels className={classTabPanels}>
        {tabs.map(({ component }, index) => (
          <HeadlessTab.Panel key={index} className={classPanel}>
            {component({ orders, isLoadingMore })}
          </HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
}
