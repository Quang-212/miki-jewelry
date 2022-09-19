import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'src/hooks';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useRecoilValue(userState);
  const { push } = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      push(PATH.login);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
