import classNames from 'classnames/bind';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const mk = classNames.bind(styles);

export default function Button({
  internalLink,
  externalLink,
  primary,
  outline,
  rounded,
  small = false,
  large = false,
  text = false,
  icon = false,
  disabled,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Component = 'button';

  const props = {
    onClick,
    ...passProps,
  };

  //* Remove event listener when button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] !== 'function') {
        delete props[key];
      }
    });
  }

  const classes = mk('root', {
    primary,
    outline,
    rounded,
    small,
    large,
    text,
    icon,
    disabled,
    [className]: className,
  });

  if (internalLink) {
    props.href = internalLink;

    return (
      <Link {...props}>
        <a className={classes}>
          {leftIcon && <span className={mk('icon')}>{leftIcon}</span>}
          <span className={mk('title')}>{children}</span>
          {rightIcon && <span className={mk('icon')}>{rightIcon}</span>}
        </a>
      </Link>
    );
  }

  if (externalLink) {
    Component = 'a';
    props.href = externalLink;
  }

  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={mk('icon')}>{leftIcon}</span>}
      <span className={mk('title')}>{children}</span>
      {rightIcon && <span className={mk('icon')}>{rightIcon}</span>}
    </Component>
  );
}

Button.propTypes = {
  internalLink: PropTypes.string,
  externalLink: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  text: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};
