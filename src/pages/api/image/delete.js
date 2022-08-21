import { cloudinary } from 'src/utils/cloudinary';
import dbConnect from 'src/utils/dbConnect';

const handlerDeleteImage = async (req, res) => {
  await dbConnect();
  try {
    const { method } = req;
    switch (method) {
      case 'POST':
        const files = req.body.images;
        await Promise.all(files.map((file) => cloudinary.uploader.destroy(file.public_id)));
        return res.status(200).json({
          message: 'Xóa ảnh thành công',
          code: 200,
        });
      default:
        throw new Error('Phương thức không hợp lệ');
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

export default handlerDeleteImage;
