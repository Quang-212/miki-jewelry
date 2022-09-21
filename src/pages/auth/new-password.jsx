import Page from 'src/components/Page';
import { images } from 'src/constants';
import Form, {
  CircleIcon1,
  CircleIcon1Mobile,
  CircleIcon2,
  CircleIcon3,
} from 'src/container/auth/new-password';
import GuestGuard from 'src/guard/GuestGuard';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

NewPassword.getLayout = (page) => <MainLayout variant="footer">{page}</MainLayout>;

export default function NewPassword() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Thay đổi mật khẩu',
          description: '',
          url: PATH.newPassword,
          thumbnailUrl: images.loginForm,
        }}
      />
      <Form />
      <CircleIcon1 />
      <CircleIcon1Mobile />
      <CircleIcon2 />
      <CircleIcon3 />
    </GuestGuard>
  );
}
