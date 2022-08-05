import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function AboutPage() {
  return (
    <div>
      <Page
        data={{
          title: 'Miki Shop',
          description: '',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <h1 className="text-green-500">Products Page</h1>
    </div>
  );
}
