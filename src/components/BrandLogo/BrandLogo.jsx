import classNames from 'classnames/bind';

import styles from './BrandLogo.module.css';
import { PATH } from 'src/routes/path';
import Button from '../Button';
import { LogoIcon } from '../Icons';

const mk = classNames.bind(styles);

export default function BrandLogo({ vertical, horizontal, wrapper }) {
  const classWrapper = mk('root', {
    vertical,
    horizontal,
    [wrapper]: wrapper,
  });

  return (
    <div className={classWrapper}>
      <Button icon internalLink={PATH.home}>
        <LogoIcon className="fill-primary-1" />
      </Button>
      <span className="heading text-4xl leading-48-px">Miki Jewelry</span>
    </div>
  );
}
