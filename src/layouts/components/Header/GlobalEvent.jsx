import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { initOAuthUser } from 'src/fetching/auth';
import { useRouter } from 'src/hooks';
import usePusherClient from 'src/hooks/usePusherClient';
import { userState } from 'src/recoils';

export default function GlobalEvent() {
  const [{ user, isAuthenticated }, setUserState] = useRecoilState(userState);
  const pusher = usePusherClient();
  const { query, isReady, replace } = useRouter();

  useEffect(() => {
    if (pusher && isAuthenticated && user.role === 'admin') {
      const adminChannel = pusher.subscribe('admin');
      adminChannel.bind('order', (data) => {
        console.log(data);
      });
    }
  }, [pusher, user, isAuthenticated]);

  useEffect(() => {
    if (isReady && !!query.access_token) {
      initOAuthUser({
        headers: {
          Authorization: `Bearer ${query.access_token}`,
        },
      })
        .then(({ data: userInfo }) => {
          setUserState({
            isAuthenticated: true,
            access_token: query.access_token,
            user: userInfo.data,
          });
        })
        .catch((error) => console.log(error))
        .finally(() => replace('/', undefined, { shallow: true }));
    }
  }, [isReady, query]);

  return null;
}
