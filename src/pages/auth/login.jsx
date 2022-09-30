import Page from 'src/components/Page';
import { images } from 'src/constants';
import {
  CircleIcon1,
  CircleIcon1Mobile,
  CircleIcon2,
  CircleIcon3,
  LoginForm,
} from 'src/container/auth';
import GuestGuard from 'src/guard/GuestGuard.js';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

LoginPage.getLayout = (page) => <MainLayout variant="footer">{page}</MainLayout>;

export default function LoginPage() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Đăng nhập tài khoản',
          description: '',
          url: PATH.LOGIN,
          thumbnailUrl: images.loginForm,
        }}
      />
      <LoginForm />
      <CircleIcon1 />
      <CircleIcon1Mobile />
      <CircleIcon2 />
      <CircleIcon3 />
    </GuestGuard>
  );
}
