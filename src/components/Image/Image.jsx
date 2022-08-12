import classNames from 'classnames';
import NextImage from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { images } from 'src/constants';
import styles from './Image.module.css';

export default function Image({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  placeholder = 'empty',
  className,
  fallback: customFallback = images.noImage,
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
      blurDataURL
      onError={handleError}
      className={classNames(styles.root, className)}
      {...passProps}
    />
  );
}

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  objectFit: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
