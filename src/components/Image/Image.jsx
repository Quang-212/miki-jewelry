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
  fallback = images.noImage,
  ...passProps
}) {
  return (
    <NextImage
      src={src || fallback}
      alt={alt}
      width={width}
      height={height}
      objectFit={objectFit}
      placeholder={placeholder}
      blurDataURL
      onError={() => console.log('error image')}
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
