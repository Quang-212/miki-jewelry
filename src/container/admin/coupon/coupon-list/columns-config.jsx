export const columnCoupon = [
  {
    Header: 'Coupons code',
    accessor: 'code',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Discount',
    accessor: 'discount',
  },
  {
    Header: 'Start date',
    accessor: 'startDate',
  },
  {
    Header: 'End date',
    accessor: 'endDate',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row, value }) => (
      <div
        className={`${
          value === 'active'
            ? 'bg-green-600'
            : value === 'in-active'
            ? 'bg-red-600'
            : 'bg-yellow-500'
        } text-white font-semibold rounded-md py-1 flex items-center justify-center`}
      >
        {value}
      </div>
    ),
  },
  {
    Header: 'Discount Category',
    accessor: 'discountCategory',
  },
];
