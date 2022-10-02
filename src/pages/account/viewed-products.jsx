import MainLayout from 'src/layouts/MainLayout';

ViewedProducts.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function ViewedProducts() {
  return <div>viewed-products</div>;
}
