import React from 'react';

const Badge = React.forwardRef(({ badgeContent = '', children }, ref) => {
  return (
    <div ref={ref} className="relative">
      <div className="absolute -top-2 left-4 w-fit h-5 px-2 rounded-full text-center leading-5 bg-primary-2 text-neutral-5 caption">
        {badgeContent}
      </div>
      {children}
    </div>
  );
});

export default Badge;
