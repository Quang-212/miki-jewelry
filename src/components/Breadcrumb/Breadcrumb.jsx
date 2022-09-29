import BreadcrumbItem from 'src/components/Breadcrumb/BreadcrumbItem';
import BreadcrumbWrapper from 'src/components/Breadcrumb/BreadcrumbWrapper';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';

export default function Breadcrumb({ breadcrumbs, className }) {
  const { pathname } = useRouter();

  return (
    <BreadcrumbWrapper className={className}>
      <BreadcrumbItem isFirst isCurrent={pathname === '/'} href={PATH.HOME}>
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
