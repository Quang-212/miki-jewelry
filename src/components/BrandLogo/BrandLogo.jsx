import classNames from 'classnames/bind';

import styles from './BrandLogo.module.css';
import { PATH } from 'src/routes';
import Button from '../Button';
import { LogoIcon } from '../Icons';

const mk = classNames.bind(styles);

export default function BrandLogo({ vertical, horizontal, wrapper, logo, brandName }) {
  const BrandLogoWrapper = 'div';
  const BrandName = 'span';

  const classWrapper = mk('root', {
    vertical,
    horizontal,
    [wrapper]: wrapper,
  });

  const classIcon = mk('logo-icon', {
    [logo]: logo,
  });

  const classBrandName = mk(
    'brand-name',
    'font-secondary font-bold text-5xl leading-58-px text-primary uppercase',
    {
      [brandName]: brandName,
    },
  );

  return (
    <BrandLogoWrapper className={classWrapper}>
      <Button icon internalLink={PATH.home}>
        <LogoIcon className={classIcon} />
      </Button>
      <BrandName className={classBrandName}>Miki Jewelry</BrandName>
    </BrandLogoWrapper>
  );
}
