import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'src/hooks';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useRecoilValue(userState);
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH.home);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
