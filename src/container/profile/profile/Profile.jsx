import classNames from 'classnames/bind';
import { useState } from 'react';

import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { images } from 'src/constants';
import Form from '../form';
import { PERSONAL_INFORMATION, PHONE_SECURITY } from './profile-config';
import styles from './Profile.module.css';

const mk = classNames.bind(styles);

export default function Profile() {
  const [showProfile, setShowProfile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setShowProfile((prev) => !prev);
    setIsOpen(false);
  };

  return (
    <section className={mk('profile')}>
      {showProfile && (
        <>
          <div className={mk('info-wrapper')}>
            <div className={mk('info-personal')}>
              <h5 className={mk('heading-5')}>Thông tin cá nhân:</h5>
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
                  <li>Phạm Ngọc Khôi</li>
                  <li>Nam</li>
                  <li>09/01/1997</li>
                </ul>
              </div>
            </div>

            <div className={mk('info-personal')}>
              <h5 className={mk('heading-5')}>Điện thoại và bảo mật:</h5>
              <div className={mk('info-personal-wrapper')}>
                <ul className={mk('info-personal-list-title')}>
                  {PHONE_SECURITY.map((info, index) => (
                    <li key={index}>
                      <strong>{info}</strong>
                    </li>
                  ))}
                </ul>
                <ul className={mk('info-personal-list-item')}>
                  <li>0912345678</li>
                  <li>ngockhoi@gmail.com</li>
                  <li>123!@#$%</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={mk('btn-container')}>
            <Button
              primary
              onClick={() => {
                openModal();
                setShowProfile((prev) => !prev);
              }}
              wrapper={mk('btn-update')}
            >
              Cập nhật
            </Button>
          </div>
        </>
      )}
      <Dialog isOpen={isOpen} closeModal={closeModal}>
        <Form />
      </Dialog>
    </section>
  );
}
