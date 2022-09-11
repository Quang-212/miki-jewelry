import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Collapse from 'src/components/Collapse';
import { ArrowForwardIcon, BellRingIcon } from 'src/components/Icons';
import ListIconButton from 'src/components/ListIconButton';
import ListItemButton from 'src/components/ListItemButton';
import { useCollapseDrawer } from 'src/hooks';
import { Icon } from '@iconify/react';

const renderText = (title, active) => {
  return <p className={`${active && 'text-primary-1'} font-semibold capitalize`}>{title}</p>;
};

const getActive = (path, pathname, asPath) => {
  return pathname.includes(path) || asPath.includes(path);
};

export default function NavItemRoot({ list }) {
  const hashChildren = list?.children;

  const { asPath, pathname } = useRouter();

  const { isCollapse } = useCollapseDrawer();

  const [open, setOpen] = useState(false);

  const handleClickCollapse = () => {
    setOpen((prev) => !prev);
  };

  const active = getActive(list.path, pathname, asPath);

  if (!hashChildren) {
    return (
      <NextLink href={list.path} passHref>
        <ListItemButton className={active && 'bg-primary-5'}>
          <ListIconButton>
            <Icon icon={list.icon} width={24} className={active && 'text-primary-1'} />
          </ListIconButton>
          {!isCollapse && renderText(list.title, active)}
        </ListItemButton>
      </NextLink>
    );
  }

  return (
    <>
      <ListItemButton onClick={handleClickCollapse}>
        <ListIconButton>
          <Icon icon={list.icon} width={24} className={active && 'text-primary-1'} />
        </ListIconButton>
        {!isCollapse && renderText(list.title)}
        {!isCollapse && (
          <div className={`${open && 'rotate-90'} ml-auto`}>
            <ArrowForwardIcon width="12" height="12" />
          </div>
        )}
      </ListItemButton>
      {!isCollapse && (
        <Collapse open={open}>
          {list.children.map((item) => (
            <NavItemSub
              list={item}
              active={getActive(item.path, pathname, asPath)}
              isCollapse={isCollapse}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

export function NavItemSub({ list, active, isCollapse }) {
  return (
    <NextLink href={list.path} passHref>
      <ListItemButton className={`${active && 'bg-primary-5'} py-2 mt-1`}>
        <ListIconButton>
          <div
            className={`w-1 h-1  rounded-full ${
              active ? 'scale-1.75 bg-primary-1' : 'bg-gray-500'
            }`}
          />
        </ListIconButton>
        {!isCollapse && <p className={`capitalize ${active && 'text-primary'}`}>{list.title}</p>}
      </ListItemButton>
    </NextLink>
  );
}
