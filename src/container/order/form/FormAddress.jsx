import { TextField } from 'src/components/HookForms';
import classNames from 'classnames/bind';

import styles from './Form.module.css';
import Autocomplete from 'src/components/Autocomplete';

const mk = classNames.bind(styles);

export default function FormAddress({
  provinces,
  districts,
  wards,
  onSelectCity,
  onSelectDistrict,
  onSelectWards,
  disableDistricts,
  disableWards,
}) {
  return (
    <div className={mk('address')}>
      <h6 className={mk('address-title')}>Địa chỉ giao hàng</h6>
      <div className={mk('address-form')}>
        <TextField name="firstName" placeholder="Họ" wrapper={mk('first-name-wrapper')} />
        <TextField name="lastName" placeholder="Tên" wrapper={mk('last-name-wrapper')} />

        <Autocomplete
          name="city"
          options={provinces}
          getOption={(option) => option?.name}
          onSelectValue={onSelectCity}
          placeholder="Tỉnh/Thành phố"
          className={mk('city-wrapper')}
        />

        <Autocomplete
          name="district"
          options={districts}
          getOption={(option) => option?.name}
          onSelectValue={onSelectDistrict}
          disable={disableDistricts}
          placeholder="Quận/Huyện"
          className={mk('district-wrapper')}
        />

        <Autocomplete
          name="ward"
          options={wards}
          getOption={(option) => option?.name}
          onSelectValue={onSelectWards}
          disable={disableWards}
          placeholder="Phường/Xã"
          className={mk('wards-wrapper')}
        />

        <TextField
          name="detailAddress"
          placeholder="Địa chỉ cụ thể"
          wrapper={mk('address-number-wrapper')}
        />
        <TextField name="phone" placeholder="Số điện thoại" wrapper={mk('phone-number-wrapper')} />
      </div>
    </div>
  );
}
