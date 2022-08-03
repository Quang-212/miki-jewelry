import classNames from 'classnames';
import NextImage from 'next/image';
import { useState } from 'react';

import { images } from 'src/constants';
import styles from './Image.module.css';

export default function Image({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  placeholder = 'blur',
  className,
  fallback: customFallback = images.adminAvatar,
  ...passProps
}) {
  const [fallback, setFallback] = useState('');

  const handleError = () => setFallback(customFallback);

  return (
    <NextImage
      src={fallback || src}
      alt={alt}
      width={width}
      height={height}
      objectFit={objectFit}
      placeholder={placeholder}
      onError={handleError}
      className={classNames(styles.root, className)}
      {...passProps}
    />
  );
}
