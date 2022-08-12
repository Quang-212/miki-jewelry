import { RotatingLines } from 'react-loader-spinner';

export const LoadingRotatingLines = ({ className }) => (
  <span className={className}>
    <RotatingLines
      strokeColor="#6E5544"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </span>
);
