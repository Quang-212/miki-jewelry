import classNames from 'classnames/bind';

import { formatStringTextAvatar } from 'src/utils/formatString';
import Image from '../Image';
import styles from './Avatar.module.css';

const mk = classNames.bind(styles);

export default function Avatar({ name, imageUrl, text, image }) {
  const classAvatarImage = mk('image', {
    [image]: image,
  });

  const classAvatarText = mk('text', {
    [text]: text,
  });

  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Ảnh đại diện"
          width={32}
          height={32}
          className={classAvatarImage}
        />
      ) : (
        <span className={classAvatarText}>{formatStringTextAvatar(name)}</span>
      )}
    </>
  );
}
