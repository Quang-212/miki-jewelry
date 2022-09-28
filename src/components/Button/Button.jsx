import classNames from 'classnames/bind';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.css';

const mk = classNames.bind(styles);

const Button = React.forwardRef(
  (
    {
      internalLink,
      externalLink,
      normal,
      primary,
      outline,
      rounded,
      small = false,
      large = false,
      text = false,
      icon = false,
      underline = false,
      disabled,
      children,
      wrapper,
      leftIcon,
      rightIcon,
      title,
      onClick,
      ...passProps
    },
    ref,
  ) => {
    let ButtonWrapper = 'button';
    const ButtonTitle = 'span';
    const ButtonIcon = 'span';

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

    const classWrapper = mk('root', 'btn', {
      normal,
      primary,
      outline,
      rounded,
      small,
      large,
      text,
      icon,
      underline,
      disabled,
      [wrapper]: wrapper,
    });

    const classTitle = underline
      ? mk('title-underline', {
          [title]: title,
        })
      : mk('title', {
          [title]: title,
        });

    if (internalLink) {
      ButtonWrapper = Link;
      props.href = internalLink;

      return (
        <ButtonWrapper ref={ref} {...props}>
          <a className={classWrapper}>
            {leftIcon && <ButtonIcon className={mk('icon')}>{leftIcon}</ButtonIcon>}
            <ButtonTitle className={classTitle}>{children}</ButtonTitle>
            {rightIcon && <ButtonIcon className={mk('icon')}>{rightIcon}</ButtonIcon>}
          </a>
        </ButtonWrapper>
      );
    }

    if (externalLink) {
      ButtonWrapper = 'a';
      props.href = externalLink;
    }

    return (
      <ButtonWrapper ref={ref} className={classWrapper} {...props}>
        {leftIcon && <ButtonIcon className={mk('icon')}>{leftIcon}</ButtonIcon>}
        <ButtonTitle className={classTitle}>{children}</ButtonTitle>
        {rightIcon && <ButtonIcon className={mk('icon')}>{rightIcon}</ButtonIcon>}
      </ButtonWrapper>
    );
  },
);

Button.propTypes = {
  internalLink: PropTypes.string,
  externalLink: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  text: PropTypes.bool,
  // disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
