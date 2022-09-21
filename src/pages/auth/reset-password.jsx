import Page from 'src/components/Page';
import Form from 'src/container/auth/reset-password';
import { GuestGuard } from 'src/guard';
import { PATH } from 'src/routes';

export default function ResetPassword() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Khôi phục mật khẩu',
          description: '',
          url: PATH.resetPassword,
          thumbnailUrl: '',
        }}
      />
      <Form />
    </GuestGuard>
  );
}
