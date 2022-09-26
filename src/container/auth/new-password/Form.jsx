import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import Image from 'src/components/Image';
import OtpField from 'src/components/OtpField';
import { images } from 'src/constants';
import styles from './Form.module.css';
import { useRouter } from 'src/hooks';
import { useEffect, useState } from 'react';
import { verifyCode } from 'src/fetching/mailer';
import { toast } from 'react-toastify';
import { resetPassword } from 'src/fetching/auth';
import { PATH } from 'src/routes';

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
  const { query, isReady, replace } = useRouter();
  const [validURL, setValidURL] = useState(true);
  console.log(validURL);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, reset, setFocus, setValue } = methods;

  useEffect(() => {
    if (!('email' in query) || !('code' in query)) {
      setValidURL(false);
    } else {
      verifyCode({ params: { email: query.email, code: query.code } })
        .then(() => setValue('email', query.email))
        .catch(() => setValidURL(false));
    }
  }, [isReady, query]);

  const onSubmit = async ({ password, email }) => {
    try {
      await resetPassword({ password }, { params: { email, code: query.code } });
      sessionStorage.removeItem('email');
      replace(PATH.login);
    } catch (error) {
      if (403 === error.response?.status) {
        toast(error.response.data.message, { type: 'warning' });
      }
      console.log(error);
      setFocus('password');
      reset();
    }
  };
  // đường dẫn của bạn không hợp lệ hoặc đã bị chỉnh sửa => đưa về trang verify(reset-password)(replace)
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
            <h5
              className={mk(
                'title mt-72-px font-primary font-bold text-xl leading-7 text-primary xs:mt-7 xs:subtitle-1',
              )}
            >
              Thay đổi mật khẩu
            </h5>
            <TextField name="email" disabled wrapper="mt-8" input="text-neutral-3" />

            <TextField
              name="password"
              type="password"
              placeholder="Nhập mật khẩu mới"
              wrapper={mk('password-wrapper')}
            />
            <TextField name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />

            <Button primary wrapper={mk('btn-login')}>
              Đặt lại mật khẩu
            </Button>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
