import { Triangle } from 'react-loader-spinner';

export const LoadingRotatingLines = ({ className }) => (
  <span className={className}>
    <Triangle
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </span>
);
