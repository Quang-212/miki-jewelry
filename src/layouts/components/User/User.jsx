import { useRecoilValue, useResetRecoilState } from 'recoil';

import Avatar from 'src/components/Avatar';
import { UserIcon } from 'src/components/Icons';
import Menu from 'src/components/Popper/Menu';
import { logoutForm } from 'src/fetching/auth';
import { useClientSide, useRouter } from 'src/hooks';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { handleMenuItems, handleMenuUserItems } from '../Header/nav-config';

export default function User() {
  const isClient = useClientSide();

  const { push, replace } = useRouter();

  const resetUserValue = useResetRecoilState(userState);

  const { user, isAuthenticated } = useRecoilValue(userState);

  const handleClickLogin = () => push(PATH.login);

  const handleClickLogout = async () => {
    if (user?._id) {
      const res = await logoutForm({ params: { userId: user?._id } });
      console.log(res);

      resetUserValue();
      replace(PATH.home);
    }
  };

  return (
    <Menu
      items={
        isAuthenticated
          ? handleMenuUserItems({ handleClickLogout })
          : handleMenuItems(handleClickLogin)
      }
    >
      {isClient && isAuthenticated ? (
        <div className="flex items-center ml-8">
          <Avatar name={user?.userName} imageUrl="" />
        </div>
      ) : (
        <div>
          <UserIcon />
        </div>
      )}
    </Menu>
  );
}
