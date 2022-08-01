import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

BrandHistoryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function BrandHistoryPage() {
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
      <h1 className="text-green-500">Brand & History Page</h1>
    </div>
  );
}
