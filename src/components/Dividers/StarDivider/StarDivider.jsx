import classNames from 'classnames/bind';
import { MiniStarIcon } from 'src/components/Icons';
import { NormalDivider } from '../NormalDivider';

import styles from './StarDivider.module.css';

const mk = classNames.bind(styles);

export function StarDivider({ wrapper }) {
  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  return (
    <div className={classWrapper}>
      <NormalDivider wrapper={mk('normal-divider')} />
      <MiniStarIcon />
      <MiniStarIcon />
      <MiniStarIcon />
      <MiniStarIcon />
      <NormalDivider wrapper={mk('normal-divider')} />
    </div>
  );
}
