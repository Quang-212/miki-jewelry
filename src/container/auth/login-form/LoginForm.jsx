import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
// import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useSetRecoilState } from 'recoil';
import BrandLogo from 'src/components/BrandLogo';
import Button from 'src/components/Button';
import { FormProvider, TextField } from 'src/components/HookForms';
import { FacebookColorIcon, GoogleColorIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { loginForm } from 'src/fetching/auth';
import { useRouter } from 'src/hooks';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';
import styles from './LoginForm.module.css';
import { useEffect } from 'react';

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

export default function LoginForm() {
  const setUser = useSetRecoilState(userState);

  const { replace, prefetch } = useRouter();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset, setFocus } = methods;

  useEffect(() => {
    prefetch('/admin/dashboard');
    prefetch(PATH.HOME);
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await toast.promise(
        loginForm(data),
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
      console.log(res);

      const user = res.data.user;

      setUser({
        user,
        access_token: res.data.accessToken,
        isAuthenticated: true,
      });

      if (user.role === 'admin') {
        return replace(PATH.ADMIN_DASHBOARD);
      }

      replace(PATH.HOME);
    } catch (error) {
      console.log(error);

      setFocus('email');
      reset();
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex-col">
            <h5 className="mt-72-px font-primary font-bold text-xl leading-7 text-primary xs:mt-7 xs:subtitle-1">
              Đăng nhập
            </h5>
            <TextField name="email" placeholder="Địa chỉ email" wrapper="mt-8" />
            <TextField name="password" password placeholder="Mật khẩu" />

            <Button
              type="button"
              text
              internalLink={PATH.RESET_PASSWORD}
              wrapper="mt-5 xs:mt-0"
              title="caption hover:underline underline-offset-4"
            >
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
                rounded
                leftIcon={<GoogleColorIcon />}
                wrapper="w-[200px] xs:w-[168px]"
                // onClick={() => signIn()}
              >
                Google
              </Button>
            </div>

            <p className="flex items-center gap-1 mt-6">
              <span className="caption">Bạn chưa có tài khoản?</span>
              <Button
                text
                internalLink={PATH.REGISTER}
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
