import classNames from 'classnames';
import NextImage from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { images } from 'src/constants';
import styles from './Image.module.css';

const Image = React.forwardRef(
  (
    {
      src,
      alt,
      width,
      height,
      objectFit = 'cover',
      className,
      fallback = images.noImage,
      ...passProps
    },
    ref,
  ) => (
    <NextImage
      src={src || fallback}
      alt={alt}
      onLoadingComplete={ref}
      width={width}
      height={height}
      objectFit={objectFit}
      blurDataURL
      onError={() => console.log('error image')}
      className={classNames(styles.root, className)}
      {...passProps}
    />
  ),
);

export default Image;

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  objectFit: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
