import Breadcrumb from 'src/components/Breadcrumb';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { ProfileInformation, RecommendedProducts } from 'src/container/user';
import AuthGuard from 'src/guard/AuthGuard.js';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

Profile.getLayout = (page) => <MainLayout variant="user">{page}</MainLayout>;

export default function Profile() {
  const breadcrumbs = [
    { label: 'Tài khoản', href: PATH.PROFILE },
    { label: 'Thông tin khách hàng', href: PATH.PROFILE },
  ];

  return (
    <AuthGuard>
      <Page
        data={{
          title: 'Thông tin khách hàng',
          description: '',
          url: PATH.PROFILE,
          thumbnailUrl: images.accountProfileBanner,
        }}
      />
      {/* <Banner /> */}
      {/* <div className="container mt-10 flex flex-col gap-10"> */}
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
        Thông tin khách hàng
      </h2>
      <ProfileInformation />
      <RecommendedProducts />
      {/* </div> */}
    </AuthGuard>
  );
}
