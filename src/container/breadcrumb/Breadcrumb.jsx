import { useRouter } from 'next/router';

import BreadcrumbWrapper from 'src/components/Breadcrumb';
import BreadcrumbItem from 'src/components/Breadcrumb/BreadcrumbItem';
import { PATH } from 'src/routes';

export function Breadcrumb({ breadcrumbs }) {
  const { pathname } = useRouter();

  return (
    <BreadcrumbWrapper>
      <BreadcrumbItem isFirst isCurrent={pathname === '/'} href={PATH.home}>
        Trang chủ
      </BreadcrumbItem>
      {breadcrumbs?.map((breadcrumb, index, originalArray) => (
        <BreadcrumbItem
          key={index}
          href={breadcrumb.href}
          isCurrent={index === originalArray.length - 1}
        >
          {breadcrumb.label}
        </BreadcrumbItem>
      ))}
    </BreadcrumbWrapper>
  );
}
