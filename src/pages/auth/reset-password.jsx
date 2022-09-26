import Page from 'src/components/Page';
import Form from 'src/container/auth/reset-password';
// import GuestGuard from 'src/guard/GuestGuard';

export default function ResetPassword() {
  return (
    <>
      <Page
        data={{
          title: 'Khôi phục mật khẩu',
          description: '',
          thumbnailUrl: '',
        }}
      />
      <Form />
    </>
  );
}
