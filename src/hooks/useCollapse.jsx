import { useContext } from 'react';
import { CollapseDrawerContext } from 'src/context/CollapseDrawer';

export default function useCollapseDrawer() {
  const context = useContext(CollapseDrawerContext);
  return context;
}
