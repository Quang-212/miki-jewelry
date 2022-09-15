import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { useRouter } from 'src/hooks';
import { NAVIGATION_LINKS } from '../Header/nav-config';
import MenuNavigation from './MenuNavigation';
import styles from './Navigation.module.css';

const mk = classNames.bind(styles);

export default function Navigation() {
  const { pathname } = useRouter();

  return (
    <ul className={mk('navigation')}>
      {NAVIGATION_LINKS.map((item, index) => (
        <li key={index} className={mk('navigation-item')}>
          <MenuNavigation link={item?.link}>
            <Button text internalLink={item.path} title={mk({ active: pathname === item.path })}>
              {item.title}
            </Button>
          </MenuNavigation>
        </li>
      ))}
    </ul>
  );
}
