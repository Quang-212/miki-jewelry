import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/hook-forms';
import { FacebookColorIcon, GoogleColorIcon, LogoIcon } from 'src/components/Icons';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';
import styles from './LoginForm.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .required('Vui lòng nhập địa chỉ email của bạn')
  //   .matches(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     'Vui lòng nhập đúng địa chỉ email của bạn',
  //   ),
  // password: yup
  //   .string()
  //   .trim()
  //   .required('Vui lòng nhập mật khẩu')
  //   .matches(
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //     'Minimum of 8 characters, at least one letter and one number',
  //   ),
});

export default function LoginFormSection() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = methods;
  console.log(errors);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setFocus('email');
      reset();

      const res = await toast.promise(
        axios({
          method: 'POST',
          url: 'api/auth/login',
          data,
        }),
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container pt-120-px">
      <div className="flex h-852-px rounded-secondary register-form-rgba shadow-register-form">
        <Image
          src={images.loginForm}
          alt="Ảnh form đăng ký"
          width={646}
          height={852}
          objectFit="cover"
          placeholder="blur"
          className="rounded-l-secondary"
        />
        <div className="flex flex-col w-490-px px-10">
          <BrandLogo wrapper="mt-14" />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mt-72-px heading-5">Đăng nhập</h5>
            <TextField name="email" placeholder="Địa chỉ email" wrapper="mt-8" />
            <TextField name="password" type="password" placeholder="Mật khẩu" />

            <Button text internalLink={PATH.forgotPassword} title="caption">
              Quên mật khẩu ?
            </Button>
            <Button primary wrapper="w-full mt-8">
              Đăng nhập
            </Button>

            <p className="mt-8">Hoặc đăng nhập bằng</p>
            <div className="mt-6">
              <Button outline rounded leftIcon={<FacebookColorIcon />}>
                Facebook
              </Button>
              <Button outline rounded leftIcon={<GoogleColorIcon />} wrapper="w-[200px] ml-4">
                Google
              </Button>
            </div>

            <p className="flex items-center gap-1 mt-6">
              <span className="caption">Bạn chưa có tài khoản?</span>
              <Button text internalLink={PATH.register} wrapper="ml-2" title={mk('title')}>
                Đăng ký
              </Button>
            </p>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
