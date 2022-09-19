import verifyToken from 'src/middlewares/verifyToken';
import { genSalt, hash, compare } from 'bcrypt';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function updateInfoHandler(req, res) {
  await dbConnect();
  try {
    const { method } = req;
    const { password, currentPassword, newPassword, ...rest } = req.body;
    const { userId } = req.query;

    switch (method) {
      case 'PATCH':
        if (req.user._id !== userId) {
          return res.status(401).json({
            message: 'Bạn không thể sửa thông tin của người khác',
            code: 401,
          });
        }

        if (password || currentPassword || newPassword) {
          const targetUser = await User.findById(userId).lean();
          const isValidPassword = await compare(currentPassword, targetUser.password);

          if (isValidPassword) {
            const salt = await genSalt(10);
            const hashPassword = await hash(newPassword, salt);
            const newData = await User.findByIdAndUpdate(
              userId,
              {
                ...rest,
                password: hashPassword,
              },
              { new: true },
            ).lean();
            const { password: _, ...restData } = newData;
            return res.status(200).json({
              message: 'Cập nhật thông tin OK*',
              code: 200,
              data: restData,
            });
          } else {
            return res.status(403).json({
              message: 'Mật khẩu vừa nhập không đúng',
              code: 403,
            });
          }
        }
        const newData = await User.findByIdAndUpdate(userId, { ...rest }, { new: true }).lean();
        const { password: _, ...restData } = newData;
        return res.status(200).json({
          message: 'Cập nhật thông tin OK',
          code: 200,
          data: restData,
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

export default verifyToken(updateInfoHandler);
