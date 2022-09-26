// import dbConnect from 'src/utils/dbConnect';

import usePusherServer from 'src/hooks/usePusherServer';

async function pusher(req, res) {
  const { method } = req;
  // const { email } = req.query;
  try {
    // await dbConnect();
    switch (method) {
      case 'POST':
        const pusherServer = usePusherServer();
        await pusherServer.trigger('feedback', 'message', { mess: 'Khoi Mom' });
        // const a = pusherServer.send_event('message', { message: 'Khoi Mom' }, 'feedback');
        // console.log(a);
        return res.status(200).json('OK');
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default pusher;
