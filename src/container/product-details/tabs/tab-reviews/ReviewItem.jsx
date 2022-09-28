import Avatar from 'src/components/Avatar';
import { fDateTime } from 'src/utils/formartTime';

export default function ReviewItem({ feedback = {} }) {
  return (
    <div className="grid grid-cols-12 gap-y-1">
      <div className="col-span-1 row-span-4 w-16 h-16">
        <Avatar
          name={feedback.user.userName}
          imageUrl={feedback.user.profilePicture?.url}
          width="100"
          height="100"
        />
      </div>
      <p className="col-span-11">{feedback.user.userName}</p>
      <div className="col-span-11">{[...Array(feedback.rating)].fill('*')}</div>
      <p className="col-span-11 mt-2">{feedback.comment || ''}</p>
      <p className="col-span-11 mt-2">{`${fDateTime(feedback.createdAt)} | Size: 16`}</p>
    </div>
  );
}
