import { businessLicense, publicInformation, socialLink } from './navConfig';

export default function Footer() {
  return (
    <footer className="container">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p>Đăng ký để nhận khuyến mãi</p>
          <input />
        </div>
        <div className="flex flex-col">
          <p>Kết nối với chúng tôi tại</p>
          <ul className="flex">
            {socialLink.map((item, index) => (
              <li key={index}>{item.icon}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="my-10 border border-solid" />
      <div className="flex justify-between">
        <div className="w-342-px">
          <p className="font-secondary text-5xl leading-56-px font-bold">Miki Jewelry</p>
          <ul>
            {businessLicense.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-16 mr-12">
          {publicInformation.map((item, index) => (
            <ul key={index}>
              <li className="text-xl">{item.title}</li>
              {item.value.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
}
