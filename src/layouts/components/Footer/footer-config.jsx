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
    icon: <FacebookIcon className="w-6 h-6" />,
    path: PATH.facebook,
  },
  {
    icon: <TwitterIcon className="w-6 h-6" />,
    path: PATH.twitter,
  },
  {
    icon: <InstagramIcon className="w-6 h-6" />,
    path: PATH.instagram,
  },
  {
    icon: <TikTokIcon className="w-6 h-6" />,
    path: PATH.tiktok,
  },
  {
    icon: <PinterestIcon className="w-6 h-6" />,
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
    heading: 'Về chúng tôi',
    content: [
      {
        title: 'Thương hiệu',
        path: PATH.brand,
      },
      {
        title: 'Lịch sử',
        path: PATH.history,
      },
      {
        title: 'Tuyển dụng',
        path: PATH.recruitment,
      },
    ],
  },
  {
    heading: 'Tài khoản',
    content: [
      {
        title: 'Lịch sử mua hàng',
        path: PATH.purchasedHistory,
      },
      {
        title: 'Giỏ hàng',
        path: PATH.cart,
      },
      {
        title: 'Thông tin',
        path: PATH.informations,
      },
    ],
  },
  {
    heading: 'Dịch vụ khách hàng',
    content: [
      {
        title: 'Thanh toán',
        path: PATH.payment,
      },
      {
        title: 'Cẩm nang sử dụng',
        path: PATH.handbook,
      },
      {
        title: 'Câu hỏi thường gặp',
        path: PATH.questions,
      },
    ],
  },
];
