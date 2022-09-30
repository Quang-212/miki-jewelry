import Page from 'src/components/Page';
import { images } from 'src/constants';
import { CircleIcon1, CircleIcon2, CircleIcon3 } from 'src/container/auth/register-form';
import RegisterFormSection from 'src/container/auth/register-form/RegisterForm';

import GuestGuard from 'src/guard/GuestGuard.js';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

RegisterPage.getLayout = (page) => <MainLayout variant="footer">{page}</MainLayout>;

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Đăng ký tài khoản',
          description: '',
          url: PATH.REGISTER,
          thumbnailUrl: images.registerForm,
        }}
      />
      <RegisterFormSection />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </GuestGuard>
  );
}
