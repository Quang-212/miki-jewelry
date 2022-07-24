import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
  TwitterIcon,
} from 'src/components/Icons';
import { PATH } from 'src/routes/path';

export const socialLink = [
  {
    icon: <FacebookIcon />,
    path: PATH.facebook,
  },
  {
    icon: <TwitterIcon />,
    path: PATH.twitter,
  },
  {
    icon: <InstagramIcon />,
    path: PATH.instagram,
  },
  {
    icon: <TikTokIcon />,
    path: PATH.tiktok,
  },
  {
    icon: <PinterestIcon />,
    path: PATH.pinterest,
  },
];

export const businessLicense = [
  'Số GCNĐKDN: 2500150335',
  'Cấp lần đầu: Ngày 26/03/2007',
  'Đăng ký thay đổi lần thứ 16: Ngày 07/05/2018',
  'Cơ quan cấp: Sở kế hoạch và đầu tư tỉnh Vĩnh Phúc',
  'Địa chỉ: Phường Phúc Thắng, Thành phố Phúc Yên, Tỉnh Vĩnh Phúc, Việt Nam',
];

export const publicInformation = [
  {
    title: 'Về chúng tôi',
    value: ['Thương hiệu', 'Lịch sử', 'Tuyển dụng'],
  },
  {
    title: 'Tài khoản',
    value: ['Lịch sử mua hàng', 'Giỏ hàng', 'Thông tin'],
  },
  {
    title: 'Dịch vụ khách hàng',
    value: ['Thanh toán', 'Cẩm nang sử dụng', 'Câu hỏi thường gặp'],
  },
];
