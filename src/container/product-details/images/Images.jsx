import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Images.module.css';

const mk = classNames.bind(styles);

import Image from 'src/components/Image';

export default function Images({ images, name }) {
  const [mainImage, setMainImage] = useState(images.find((image) => image.type === 'primary').url);

  return (
    <section className={mk('images')}>
      <ul className={mk('images-list')}>
        {images.map((image) => (
          <li key={image._id} className={mk('image-item')}>
            <Image
              src={image.url}
              alt={name}
              width={156}
              height={107}
              className={mk('image')}
              onClick={() => setMainImage(image.url)}
            />
          </li>
        ))}
      </ul>
      <Image src={mainImage} alt={name} width={450} height={465} className={mk('image-primary')} />
    </section>
  );
}
