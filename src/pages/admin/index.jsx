import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

AdminPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function AdminPage() {
  return (
    <>
      <Page
        data={{
          title: 'Dashboard Admin',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <h1>Dashboard Admin</h1>
    </>
  );
}
