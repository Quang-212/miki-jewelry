import classNames from 'classnames/bind';
import { CheckBoxField, TextField } from 'src/components/HookForms';

import { MasterIcon, PaypalIcon, VisaIcon } from 'src/components/Icons';
import styles from './Form.module.css';

const mk = classNames.bind(styles);

export default function FormPayment({ setValue }) {
  const handleChange = (event) => {
    return setValue('payment', [event.target.value]);
  };

  return (
    <div className={mk('payment')}>
      <h6 className={mk('payment-title')}>Phương thức thanh toán</h6>
      <div className={mk('payment-form')}>
        <CheckBoxField
          name="payment"
          value={{
            id: 'cash',
            content: 'Tiền mặt',
          }}
          inputValue="cash"
          onChange={handleChange}
          wrapper={mk('cash-wrapper')}
          caption="h-0"
        />
        <div className={mk('saved-card')}>
          <CheckBoxField
            name="payment"
            value={{
              id: 'savedCard',
              content: 'Thẻ đã lưu',
            }}
            inputValue="savedCard"
            onChange={handleChange}
            caption="h-0"
          />
          <div className={mk('visa-number')}>
            <VisaIcon />
            <span>***6699</span>
          </div>
        </div>
        <div className={mk('card-wrapper')}>
          <CheckBoxField
            name="payment"
            value={{
              id: 'newCard',
              content: 'Thẻ tín dụng hoặc thẻ ghi nợ ',
            }}
            inputValue="newCard"
            onChange={handleChange}
            input="register-checkbox"
            caption="h-0"
          />
          <div className={mk('card-list')}>
            <VisaIcon />
            <MasterIcon />
            <PaypalIcon />
          </div>
        </div>
        <TextField
          name="newCard.cardNumber"
          placeholder="Nhập số thẻ"
          wrapper={mk('card-number-wrapper')}
        />
        <TextField
          name="newCard.date"
          placeholder="Ngày hết hạn (MM/YY)"
          wrapper={mk('date-wrapper')}
        />
        <TextField name="newCard.code" placeholder="Mã CVV" wrapper={mk('code-wrapper')} />
      </div>
    </div>
  );
}
