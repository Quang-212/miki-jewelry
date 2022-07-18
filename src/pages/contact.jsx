import Page from 'src/components/Page';
import MainLayout from 'src/layouts';
//always import from src folder, not "./", "../", "../../",...

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function ContactPage() {
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
      <h1 className="text-green-500">Contact Page</h1>
    </div>
  );
}
