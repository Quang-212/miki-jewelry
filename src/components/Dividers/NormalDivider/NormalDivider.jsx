import classNames from 'classnames/bind';

import styles from './NormalDivider.module.css';

const mk = classNames.bind(styles);

export function NormalDivider({ wrapper }) {
  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  return <hr className={classWrapper} />;
}
