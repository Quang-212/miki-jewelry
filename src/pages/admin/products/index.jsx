import { ProductsList } from 'src/container/admin/products';
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/MainLayout';

ProductsListPage.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

export default function ProductsListPage() {
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
      <ProductsList />
    </>
  );
}
