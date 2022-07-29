import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
import RegisterFormSection, {
  CircleDashIcon1,
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
} from 'src/sections/auth/RegisterForm';

RegisterPage.getLayout = (page) => <MainLayout variant="footer">{page}</MainLayout>;

export default function RegisterPage() {
  return (
    <>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <RegisterFormSection />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
      <CircleDashIcon1 />
    </>
  );
}
