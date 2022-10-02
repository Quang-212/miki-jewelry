import { useRecoilValue, useResetRecoilState } from 'recoil';
import Avatar from 'src/components/Avatar';
import { UserIcon } from 'src/components/Icons';
import Menu from 'src/components/Popper/Menu';
import { logoutForm } from 'src/fetching/auth';
import { useClientSide, useRouter } from 'src/hooks';
import { userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { MENU_ITEMS, MENU_USER_ITEMS } from '../Header/nav-config';

export default function User() {
  const isClient = useClientSide();

  const { replace } = useRouter();

  const currentAuthState = useRecoilValue(userState);
  const { user, isAuthenticated } = currentAuthState;
  const resetUserValue = useResetRecoilState(userState);

  const handleClickLogout = async () => {
    try {
      const res = await logoutForm();
      resetUserValue();
      replace(PATH.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu items={MENU_USER_ITEMS({ handleClickLogout, currentAuthState })}>
      {isClient && isAuthenticated ? (
        <div className="flex items-center ml-4">
          <Avatar name={user.userName} imageUrl={user.profilePicture?.url} />
        </div>
      ) : (
        <div className="ml-8">
          <UserIcon />
        </div>
      )}
    </Menu>
  );
}
