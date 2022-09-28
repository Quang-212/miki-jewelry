export const notes = [
  'Sản phẩm không còn nguyên vẹn hoặc mất hóa đơn, Miki sẽ thâu mua lại với 80% giá trị sản phẩm.',
  ' Các sản phẩm trang sức bạc, mạ vàng, vòng đá, dây da các loại, chuỗi ngọc trai: Miki không mua lại',
];

export const tableData = [
  {
    heading: 'warrantyReturnTerms',
    content: [
      {
        title: 'Làm sạch sản phẩm',
        time: 'Trọn đời',
      },
      {
        title: 'Đánh bóng và xi mới',
        time: '05 lần',
      },
    ],
  },
  {
    heading: 'warrantyReturnExpenses',
    content: [
      {
        title: 'Sửa độ rung với sản phẩm Ladanse',
        charges: '200.000 đ',
      },
      {
        title: 'Làm mới sản phẩm',
        charges: '50.000 đ',
      },
    ],
  },
  {
    heading: 'shippingTerms',
    content: [
      {
        area: 'Thời gian giao hàng',
        main: '2 ngày',
        other: '3-5 ngày',
      },
    ],
  },
];

export const tableColumns = [
  {
    heading: 'warrantyReturnTerms',
    content: [
      {
        Header: 'Nội dung',
        accessor: 'title',
      },
      {
        Header: 'Thời gian',
        accessor: 'time',
      },
    ],
  },
  {
    heading: 'warrantyReturnExpenses',
    content: [
      {
        Header: 'Nội dung bảo hành',
        accessor: 'title',
      },
      {
        Header: 'Chi phí bảo hành (/lần)',
        accessor: 'charges',
      },
    ],
  },
  {
    heading: 'shippingTerms',
    content: [
      {
        Header: 'Khu vực',
        accessor: 'area',
      },
      {
        Header: 'Nội thành Hà Nội/TP Hồ Chí Minh',
        accessor: 'main',
      },
      {
        Header: 'Các tỉnh khác',
        accessor: 'other',
      },
    ],
  },
];
// consider remove it (*)
export const TABS_FILTER = [
  {
    title: 'Tất cả',
    value: 'all',
  },
  {
    title: '5 Sao (2)',
    value: 'five',
  },
  {
    title: '4 Sao (0)',
    value: 'four',
  },
  {
    title: '3 Sao (0)',
    value: 'three',
  },
  {
    title: '2 Sao (0)',
    value: 'two',
  },
  {
    title: '1 Sao (0)',
    value: 'one',
  },
  {
    title: 'Mới nhất',
    value: 'newest',
  },
  {
    title: 'Có bình luận (0)',
    value: 'comments',
  },
  {
    title: 'Có hình ảnh/ video (0)',
    value: 'image-video',
  },
];
