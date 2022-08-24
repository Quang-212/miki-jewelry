import { Tab as HeadlessTab } from '@headlessui/react';
import classNames from 'classnames/bind';
import styles from './Tab.module.css';

const mk = classNames.bind(styles);

export default function Tab({
  tabTitle,
  tabContent,
  wrapper,
  tabList,
  tab,
  tabSelected,
  tabPanels,
  panel,
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
      defaultIndex={1}
      onChange={(index) => {
        console.log('Changed selected tab to:', index);
      }}
      className={classWrapper}
    >
      <HeadlessTab.List className={classTabList}>
        {tabTitle.map((title, index) => (
          <HeadlessTab
            key={index}
            className={({ selected }) => (selected ? classTabSelected : classTab)}
          >
            {title}
          </HeadlessTab>
        ))}
      </HeadlessTab.List>
      <HeadlessTab.Panels className={classTabPanels}>
        {tabContent.map((content, index) => (
          <HeadlessTab.Panel key={index} className={classPanel}>
            {content}
          </HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
}
