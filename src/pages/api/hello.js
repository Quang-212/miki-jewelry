import dbConnect from 'src/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  res.status(200).json({ name: 'John Doe' });
}
