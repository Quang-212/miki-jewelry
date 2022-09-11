import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// disable next.js' default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handlerUploadImage(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        await new Promise((resolve) => {
          // you may use any other multer function
          const mw = multer({ storage: multer.diskStorage({}) }).any();
          //use resolve() instead of next()
          mw(req, res, resolve);
        });
        const upload = await Promise.all(
          req.files.map((file) => cloudinary.uploader.upload(file.path)),
        );
        const response = upload.map((res) => ({
          url: res.secure_url,
          public_id: res.public_id,
        }));
        req.files.forEach((file) => {
          unlink(file.path, (err) => {
            if (err) console.log(`failed to deleted file ${err}`);
          });
        });

        return res.status(201, response).json({
          message: 'Tạo mới ảnh thành công',
          code: 201,
          response,
        });

      case 'DELETE':
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

export default handlerUploadImage;
