import Button from 'src/components/Button';
import { BellRingIcon } from 'src/components/Icons';
import NotificationsReview from './NotificationsReview';

export default function Notifications() {
  return (
    <NotificationsReview>
      <Button icon wrapper="absolute top-2/4 -translate-y-2/4">
        <BellRingIcon />
      </Button>
    </NotificationsReview>
  );
}
