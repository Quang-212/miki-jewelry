import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { Banner, ProfileInformation, RecommendedProducts } from 'src/container/profile';
import { AuthGuard } from 'src/Guard';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function Profile() {
  const breadcrumbs = [
    { label: 'Tài khoản', href: PATH.profile },
    { label: 'Thông tin khách hàng', href: PATH.profile },
  ];

  return (
    <AuthGuard>
      <Page
        data={{
          title: 'Thông tin khách hàng',
          description: '',
          url: PATH.profile,
          thumbnailUrl: images.accountProfileBanner,
        }}
      />
      <Banner />
      <div className="container mt-10 flex flex-col gap-10">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <h2 className="heading-2">Thông tin khách hàng</h2>
        <ProfileInformation />
        <RecommendedProducts />
      </div>
    </AuthGuard>
  );
}
