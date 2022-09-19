import classNames from 'classnames/bind';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { images } from 'src/constants';
import { useClientSide } from 'src/hooks';
import { userState } from 'src/recoils';
import Form from '../form';
import { PERSONAL_INFORMATION, PHONE_SECURITY } from './profile-config';
import styles from './Profile.module.css';

const mk = classNames.bind(styles);

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useRecoilValue(userState);

  const isClient = useClientSide();

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <section className={mk('profile')}>
      {isClient && (
        <div className={mk('info-wrapper')}>
          <div className={mk('info-personal')}>
            <h5 className={mk('font-primary font-bold text-xl leading-7 text-primary')}>
              Thông tin cá nhân:
            </h5>
            <div className={mk('info-personal-wrapper')}>
              <figure className={mk('avatar-wrapper')}>
                <Avatar
                  name="ngoc khoi"
                  imageUrl={images.adminAvatar}
                  image="rounded-secondary"
                  width="120"
                  height="120"
                />
                <figcaption>
                  <strong>_ngockhoi96_</strong>
                </figcaption>
              </figure>
              <ul className={mk('info-personal-list-title')}>
                {PERSONAL_INFORMATION.map((info, index) => (
                  <li key={index}>
                    <strong>{info}</strong>
                  </li>
                ))}
              </ul>
              <ul className={mk('info-personal-list-item')}>
                <li>{user.userName}</li>
                <li>{user.gender}</li>
                <li>{user.birthday}</li>
              </ul>
            </div>
          </div>

          <div className={mk('info-personal')}>
            <h5 className={mk('font-primary font-bold text-xl leading-7 text-primary')}>
              Điện thoại và bảo mật:
            </h5>
            <div className={mk('info-personal-wrapper')}>
              <ul className={mk('info-personal-list-title')}>
                {PHONE_SECURITY.map((info, index) => (
                  <li key={index}>
                    <strong>{info}</strong>
                  </li>
                ))}
              </ul>
              <ul className={mk('info-personal-list-item')}>
                <li>{user.phone}</li>
                <li>{user.email}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className={mk('btn-container')}>
        <Button primary onClick={handleOpenModal} wrapper={mk('btn-update')}>
          Cập nhật
        </Button>
      </div>
      <Dialog isOpen={isOpen} closeModal={handleCloseModal}>
        <Form data={user} />
      </Dialog>
    </section>
  );
}
