import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import Breadcrumb from 'src/components/Breadcrumb';
import BreadcrumbItem from 'src/components/Breadcrumb/BreadcrumbItem';
import '../styles/globals.css';
import { NavigateNextIcon } from 'src/components/Icons';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // const [breadcrumbs, setBreadcrumbs] = useState();

  // const { asPath, pathname } = useRouter();
  // console.log(asPath);

  // useEffect(() => {
  //   const pathWithoutQuery = asPath.split('?')[0];
  //   console.log(pathWithoutQuery);
  //   let pathArray = pathWithoutQuery.split('/');
  //   console.log(pathArray);
  //   pathArray.shift();
  //   console.log(pathArray);

  //   pathArray.filter((path) => path !== '');

  //   const breadcrumbs = pathArray.map((path, index) => {
  //     console.log(path);
  //     const href = '/' + pathArray.slice(0, index + 1).join('/');
  //     console.log(href);
  //     return {
  //       href,
  //       label: path.charAt(0).toUpperCase() + path.slice(1),
  //       isCurrent: index === pathArray.length - 1,
  //     };
  //   });
  //   console.log(breadcrumbs);

  //   setBreadcrumbs(breadcrumbs);
  // }, [asPath]);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: (url) => axios.get(url),
            shouldRetryOnError: false,
            revalidateOnFocus: false,
          }}
        >
          {/* <Breadcrumb>
            <BreadcrumbItem isCurrent={pathname === '/'} href="/">
              Home
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
          </Breadcrumb> */}

          {getLayout(<Component {...pageProps} />)}

          <ToastContainer
            bodyClassName="toast"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={5}
          />
        </SWRConfig>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
