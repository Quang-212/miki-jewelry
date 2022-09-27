import axios from 'axios';
import React, { useEffect } from 'react';
import usePusherClient from 'src/hooks/usePusherClient';

export default function a() {
  const pusher = usePusherClient();
  useEffect(() => {
    if (pusher) {
      const channel = pusher.subscribe('feedback');
      channel.bind('message', (data) => {
        console.log(data);
      });
    }
  }, [pusher]);
  const handleSendMessage = async () => {
    const res = await axios({
      method: 'POST',
      url: '/api/pusher',
    });
  };
  return (
    <div>
      <button onClick={handleSendMessage}>Gui tin nhan</button>
    </div>
  );
}
