import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, RadioField, TextField } from 'src/components/HookForms';
import { EmailIcon, LockIcon, PhoneIcon } from 'src/components/Icons';
import { GENDERS } from './form-config';
import styles from './Form.module.css';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { userState } from 'src/recoils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { updateUser } from 'src/fetching/user';
import { useEffect, useState } from 'react';
import { fDefaultInputDate, fTimestamp } from 'src/utils/formartTime';
import { isString } from 'lodash';
import { deleteImage, uploadFile } from 'src/fetching/upload';

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

export default function Form() {
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
    <>
      <h2 className={mk('title')}>Cập nhật Hồ sơ</h2>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={mk('form-provider')}
      >
        <div className={mk('info-personal')}>
          <h5 className={mk('info-personal-title')}>Thông tin cá nhân</h5>
          <div className="row-span-2 flex items-start">
            <label htmlFor="avatar">
              <Image
                src={preview || user.profilePicture?.url || images.adminAvatar}
                alt=""
                width={110}
                height={110}
                className="rounded-full"
              />
              <TextField name="avatar" id="avatar" type="file" hidden />
            </label>
          </div>
          <strong>Họ và tên</strong>
          <TextField name="userName" wrapper="col-span-2" />

          <strong>Ngày sinh</strong>
          <TextField name="birthday" type="date" wrapper="col-span-3" />
          <strong>Giới tính</strong>
          <RadioField
            name="gender"
            options={GENDERS}
            wrapper="col-span-3 grid grid-cols-3 items-start"
            subWrapper="flex items-center gap-2"
            caption="col-span-3"
          />
        </div>
        <div className={mk('info-contact-security')}>
          <h5 className={mk('info-contact-title')}>Số điện thoại và Email</h5>
          <span className={mk('info-icon')}>
            <PhoneIcon />
            <strong>Số điện thoại</strong>
          </span>
          <TextField name="phone" wrapper="col-span-3" />
          <span className={mk('info-icon')}>
            <EmailIcon />
            <strong>Địa chỉ email</strong>
          </span>
          <TextField name="email" disabled wrapper="col-span-3" />
          <h5 className={mk('info-security-title')}>Bảo mật</h5>
          <span className={mk('info-icon')}>
            <LockIcon />
            <strong>Đổi mật khẩu</strong>
          </span>
          {/* <TextField name="password" type="password" wrapper="col-span-3" /> */}
        </div>
        <Button primary wrapper={mk('btn-save')}>
          Lưu thay đổi
        </Button>
      </FormProvider>
    </>
  );
}
