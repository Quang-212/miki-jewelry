import Button from 'src/components/Button';
import { BellRingIcon } from 'src/components/Icons';
import NotificationsPreview from './NotificationsPreview';

export default function Notifications() {
  return (
    <NotificationsPreview>
      <Button icon wrapper="absolute top-2/4 -translate-y-2/4">
        <BellRingIcon />
      </Button>
    </NotificationsPreview>
  );
}
