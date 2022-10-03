import { Triangle, Oval } from 'react-loader-spinner';

export const LoadingRotatingLines = ({ className }) => (
  <span className={className}>
    <Triangle
      height="80"
      width="80"
      color="#6E5544"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </span>
);

export const LoadingOval = ({ className }) => (
  <span className={className}>
    <Oval
      height={24}
      width={24}
      color="#6E5544"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#6E5544"
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  </span>
);
