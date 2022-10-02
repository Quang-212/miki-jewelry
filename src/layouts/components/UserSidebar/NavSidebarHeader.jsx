import { useRecoilValue } from 'recoil';
import Avatar from 'src/components/Avatar';
import { useClientSide } from 'src/hooks';
import { userState } from 'src/recoils';

export default function NavSidebarHeader() {
  const {
    user: { userName, profilePicture },
  } = useRecoilValue(userState);

  const isClient = useClientSide();

  return (
    <>
      {isClient && (
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-3 row-span-2 flex items-center w-14 h-14">
            <Avatar name={userName} imageUrl={profilePicture.url} width={50} height={50} />
          </div>
          <span className="col-span-9">Tài khoản của</span>
          <span className="col-span-9 text-lg">{userName}</span>
        </div>
      )}
    </>
  );
}
