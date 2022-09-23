import { CheckIcon } from 'src/components/Icons';

export default function TabFilter({ title }) {
  return (
    <div className="flex items-center">
      <CheckIcon />
      {title}
    </div>
  );
}
