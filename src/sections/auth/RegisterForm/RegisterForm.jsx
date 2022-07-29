import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

import Button from 'src/components/Button';
import { CheckBoxField, FormProvider, TextField } from 'src/components/hook-forms';
import { LogoIcon } from 'src/components/Icons';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';
import styles from './RegisterForm.module.css';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  // firstName: yup.string().required('*Bắt buộc!'),
  // lastName: yup.string().required('*Bắt buộc!'),
  // email: yup
  //   .string()
  //   .required('Vui lòng nhập địa chỉ email của bạn')
  //   .matches(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     'Please enter a valid email address',
  //   ),
  // password: yup
  //   .string()
  //   .trim()
  //   .required('Vui lòng nhập mật khẩu')
  //   .matches(
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //     'Minimum of 8 characters, at least one letter and one number',
  //   ),
  // confirmPassword: yup
  //   .string()
  //   .trim()
  //   .required('Vui lòng nhập lại mật khẩu')
  //   .oneOf([yup.ref('password'), null], 'Password is not matched'),
  // terms: yup
  //   .boolean()
  //   .oneOf([true], 'Bạn cần đọc và đồng ý với các điều khoản chính sách của Miki Jewelry'),
});

export default function RegisterFormSection() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      promotions: false,
      terms: false,
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
      setFocus('firstName');
      reset();

      const res = await axios({
        method: 'POST',
        url: 'api/auth/register',
        data,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative container pt-120-px">
      <div className="flex h-852-px rounded-secondary register-form-rgba shadow-register-form">
        <Image
          src={images.registerForm}
          alt="Ảnh form đăng ký"
          width={646}
          height={852}
          objectFit="cover"
          placeholder="blur"
          className="rounded-l-secondary"
        />

        <div className="flex flex-col items-center w-490-px px-10">
          <Button icon internalLink={PATH.home} wrapper="mt-14">
            <LogoIcon className="fill-primary-1" />
          </Button>

          <span className="heading leading-48-px text-40-px">Miki Jewelry</span>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mt-72-px heading-5">Đăng ký tài khoản</h5>
            <div className="flex gap-3 mt-8">
              <TextField name="firstName" placeholder="Họ" input="w-full" caption={mk('asd')} />
              <TextField name="lastName" placeholder="Tên" input="w-full" />
            </div>
            <TextField name="email" placeholder="Địa chỉ email" />
            <TextField name="password" type="password" placeholder="Mật khẩu" />
            <TextField name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />

            <CheckBoxField
              name="promotions"
              value={{
                id: 'promotions',
                highlight: false,
                content: 'Nhận thông tin khuyến mãi qua email',
              }}
              caption={mk('caption')}
            />
            <CheckBoxField
              name="terms"
              value={{
                id: 'terms',
                highlight: true,
                highlightText: 'điều khoản chính sách',
                content: 'Tôi đã đọc và đồng ý với các điều khoản chính sách của Miki Jewelry',
              }}
              wrapper="mt-7"
              highlight="text-primary-3"
            />

            <Button primary wrapper="w-full">
              Đăng ký
            </Button>

            <p className="flex items-center gap-1 mt-4">
              <span className="caption">Bạn đã có tài khoản?</span>
              <Button text internalLink={PATH.login} title={mk('title')}>
                ĐĂNG NHẬP
              </Button>
            </p>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
