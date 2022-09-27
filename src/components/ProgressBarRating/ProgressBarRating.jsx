import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProgressBarRating.module.css';

const mk = classNames.bind(styles);

export default function ProgressBarRating({ done }) {
  // const [style, setStyle] = useState({});

  // setTimeout(() => {
  //   const newStyle = {
  //     opacity: 1,
  //     width: `${done}%`,
  //   };

  //   setStyle(newStyle);
  // }, 200);

  return (
    <div className={mk('progress')}>
      <div
        className={mk('progress-done')}
        style={{
          opacity: 1,
          width: `${done}%`,
        }}
      ></div>
    </div>
  );
}
