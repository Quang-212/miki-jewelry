import classNames from 'classnames/bind';

import styles from './NormalDivider.module.css';

const mk = classNames.bind(styles);

export function NormalDivider({ vertical, wrapper }) {
  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  const classVertical = mk('vertical', {
    [vertical]: vertical,
  });

  if (vertical) return <hr className={classVertical} />;

  return <hr className={classWrapper} />;
}
