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
        <div className="flex items-center gap-2 col-span-2 p-4 border-b-[1px] border-primary">
          <CheckBoxField
            multiple
            hidden
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
          <label htmlFor="cash" className="cursor-pointer">
            Tiền mặt
          </label>
        </div>
        <div className={mk('saved-card')}>
          <div className="flex items-center gap-2">
            <CheckBoxField
              multiple
              hidden
              name="payment"
              value={{
                id: 'savedCard',
              }}
              inputValue="savedCard"
              onChange={handleChange}
              caption="h-0"
            />
            <label htmlFor="savedCard" className="cursor-pointer">
              Thẻ đã lưu
            </label>
          </div>
          <div className={mk('visa-number')}>
            <VisaIcon />
            <span>***6699</span>
          </div>
        </div>
        <div className={mk('card-wrapper')}>
          <div className="flex items-center gap-2">
            <CheckBoxField
              multiple
              hidden
              name="payment"
              value={{
                id: 'newCard',
                content: 'Thẻ tín dụng hoặc thẻ ghi nợ',
              }}
              inputValue="newCard"
              onChange={handleChange}
              input="register-checkbox"
              caption="h-0"
            />
            <label htmlFor="newCard" className="cursor-pointer">
              Thẻ tín dụng hoặc thẻ ghi nợ
            </label>
          </div>
          <div className={mk('card-list')}>
            <VisaIcon />
            <MasterIcon />
            <PaypalIcon />
          </div>
        </div>
        <TextField
          name="newCard.number"
          placeholder="Nhập số thẻ"
          wrapper={mk('card-number-wrapper')}
        />
        <TextField
          name="newCard.expireTime"
          type="date"
          placeholder="Ngày hết hạn (MM/YY)"
          wrapper={mk('date-wrapper')}
        />
        <TextField name="newCard.cvv" placeholder="Mã CVV" wrapper={mk('code-wrapper')} />
      </div>
    </div>
  );
}
