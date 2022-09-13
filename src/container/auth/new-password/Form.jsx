import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { FacebookColorIcon, GoogleColorIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { PATH } from 'src/routes';
import styles from './Form.module.css';
import OtpField from 'src/components/OtpField';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('*Vui lòng nhập mật khẩu')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      '*Tối thiểu 8 ký tự, trong đó có 1 ký tự viết hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('*Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password'), null], '*Mật khẩu đã nhập chưa đúng'),
});

export default function Form() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);

      setFocus('password');
      reset();
    }
  };

  return (
    <section className={mk('new-password')}>
      <div className={mk('form-wrapper')}>
        <div className={mk('image-wrapper')}>
          <Image
            src={images.loginForm}
            alt="Ảnh form đăng ký"
            width={646}
            height={852}
            objectFit="cover"
            placeholder="blur"
            className={mk('image')}
          />
        </div>
        <div className={mk('form')}>
          <BrandLogo vertical wrapper={mk('brand-logo')} />
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className={mk('form-provider')}
          >
            <h5 className={mk('title')}>Thay đổi mật khẩu</h5>
            <OtpField />
            <TextField
              name="password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              wrapper={mk('password-wrapper')}
            />
            <TextField name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />

            <Button primary wrapper={mk('btn-login')}>
              Đăng nhập
            </Button>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
