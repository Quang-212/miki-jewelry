import Button from 'src/components/Button';
import { TicketIcon } from 'src/components/Icons';
import { fDateTime } from 'src/utils/formartTime';

export default function NotificationReviewItem({ data }) {
  return (
    <div className="grid grid-cols-12 px-4 bg-orange-50 hover:bg-wrapper">
      <div className="col-span-2 row-span-2 flex items-center">
        <TicketIcon width={60} height={60} />
      </div>
      <p
        onClick={() => {
          console.log('hello');
        }}
        className="col-span-10 cursor-pointer"
      >
        {data.content || ''}
      </p>
      <time className="col-span-3 mt-1">{fDateTime(data.createdAt)}</time>
      <Button
        text
        wrapper="col-span-5 justify-self-end"
        title="text-caption-2 font-semibold hover:opacity-80"
      >
        Đánh dấu đã đọc
      </Button>
      <Button
        text
        wrapper="col-span-2 justify-self-end"
        title="text-caption-1 font-semibold hover:opacity-80"
      >
        Xóa
      </Button>
    </div>
  );
}
