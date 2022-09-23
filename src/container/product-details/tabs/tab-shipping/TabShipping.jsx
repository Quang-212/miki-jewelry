import { useMemo } from 'react';
import classNames from 'classnames/bind';

import BasicTable from 'src/components/Tables/BasicTable';
import { tableColumns, tableData } from '../tab-config';
import styles from './TabShipping.module.css';

const mk = classNames.bind(styles);

export default function TabShipping() {
  const shippingData = useMemo(() => tableData, []);

  const shippingColumns = useMemo(() => tableColumns, []);

  return (
    <div className={mk('tab-shipping')}>
      <h5 className={mk('title')}>Chính sách vận chuyển</h5>
      <p>
        Với đối tác giao hàng uy tín, có mua bảo hiểm hàng hóa, thời gian giao hàng nhanh và đúng
        hẹn:
      </p>
      <div className={mk('table-container')}>
        <BasicTable
          data={shippingData.find((data) => data.heading === 'shippingTerms').content}
          columns={shippingColumns.find((column) => column.heading === 'shippingTerms').content}
          wrapper={mk('table-wrapper')}
        />
      </div>
      <div className={mk('note-wrapper')}>
        <span className={mk('note-title')}>**** Chú ý</span>
        <p>
          Với sản phẩm giảm giá khuyến mãi từ 20% trở lên khách hàng sẽ chịu hoàn toàn phí giao
          hàng.
        </p>
      </div>
    </div>
  );
}
