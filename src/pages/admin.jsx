import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';
import { ProductEdit } from 'src/sections/admin/products';

AdminPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function AdminPage() {
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
      <ProductEdit />
    </>
  );
}
