import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import { BellRingIcon } from 'src/components/Icons';
import NotificationsReview from './NotificationsReview';

export default function Notifications() {
  return (
    <NotificationsReview>
      <Badge badgeContent={4 || 0} wrapper="ml-4">
        <Button icon wrapper="absolute top-2/4 -translate-y-2/4">
          <BellRingIcon />
        </Button>
      </Badge>
    </NotificationsReview>
  );
}
