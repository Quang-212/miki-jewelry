import MainLayout from 'src/layouts/MainLayout';

Favorites.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function Favorites() {
  return <div>favorites</div>;
}
