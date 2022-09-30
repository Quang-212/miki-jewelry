import Page from 'src/components/Page';
import { images } from 'src/constants';
import NewPasswordForm, {
  CircleIcon1,
  CircleIcon1Mobile,
  CircleIcon2,
  CircleIcon3,
} from 'src/container/auth/new-password';
import { GuestGuard } from 'src/guard';
import MainLayout from 'src/layouts/MainLayout';

NewPassword.getLayout = (page) => <MainLayout variant="footer">{page}</MainLayout>;

export default function NewPassword() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Thay đổi mật khẩu',
          description: '',
          thumbnailUrl: images.loginForm,
        }}
      />
      <NewPasswordForm />
      <CircleIcon1 />
      <CircleIcon1Mobile />
      <CircleIcon2 />
      <CircleIcon3 />
    </GuestGuard>
  );
}
