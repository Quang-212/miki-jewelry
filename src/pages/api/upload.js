import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, //need to change before use
  api_key: process.env.API_KEY, //need to change before use
  api_secret: process.env.API_SECRET, //need to change before use
});
// disable next.js' default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
async function handler(req, res) {
  try {
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
    // example response
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
export default handler;
