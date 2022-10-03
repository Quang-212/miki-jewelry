import Page from 'src/components/Page';
import { ResetPasswordForm } from 'src/container/auth';
import GuestGuard from 'src/guard/GuestGuard.js';

export default function ResetPassword() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Khôi phục mật khẩu',
          description: '',
          thumbnailUrl: '',
        }}
      />
      <ResetPasswordForm />
    </GuestGuard>
  );
}
