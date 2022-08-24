import { useMemo } from 'react';

import BasicTable from 'src/components/Table/BasicTable';
import { tableColumns, tableData, notes } from '../more-information-config';

export function TabWarrantyReturn() {
  const warrantyReturnData = useMemo(() => tableData, []);

  const warrantyReturnColumns = useMemo(() => tableColumns, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h5 className="heading-5">Chính sách bảo hành:</h5>
          <p>(Áp dụng cho vàng 18k)</p>
        </div>
        <BasicTable
          data={warrantyReturnData.find((item) => item.heading === 'warrantyReturnTerms').content}
          columns={
            warrantyReturnColumns.find((column) => column.heading === 'warrantyReturnTerms').content
          }
          wrapper="w-[843px] text-left bg-neutral-5"
        />
      </div>
      <div className="flex justify-between">
        <h5 className="heading-5">Phí bảo hành:</h5>
        <BasicTable
          data={
            warrantyReturnData.find((item) => item.heading === 'warrantyReturnExpenses').content
          }
          columns={
            warrantyReturnColumns.find((column) => column.heading === 'warrantyReturnExpenses')
              .content
          }
          wrapper="w-[843px] text-left bg-neutral-5"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h5 className="heading-5">Lưu ý:</h5>
        {notes.map((note) => (
          <p>{note}</p>
        ))}
      </div>
    </div>
  );
}
