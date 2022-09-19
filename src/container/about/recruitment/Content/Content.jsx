import classNames from 'classnames/bind';

import Image from 'src/components/Image';
import { images } from 'src/constants';
import { information } from '../recruitment-config';

import styles from './Content.module.css';

const mk = classNames.bind(styles);

export default function Content() {
  return (
    <section className={mk('content')}>
      <h2 className={mk('title font-primary font-bold text-32-px leading-10 text-primary')}>
        Cơ hội việc làm tại Miki
      </h2>
      <Image
        src={images.aboutRecruitment}
        alt="Ảnh cơ hội việc làm tại Miki"
        width={1136}
        height={630}
      />
      <ul className={mk('info-list')}>
        {information.map((info, index) => (
          <li key={index}>
            <p className={index === 0 ? mk('info-first') : mk('info-default')}>
              {info.icon} {info.content}
            </p>
          </li>
        ))}
      </ul>
      <p>
        Mọi hồ sơ xin việc xin gửi về email: <strong>Mikijewelry@gmail.com</strong>
      </p>
    </section>
  );
}
