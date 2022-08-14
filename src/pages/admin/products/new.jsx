import { CreateProduct } from 'src/sections/admin/products';
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

CreateProductPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function CreateProductPage() {
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
      <CreateProduct />
    </>
  );
}
