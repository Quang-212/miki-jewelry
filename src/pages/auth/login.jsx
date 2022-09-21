import Page from 'src/components/Page';
import { images } from 'src/constants';
import LoginFormSection, {
  CircleIcon1,
  CircleIcon1Mobile,
  CircleIcon2,
  CircleIcon3,
} from 'src/container/auth/login-form';
import GuestGuard from 'src/guard/GuestGuard';
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
          url: PATH.login,
          thumbnailUrl: images.loginForm,
        }}
      />
      <LoginFormSection />
      <CircleIcon1 />
      <CircleIcon1Mobile />
      <CircleIcon2 />
      <CircleIcon3 />
    </GuestGuard>
  );
}
