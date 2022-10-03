import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { isString } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';

import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
import { FormProvider, RadioField, TextField } from 'src/components/HookForms';
import { images } from 'src/constants';
import { deleteImage, uploadFile } from 'src/fetching/upload';
import { updateUser } from 'src/fetching/user';
import { useClientSide } from 'src/hooks';
import { userState } from 'src/recoils';
import { fDefaultInputDate } from 'src/utils/formartTime';
import ModalPassword from './ModalPassword';
import { GENDERS } from './profile-form-config';
import styles from './ProfileForm.module.css';
import Image from 'src/components/Image';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  userName: yup.string(),
  birthday: yup.date(),
  gender: yup.string(),
  avatar: yup.mixed(),
});

export default function ProfileForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState('');

  const [{ user }, setUser] = useRecoilState(userState);

  const isClient = useClientSide();

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
      matkhau: '**********',
    },
  });

  const { handleSubmit, watch, setError } = methods;

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
    const phone = watch('phone');

    if (phone && pattern.test(phone) === false) {
      return setError('phone', {
        type: 'string',
        message: '*Vui lòng nhập CHÍNH XÁC số điện thoại',
      });
    }

    const { avatar, matkhau, ...rest } = data;
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

      const res = await toast.promise(
        updateUser(data, {
          params: { userId: user._id },
        }),
        {
          pending: {
            render() {
              return 'Đang kết nối';
            },
            icon: '😇',
          },
          success: {
            render({ data }) {
              return data.data.message;
            },
            icon: '😍',
          },
          error: {
            render({ data }) {
              return data.response?.data.message;
            },
            icon: '😵‍💫',
          },
        },
        { autoClose: 4000 },
      );

      setUser((prev) => ({
        //! REMEMBER RETURN STALE DATA BEFORE UPDATE NEW
        ...prev,
        user: res.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <section>
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
                <label htmlFor="avatar">
                  <Image
                    src={preview || user.profilePicture?.url}
                    alt=""
                    width={110}
                    height={110}
                    className="rounded-full"
                  />
                  <TextField name="avatar" id="avatar" type="file" hidden />
                </label>
              </div>
              <strong className="col-span-3 mt-3">Họ và tên</strong>
              <TextField name="userName" wrapper="col-span-6" />
              <strong className="col-span-3 mt-3">Giới tính</strong>
              <RadioField
                hidden
                name="gender"
                options={GENDERS}
                wrapper="col-span-6 grid grid-cols-3 items-start mt-3"
                subWrapper="flex items-center gap-2"
                caption="col-span-6"
              />
              <strong className="col-span-3 mt-6">Ngày sinh</strong>
              <TextField name="birthday" type="date" wrapper="col-span-9 mt-3" />
              <Button primary wrapper="col-span-12 justify-self-end w-[200px]">
                Lưu thay đổi
              </Button>
            </div>
          </div>

          <div className={mk('info-others')}>
            <h5 className={mk('font-primary font-bold text-xl leading-7 text-primary')}>
              Điện thoại và bảo mật:
            </h5>
            <div className={mk('info-personal-wrapper')}>
              <strong className="col-span-3 mt-3">Số điện thoại</strong>
              <TextField name="phone" wrapper="col-span-9" />
              <strong className="col-span-3 mt-3">Địa chỉ email</strong>
              <TextField name="email" disabled wrapper="col-span-9" input="text-neutral-2" />
              <strong className="col-span-3 mt-3">Mật khẩu</strong>
              <TextField
                name="matkhau"
                type="password"
                disabled
                wrapper="col-span-5"
                input="text-neutral-2"
              />
              <Button
                type="button"
                outline
                onClick={handleChangePassword}
                wrapper="col-span-4 justify-self-end w-10/12 h-12"
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </FormProvider>
      )}
      <ModalPassword isOpen={isOpen} handleCloseModal={handleCloseModal} />
    </section>
  );
}
