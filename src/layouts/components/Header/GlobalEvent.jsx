import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import usePusherClient from 'src/hooks/usePusherClient';
import { userState } from 'src/recoils';

export default function GlobalEvent() {
  const { user, isAuthenticated } = useRecoilValue(userState);
  const pusher = usePusherClient();
  useEffect(() => {
    if (pusher && isAuthenticated && user.role === 'admin') {
      const adminChannel = pusher.subscribe('admin');
      adminChannel.bind('order', (data) => {
        console.log(data);
      });
    }
  }, [pusher, user, isAuthenticated]);
  return null;
}
