import Page from 'src/components/Page';
import { VerifyEmailForm } from 'src/container/auth';
import { GuestGuard } from 'src/guard';

export default function VerifyEmail() {
  return (
    <GuestGuard>
      <Page
        data={{
          title: 'Xác thực',
          description: '',
          thumbnailUrl: '',
        }}
      />
      <VerifyEmailForm />
    </GuestGuard>
  );
}
