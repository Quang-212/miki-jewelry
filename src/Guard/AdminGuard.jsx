import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Button from 'src/components/Button';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';

export default function AdminGuard({ children }) {
  const { isAuthenticated, user } = useRecoilValue(userState);
  useEffect(() => {
    if (!isAuthenticated || user.role !== 'admin') {
      return (
        <>
          <h1>Permissions Denied</h1>
          <Button primary internalLink={PATH.home} wrapper="mt-2">
            Quay lại trang chủ
          </Button>
        </>
      );
    }
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
