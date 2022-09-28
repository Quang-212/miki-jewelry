import Notification from 'src/models/Notification';
import dbConnect from 'src/utils/dbConnect';

const markAsReadHandler = async (req, res) => {
  await dbConnect();
  try {
    const { method } = req;
    const { id } = req.body;
    const { type = 'one' } = req.query;

    switch (method) {
      case 'POST':
        type === 'many'
          ? await Notification.updateMany({ _id: { $in: id } }, { deleted: true })
          : await Notification.findByIdAndUpdate(id, { deleted: true });
        return res.status(200).json({
          message: 'OK',
          code: 200,
        });

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
};

export default markAsReadHandler;
