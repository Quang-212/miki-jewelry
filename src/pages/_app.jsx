import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { CollapseDrawerProvider } from 'src/context/CollapseDrawer';
import { SWRConfig } from 'swr';

import '../styles/globals.css';
import '../styles/nprogres.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <CollapseDrawerProvider>
          <SWRConfig
            value={{
              fetcher: (url) => axios.get(url),
              shouldRetryOnError: false,
              revalidateOnFocus: false,
            }}
          >
            <ProgressBar />
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
        </CollapseDrawerProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
