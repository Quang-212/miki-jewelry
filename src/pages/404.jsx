import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';
import Page404Section from 'src/sections/page-404';

Page404.getLayout = (page) => <MainLayout variant="404">{page}</MainLayout>;

export default function Page404() {
  return (
    <>
      <Page
        data={{
          title: 'Trang này không tồn tại',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <Page404Section />
    </>
  );
}
