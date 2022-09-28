import Button from 'src/components/Button';
import { TicketIcon } from 'src/components/Icons';
import { fDateTime } from 'src/utils/formartTime';

export default function NotificationReviewItem({ data = {}, onMarkAsRead, onHide, onShow }) {
  const { _id, read, deleted, content, createdAt } = data;
  return (
    <div
      className={`grid grid-cols-12 min-h-[60px] px-4 hover:opacity-90 duration-100 ease-in-out ${
        read || deleted ? 'bg-neutral-5' : 'bg-pink-200'
      }`}
    >
      {!deleted ? (
        <>
          <div className="col-span-2 row-span-2 flex items-center">
            <TicketIcon width={60} height={60} />
          </div>
          <p
            onClick={() => {
              console.log('hello');
            }}
            className="col-span-10 cursor-pointer"
          >
            {content || ''}
          </p>
          <time className="col-span-3 mt-1 caption">{fDateTime(createdAt)}</time>
          <Button
            text
            onClick={() => onMarkAsRead(_id)}
            wrapper="col-span-5 justify-self-end"
            title="text-caption-2 font-semibold hover:opacity-80"
          >
            Đánh dấu đã đọc
          </Button>
          <Button
            text
            onClick={() => onHide(_id)}
            wrapper="col-span-2 justify-self-end"
            title="text-caption-1 font-semibold hover:opacity-80"
          >
            Tạm ẩn
          </Button>
        </>
      ) : (
        <div className="col-span-12 flex justify-center items-center gap-4">
          <p>Thông báo đã được ẩn</p>
          <Button
            text
            onClick={() => onShow(_id)}
            wrapper=""
            title="text-caption-1 font-semibold hover:opacity-80 underline underline-offset-4"
          >
            Hiện
          </Button>
        </div>
      )}
    </div>
  );
}
