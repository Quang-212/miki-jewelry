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

async function handlerCreateImage(req, res) {
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
        const cloudUpload = async (files) => {
          let response;
          if (files.length === 1) {
            const res = await cloudinary.uploader.upload(files[0].path);
            response = { url: res.secure_url, public_id: res.public_id };
          } else {
            const multipleUpload = await Promise.all(
              files.map((file) => cloudinary.uploader.upload(file.path)),
            );
            response = multipleUpload.map((res) => ({
              url: res.secure_url,
              public_id: res.public_id,
            }));
          }
          req.files.forEach((file) => {
            unlink(file.path, (err) => {
              if (err) console.log(`failed to deleted file ${err}`);
            });
          });

          return response;
        };

        return res.status(201).json({
          message: 'Tạo mới ảnh thành công',
          code: 201,
          data: await cloudUpload(req.files),
        });

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handlerCreateImage;
