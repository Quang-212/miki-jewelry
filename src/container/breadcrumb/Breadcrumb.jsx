import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Breadcrumb from 'src/components/Breadcrumb';
import BreadcrumbItem from 'src/components/Breadcrumb/BreadcrumbItem';
import { PATH } from 'src/routes';

export function BreadcrumbSection() {
  const [breadcrumbs, setBreadcrumbs] = useState();

  const { asPath, pathname } = useRouter();
  console.log(asPath);

  useEffect(() => {
    const pathWithoutQuery = asPath.split('?')[0];
    console.log(pathWithoutQuery);
    let pathArray = pathWithoutQuery.split('/');
    console.log(pathArray);
    pathArray.shift();
    console.log(pathArray);

    pathArray.filter((path) => path !== '');

    const breadcrumbs = pathArray.map((path, index) => {
      console.log(path);
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      console.log(href);
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });
    console.log(breadcrumbs);

    setBreadcrumbs(breadcrumbs);
  }, [asPath]);

  return (
    <Breadcrumb>
      <BreadcrumbItem isCurrent={pathname === '/'} href={PATH.home}>
        Trang chủ
      </BreadcrumbItem>
      {breadcrumbs &&
        breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem
            key={breadcrumb.href}
            href={breadcrumb.href}
            isCurrent={breadcrumb.isCurrent}
          >
            {breadcrumb.label}
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
}
