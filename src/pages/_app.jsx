import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
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
    </RecoilRoot>
  );
}

export default MyApp;
