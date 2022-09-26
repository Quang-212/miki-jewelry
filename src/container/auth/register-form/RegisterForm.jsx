import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { CheckBoxField, FormProvider, TextField } from 'src/components/HookForms';
import { images } from 'src/constants';
import { sendCode } from 'src/fetching/mailer';
import { PATH } from 'src/routes';
import { formatSearchString } from 'src/utils/formatString';
import styles from './RegisterForm.module.css';
import { emailChecking } from 'src/fetching/auth';

const mk = classNames.bind(styles);

const schema = yup.object().shape({
  firstName: yup.string().required('*Bắt buộc!'),
  lastName: yup.string().required('*Bắt buộc!'),
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
  confirmPassword: yup
    .string()
    .trim()
    .required('*Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password'), null], '*Mật khẩu đã nhập chưa đúng'),
  terms: yup.boolean().oneOf([true], '*Bạn cần đọc và đồng ý với các điều khoản chính sách'),
});

export default function RegisterFormSection() {
  const { push } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: 'Khoi',
      lastName: 'Mom',
      email: 'quang.nv212@gmail.com',
      password: '1234567*Aa',
      confirmPassword: '1234567*Aa',
      promotions: false,
      terms: false,
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  const onSubmit = async (data) => {
    data = {
      ...data,
      userName: `${data.firstName} ${data.lastName}`,
      search: formatSearchString([data.firstName, data.lastName, data.email]),
    };
    await emailChecking({ params: { email: data.email } });
    try {
      await toast.promise(
        sendCode({ email: data.email }),
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
            icon: '😊',
          },
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              return data.response.data.message;
            },
          },
        },
        { autoClose: 5000 },
      );
      sessionStorage.setItem('user', JSON.stringify(data));
      push(PATH.VERIFY_EMAIL('register'));
    } catch (error) {
      if (error.response?.status === 409) {
        toast(error.response.data.message, { type: 'info' });
      }
      setFocus('firstName');
      reset();
      console.log(error);
    }
  };

  return (
    <section className={mk('register')}>
      <div className={mk('wrapper')}>
        <Image
          src={images.registerForm}
          alt="Ảnh form đăng ký"
          width={646}
          height={852}
          objectFit="cover"
          placeholder="blur"
          className="rounded-l-secondary"
        />
        <div className={mk('form')}>
          <BrandLogo vertical wrapper="mt-14" />
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex-col">
            <h5 className="mt-14 font-primary font-bold text-xl leading-7 text-primary">
              Đăng ký tài khoản
            </h5>
            <div className="flex gap-3 mt-8">
              <TextField name="firstName" placeholder="Họ" input="w-full" />
              <TextField name="lastName" placeholder="Tên" input="w-full" />
            </div>
            <TextField name="email" placeholder="Địa chỉ email" />
            <TextField name="password" type="password" placeholder="Mật khẩu" />
            <TextField
              name="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              wrapper="mt-4"
            />

            <CheckBoxField
              name="promotions"
              value={{
                id: 'promotions',
                highlight: false,
                content: 'Nhận thông tin khuyến mãi qua email',
              }}
              caption="h-0"
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
              caption="h-6"
              highlight="text-primary-3 hover:underline hover:opacity-80 transition-all duration-500 ease-in-out"
            />

            <Button primary wrapper="w-full">
              Đăng ký
            </Button>
            <p className="flex items-center gap-1 mt-4">
              <span className="caption">Bạn đã có tài khoản?</span>
              <Button text internalLink={PATH.login} wrapper="ml-2" title={mk('title-btn-login')}>
                Đăng nhập
              </Button>
            </p>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
