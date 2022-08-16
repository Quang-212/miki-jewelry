import { cloudinary } from 'src/utils/cloudinary';
import dbConnect from 'src/utils/dbConnect';

const handlerDeleteImage = async (req, res) => {
  await dbConnect();
  const { method } = req;
  if (method == 'POST') {
    const files = req.body.images;
    await Promise.all(files.map((file) => cloudinary.uploader.destroy(file.public_id)));
    return res.status(200).json({
      message: 'Xóa ảnh thành công',
      code: 200,
    });
  }
};

export default handlerDeleteImage;
