import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';

cloudinary.config({
  cloud_name: 'clouds-store', //need to change before use
  api_key: '357675581138582', //need to change before use
  api_secret: '3-40WPZO6Zogw2Lr8KnK6W7HlyA', //need to change before use
});
// disable next.js' default body parser
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  await new Promise((resolve) => {
    // you may use any other multer function
    const mw = multer({ storage: multer.diskStorage({}) }).any();

    //use resolve() instead of next()
    mw(req, res, resolve);
  });

  console.log(req.files);

  const upload = await Promise.all(req.files.map((file) => cloudinary.uploader.upload(file.path)));
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
  res.status(200).json(response);
}
