import { TextField } from 'src/components/HookForms';
import classNames from 'classnames/bind';

import styles from './Form.module.css';

const mk = classNames.bind(styles);

export default function FormAddress() {
  return (
    <div className={mk('address')}>
      <h6 className={mk('address-title')}>Địa chỉ giao hàng</h6>
      <div className={mk('address-form')}>
        <TextField name="firstName" placeholder="Họ" wrapper={mk('first-name-wrapper')} />
        <TextField name="lastName" placeholder="Tên" wrapper={mk('last-name-wrapper')} />
        <TextField name="city" placeholder="Tỉnh/Thành phố" wrapper={mk('city-wrapper')} />
        <TextField name="district" placeholder="Quận/Huyện" wrapper={mk('district-wrapper')} />
        <TextField name="wards" placeholder="Phường/Xã" wrapper={mk('wards-wrapper')} />
        <TextField
          name="addressNumber"
          placeholder="Địa chỉ cụ thể"
          wrapper={mk('address-number-wrapper')}
        />
        <TextField
          name="phoneNumber"
          placeholder="Số điện thoại"
          wrapper={mk('phone-number-wrapper')}
        />
      </div>
    </div>
  );
}
