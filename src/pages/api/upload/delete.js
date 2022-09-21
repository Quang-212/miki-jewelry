import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handlerDeleteImage(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        const files = req.body.images;
        await Promise.all(files.map((file) => cloudinary.uploader.destroy(file.public_id)));
        return res.status(200).json({
          message: 'Xóa ảnh thành công',
          code: 200,
        });
      default:
        return res.status(400).json({
          message: 'Không tìm thấy yêu cầu hợp lệ',
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

export default handlerDeleteImage;
