import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

export default function usePusherClient() {
  const [pusherClient, setPusherClient] = useState(null);

  useEffect(() => {
    const pusherClient = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });
    setPusherClient(pusherClient);
  }, []);

  return pusherClient;
}
