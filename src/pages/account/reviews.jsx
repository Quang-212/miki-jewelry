import MainLayout from 'src/layouts/MainLayout';

Reviews.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function Reviews() {
  return <div>reviews</div>;
}
