import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

RecruitmentPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function RecruitmentPage() {
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
      <h1 className="text-green-500">Recruitment Page</h1>
    </div>
  );
}
