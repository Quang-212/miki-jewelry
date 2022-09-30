import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function getAllUsersHandler(req, res) {
  await dbConnect();
  try {
    const { method } = req;
    const { limit = 10, page = 0, sortBy = 'createdAt', order = -1, search = '' } = req.query;
    switch (method) {
      case 'GET':
        const [userList, total] = await Promise.all([
          User.find({
            status: { $ne: 'deleted' },
            ...(search && { search: new RegExp(search) }),
          })
            .limit(+limit)
            .skip(page * +limit),
          User.find({
            status: { $ne: 'deleted' },
            ...(search && { search: new RegExp(search) }),
          }).countDocuments(),
        ]);

        return res.status(200).json({
          message: 'Get all users OK',
          code: 200,
          data: {
            users: userList,
            total,
            page,
            pageSize: +limit,
            pageCount: Math.ceil(total / +limit),
          },
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
}

export default verifyToken(withAuthorization(getAllUsersHandler, 'admin'));
