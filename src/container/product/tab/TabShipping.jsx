import { useMemo } from 'react';

import BasicTable from 'src/components/Tables/BasicTable';
import { tableColumns, tableData } from './tab-config';

export function TabShipping() {
  const shippingData = useMemo(() => tableData, []);

  const shippingColumns = useMemo(() => tableColumns, []);

  return (
    <div className="flex flex-col gap-4">
      <h5 className="heading-5">Chính sách vận chuyển</h5>
      <p>
        Với đối tác giao hàng uy tín, có mua bảo hiểm hàng hóa, thời gian giao hàng nhanh và đúng
        hẹn:
      </p>
      <div className="flex justify-center mt-2">
        <BasicTable
          data={shippingData.find((data) => data.heading === 'shippingTerms').content}
          columns={shippingColumns.find((column) => column.heading === 'shippingTerms').content}
          wrapper="w-[940px] text-left bg-neutral-5"
        />
      </div>
      <div className="flex flex-col mt-3">
        <span className="text-caption-1">**** Chú ý</span>
        <p>
          Với sản phẩm giảm giá khuyến mãi từ 20% trở lên khách hàng sẽ chịu hoàn toàn phí giao
          hàng.
        </p>
      </div>
    </div>
  );
}
