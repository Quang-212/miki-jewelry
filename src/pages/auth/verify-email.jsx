import Page from 'src/components/Page';
import { VerifyEmailForm } from 'src/container/auth';
// import GuestGuard from 'src/guard/GuestGuard';
import { PATH } from 'src/routes';

export default function VerifyEmail() {
  return (
    <>
      <Page
        data={{
          title: 'Xác thực',
          description: '',
          thumbnailUrl: '',
        }}
      />
      <VerifyEmailForm />
    </>
  );
}
