import Pusher from 'pusher';

export default function usePusherServer() {
  const pusherServer = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
  });

  return pusherServer;
}
