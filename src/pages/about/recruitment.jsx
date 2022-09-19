import Breadcrumb from 'src/components/Breadcrumb';
import { StarDivider } from 'src/components/Dividers';
import Page from 'src/components/Page';
import { images } from 'src/constants';
import { CircleIcon1, CircleIcon2, Content } from 'src/container/about/recruitment';
import MainLayout from 'src/layouts/MainLayout';
import { PATH } from 'src/routes';

RecruitmentPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function RecruitmentPage() {
  const breadcrumbs = [
    {
      label: 'Về chúng tôi',
      href: PATH.BRAND_HISTORY,
    },
    {
      label: 'Tuyển dụng',
      href: PATH.recruitment,
    },
  ];

  return (
    <>
      <Page
        data={{
          title: 'Tuyển dụng',
          description: '',
          url: PATH.recruitment,
          thumbnailUrl: images.aboutRecruitment,
        }}
      />
      <div className="flex flex-col gap-8 container mt-6">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Content />
        <StarDivider wrapper="mt-7" />
      </div>
      <CircleIcon1 />
      <CircleIcon2 />
    </>
  );
}
