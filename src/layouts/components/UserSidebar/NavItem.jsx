import Button from 'src/components/Button';
import { useRouter } from 'src/hooks';

export default function NavItem({ data }) {
  const { title, icon, path } = data;

  const { pathname } = useRouter();

  return (
    <Button
      internalLink={path}
      leftIcon={icon}
      scroll={false}
      wrapper={`w-[280px] py-2 px-4 hover:bg-primary-4 rounded-tag duration-200 ease-in-out ${
        path === pathname ? 'bg-primary-4' : ''
      }`}
      title="font-medium"
    >
      {title}
    </Button>
  );
}
