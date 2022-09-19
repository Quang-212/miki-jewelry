import Page from 'src/components/Page';
import { images } from 'src/constants';
import RegisterFormSection, {
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
} from 'src/container/auth/register-form';
import { GuestGuard } from 'src/Guard';
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
          url: PATH.register,
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
