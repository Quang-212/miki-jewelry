import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Animation, { LEFT_RIGHT, SCALE_ZOOM } from 'src/components/Animation';
import styles from './Images.module.css';

const mk = classNames.bind(styles);

import Image from 'src/components/Image';

export default function Images({ images, name }) {
  const [mainImage, setMainImage] = useState(images.find((image) => image.type === 'primary').url);

  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('images')}
    >
      <ul className={mk('images-list')}>
        {images.map((image) => (
          <li key={image._id} className={mk('image-item')}>
            <Animation variant={LEFT_RIGHT}>
              <Image
                src={image.url}
                alt={name}
                width={156}
                height={107}
                className={mk('image')}
                onClick={() => setMainImage(image.url)}
              />
            </Animation>
          </li>
        ))}
      </ul>
      <Animation variant={SCALE_ZOOM}>
        <Image
          src={mainImage}
          alt={name}
          width={450}
          height={465}
          className={mk('image-primary')}
        />
      </Animation>
    </motion.section>
  );
}
