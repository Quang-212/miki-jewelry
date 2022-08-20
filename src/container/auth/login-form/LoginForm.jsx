import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { FacebookColorIcon, GoogleColorIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { loginForm } from 'src/fetching/auth';
import { PATH } from 'src/routes';
import styles from './LoginForm.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  email: yup
    .string()
    .required('*Vui lòng nhập địa chỉ email của bạn')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Vui lòng nhập đúng địa chỉ email của bạn',
    ),
  password: yup
    .string()
    .trim()
    .required('*Vui lòng nhập mật khẩu')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      '*Tối thiểu 8 ký tự, trong đó có 1 ký tự viết hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt',
    ),
});

export default function LoginFormSection() {
  const { replace } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setFocus('email');
      reset();

      const res = await toast.promise(
        loginForm,
        {
          pending: {
            render() {
              return 'Đang kết nối';
            },
            icon: false,
          },
          success: {
            render({ data }) {
              return data.data.message;
            },
            // other options
            icon: '😊',
          },
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              return data.response.data.message;
            },
          },
        },
        { autoClose: 10000 },
      );
      replace(PATH.home);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={mk('login')}>
      <div className={mk('wrapper')}>
        <div className="xs:hidden">
          <Image
            src={images.loginForm}
            alt="Ảnh form đăng ký"
            width={646}
            height={852}
            objectFit="cover"
            placeholder="blur"
            className="rounded-l-secondary"
          />
        </div>
        <div className={mk('form')}>
          <BrandLogo vertical wrapper="mt-14 xs:mt-10" />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mt-72-px heading-5 xs:mt-7 xs:subtitle-1">Đăng nhập</h5>
            <TextField name="email" placeholder="Địa chỉ email" wrapper="mt-8" />
            <TextField name="password" type="password" placeholder="Mật khẩu" />

            <Button text internalLink={PATH.forgotPassword} wrapper="mt-5 xs:mt-0" title="caption">
              Quên mật khẩu ?
            </Button>
            <Button primary wrapper="w-full mt-8">
              Đăng nhập
            </Button>

            <p className="mt-8">Hoặc đăng nhập bằng</p>
            <div className="flex justify-between gap-2 mt-6 xs:mt-4">
              <Button rounded leftIcon={<FacebookColorIcon />} wrapper="xs:w-[168px]">
                Facebook
              </Button>
              <Button
                onClick={() => signIn()}
                rounded
                leftIcon={<GoogleColorIcon />}
                wrapper="w-[200px] xs:w-[168px]"
              >
                Google
              </Button>
            </div>

            <p className="flex items-center gap-1 mt-6">
              <span className="caption">Bạn chưa có tài khoản?</span>
              <Button
                text
                internalLink={PATH.register}
                wrapper="ml-2"
                title={mk('title-btn-register')}
              >
                Đăng ký
              </Button>
            </p>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
