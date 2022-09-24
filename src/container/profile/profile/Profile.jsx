import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { fDefaultInputDate, fTimestamp } from 'src/utils/formartTime';
import { isString } from 'lodash';
import { deleteImage, uploadFile } from 'src/fetching/upload';
import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { FormProvider, RadioField, TextField } from 'src/components/HookForms';
import { images } from 'src/constants';
import { useClientSide } from 'src/hooks';
import { userState } from 'src/recoils';
import { fDate } from 'src/utils/formartTime';
import Form from '../form';
import { PERSONAL_INFORMATION, PHONE_SECURITY } from './profile-config';
import styles from './Profile.module.css';
import { GENDERS } from '../form/form-config';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  userName: yup.string().required('*Vui lòng nhập họ và tên'),
  birthday: yup.date(),
  gender: yup.string().required('*Vui lòng chọn giới tính'),
  avatar: yup.mixed(),
  // phone: yup
  //   .string()
  //   .required('*Vui lòng nhập số điện thoại')
  //   .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, '*Vui lòng nhập CHÍNH XÁC số điện thoại'),
  // email: yup
  //   .string()
  //   .required('*Vui lòng nhập địa chỉ email của bạn')
  //   .matches(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     '*Vui lòng nhập CHÍNH XÁC địa chỉ email',
  //   ),
  // password: yup
  //   .string()
  //   .trim()
  //   .required('*Vui lòng nhập mật khẩu')
  //   .matches(
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //     '*Tối thiểu 8 ký tự, trong đó có 1 ký tự in hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
  //   ),
});

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const isClient = useClientSide();

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  const [{ user }, setUser] = useRecoilState(userState);
  const [preview, setPreview] = useState('');
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: user.userName || '',
      email: user.email || '',
      gender: user.gender || 'male',
      phone: user.phone || '',
      avatar: user.profilePicture?.url || '',
      birthday: user.birthday
        ? fDefaultInputDate(user.birthday)
        : fDefaultInputDate(new Date().getTime()),
    },
  });

  const { handleSubmit, watch } = methods;

  useEffect(() => {
    const avatarValue = watch('avatar');
    if (avatarValue && !isString(avatarValue)) {
      setPreview(URL.createObjectURL(avatarValue[0]));
    }
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [watch('avatar')]);

  const onSubmit = async (data) => {
    const { avatar, ...rest } = data;
    let profilePicture;
    const uploadAvatar = async (avatarFromRHF) => {
      const formData = new FormData();
      formData.append('avatar', avatarFromRHF[0]);
      const uploadAvatar = await uploadFile(formData);
      return uploadAvatar.data.data;
    };

    try {
      if (!user.profilePicture && avatar && !isString(avatar)) {
        profilePicture = await uploadAvatar(avatar);
      }
      if (isString(user.profilePicture?.url) && avatar && isString(avatar)) {
        profilePicture = user.profilePicture;
      }
      if (isString(user.profilePicture?.url) && avatar && !isString(avatar)) {
        profilePicture = (
          await Promise.all([
            uploadAvatar(avatar),
            deleteImage({
              images: [user.profilePicture.public_id],
            }),
          ])
        )[0];
      }

      data = {
        ...rest,
        ...(avatar && { profilePicture }),
      };

      console.log(data);

      const res = await updateUser(data, {
        params: { userId: user._id },
      });

      console.log(res.data);

      setUser((prev) => ({
        //! REMEMBER RETURN STALE DATA BEFORE UPDATE NEW
        ...prev,
        user: res.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      {isClient && (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className={mk('info-wrapper')}
        >
          <div className={mk('info-personal')}>
            <h5 className={mk('heading-5')}>Thông tin cá nhân:</h5>
            <div className={mk('info-personal-wrapper')}>
              <div className={mk('avatar-wrapper')}>
                <Avatar
                  name="ngoc khoi"
                  imageUrl={user.profilePicture?.url || images.adminAvatar}
                  image="rounded-secondary"
                  width="120"
                  height="120"
                />
              </div>
              <strong className="col-span-3">Họ và tên</strong>
              <TextField name="userName" wrapper="col-span-6" />
              <strong className="col-span-3">Giới tính</strong>
              <RadioField
                name="gender"
                options={GENDERS}
                wrapper="col-span-6 grid grid-cols-3 items-start"
                subWrapper="flex items-center gap-2"
                caption="col-span-6"
              />
              <strong className="col-span-3">Ngày sinh</strong>
              <TextField name="birthday" type="date" wrapper="col-span-9" />
            </div>
          </div>

          <div className={mk('info-others')}>
            <h5 className={mk('font-primary font-bold text-xl leading-7 text-primary')}>
              Điện thoại và bảo mật:
            </h5>
            <div className={mk('info-personal-wrapper')}>
              <strong className="col-span-3">Số điện thoại</strong>
              <TextField name="phone" wrapper="col-span-9" />
              <strong className="col-span-3">Địa chỉ email</strong>
              <TextField name="email" wrapper="col-span-9" />
              <strong className="col-span-3">Đổi mật khẩu</strong>
              <Button outline wrapper="col-span-9">
                Cập nhật
              </Button>
            </div>
          </div>
        </FormProvider>
      )}

      {/* <div className={mk('btn-container')}>
        <Button primary onClick={handleOpenModal} wrapper={mk('btn-update')}>
          Cập nhật
        </Button>
      </div>
      <Dialog isOpen={isOpen} closeModal={handleCloseModal}>
        <Form />
      </Dialog> */}
    </section>
  );
}
