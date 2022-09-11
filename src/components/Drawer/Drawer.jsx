import styles from './Drawer.module.css';
import classNames from 'classnames/bind';
import { openWithAnchor } from 'src/utils/openWithAnchor';

const mk = classNames.bind(styles);

const Drawer = ({ anchor = 'left', open, width = 280, children, className, ...other }) => {
  const classRoot = mk('root', {
    [anchor]: anchor,
    ...(!open && {
      [openWithAnchor(anchor)]: openWithAnchor(anchor),
    }),
    [className]: className,
  });

  return (
    <div className={classRoot} {...other}>
      <div className="h-full transition-all" style={{ width: `${width}px` }}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
