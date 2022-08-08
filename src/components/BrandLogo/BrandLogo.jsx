import classNames from 'classnames/bind';

import styles from './BrandLogo.module.css';
import { PATH } from 'src/routes';
import Button from '../Button';
import { LogoIcon } from '../Icons';

const mk = classNames.bind(styles);

export default function BrandLogo({ vertical, horizontal, wrapper, logo, brandName }) {
  const classWrapper = mk('root', {
    vertical,
    horizontal,
    [wrapper]: wrapper,
  });

  const classIcon = mk('logo-icon', {
    [logo]: logo,
  });

  const classBrandName = mk('brand-name', 'heading', {
    [brandName]: brandName,
  });

  return (
    <div className={classWrapper}>
      <Button icon internalLink={PATH.home}>
        <LogoIcon className={classIcon} />
      </Button>
      <span className={classBrandName}>Miki Jewelry</span>
    </div>
  );
}
