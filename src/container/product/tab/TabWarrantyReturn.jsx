import { useMemo } from 'react';

import BasicTable from 'src/components/Tables/BasicTable';
import { tableColumns, tableData, notes } from './tab-config';

export function TabWarrantyReturn() {
  const warrantyReturnData = useMemo(() => tableData, []);

  const warrantyReturnColumns = useMemo(() => tableColumns, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h5 className="font-primary font-bold text-xl leading-7 text-primary">
            Chính sách bảo hành:
          </h5>
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
        <h5 className="font-primary font-bold text-xl leading-7 text-primary">Phí bảo hành:</h5>
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
        <h5 className="font-primary font-bold text-xl leading-7 text-primary">Lưu ý:</h5>
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
    </div>
  );
}
