export const CaretDownIcon = ({
  width = '16',
  height = '16',
  className,
  handleMouseOver,
  handleMouseOut,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.24652 11.14L2.45052 5.658C1.88452 5.013 2.34452 4 3.20352 4H12.7955C12.9878 3.99984 13.176 4.05509 13.3376 4.15914C13.4993 4.26319 13.6275 4.41164 13.707 4.58669C13.7864 4.76175 13.8137 4.956 13.7856 5.14618C13.7575 5.33636 13.6752 5.51441 13.5485 5.659L8.75252 11.139C8.65866 11.2464 8.54291 11.3325 8.41303 11.3915C8.28316 11.4505 8.14216 11.481 7.99952 11.481C7.85688 11.481 7.71589 11.4505 7.58601 11.3915C7.45614 11.3325 7.34038 11.2464 7.24652 11.139V11.14Z"
      fill="#3B3938"
    />
  </svg>
);

export const MenuVerticalIcon = ({ width = '24', height = '24', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <circle cx="16" cy="8" r="2" fill="#251C17" />
    <circle cx="16" cy="16" r="2" fill="#251C17" />
    <circle cx="16" cy="24" r="2" fill="#251C17" />
  </svg>
);

export const LogoIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 10.3175L5.54307 2.22222L10.0375 10.3175H0Z" fill="current-color" />
    <path d="M30.7116 0H9.13858L14.9813 10.6349H24.8689L30.7116 0Z" fill="current-color" />
    <path d="M29.8127 10.3175L34.3071 2.38095L40 10.3175H29.8127Z" fill="current-color" />
    <path d="M22.1723 40L27.5655 14.9206H40L22.1723 40Z" fill="current-color" />
    <path d="M0 14.9206L17.5281 40L12.2846 14.9206H0Z" fill="current-color" />
    <path d="M23.3708 14.9206H16.3296L19.9251 31.1111L23.3708 14.9206Z" fill="current-color" />
  </svg>
);

export const SearchIcon = ({ width = '24', height = '24', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="7" stroke="#251C17" strokeWidth="1.5" />
    <circle cx="11" cy="11" r="7" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" />
    <path d="M20 20L17 17" stroke="#251C17" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M20 20L17 17"
      stroke="black"
      strokeOpacity="0.2"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseCircleIcon = ({ width = '20', height = '20', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z"
    />
  </svg>
);

export const LoadingIcon = ({ width = '20', height = '20', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="2" r="0" fill="currentColor">
      <animate
        attributeName="r"
        begin="0"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
      <animate
        attributeName="r"
        begin="0.125s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
      <animate
        attributeName="r"
        begin="0.25s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
      <animate
        attributeName="r"
        begin="0.375s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
      <animate
        attributeName="r"
        begin="0.5s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
      <animate
        attributeName="r"
        begin="0.625s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
      <animate
        attributeName="r"
        begin="0.75s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
    <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
      <animate
        attributeName="r"
        begin="0.875s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
        repeatCount="indefinite"
        values="0;2;0;0"
      />
    </circle>
  </svg>
);

export const BasketIcon = ({ width = '32', height = '32' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.33334 5.33325H7.77179C8.52174 5.33325 8.89672 5.33325 9.16798 5.54505C9.43924 5.75684 9.53019 6.12062 9.71208 6.84818L10.0199 8.07954C10.2759 9.1034 10.4039 9.61533 10.7169 9.97649C10.8866 10.1723 11.0928 10.3333 11.324 10.4505C11.7503 10.6666 12.278 10.6666 13.3333 10.6666V10.6666"
      stroke="#33363F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 22.6667H10.0679C9.45671 22.6667 9.15112 22.6667 8.93982 22.561C8.64666 22.4142 8.44405 22.1331 8.39754 21.8086C8.36402 21.5747 8.46065 21.2848 8.65392 20.705V20.705C8.86804 20.0626 8.97511 19.7414 9.15649 19.4916C9.40793 19.1454 9.76379 18.8889 10.1718 18.7598C10.4661 18.6667 10.8047 18.6667 11.4818 18.6667H18.6667"
      stroke="#33363F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.1945 18.6667H14.0552C12.4368 18.6667 11.6277 18.6667 11.0682 18.1928C10.5087 17.7188 10.3757 16.9207 10.1096 15.3243L9.91554 14.1599C9.64529 12.5384 9.51016 11.7276 9.9595 11.1972C10.4089 10.6667 11.2308 10.6667 12.8747 10.6667H23.4306C24.881 10.6667 25.6062 10.6667 25.8993 11.141C26.1924 11.6153 25.8681 12.2639 25.2195 13.5612L23.7723 16.4556C23.2343 17.5314 22.9654 18.0694 22.4821 18.3681C21.9988 18.6667 21.3974 18.6667 20.1945 18.6667Z"
      stroke="#33363F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="22.6667" cy="26.6666" r="1.33333" fill="#33363F" />
    <circle cx="12" cy="26.6666" r="1.33333" fill="#33363F" />
  </svg>
);

export const UserIcon = ({ width = '28', height = '28', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="16"
      cy="9.33333"
      r="5.33333"
      stroke="#33363F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7.5292 22.9362C8.39099 20.1977 11.105 18.6667 13.9759 18.6667H18.0241C20.8949 18.6667 23.609 20.1977 24.4708 22.9362C24.8584 24.168 25.1852 25.5686 25.2944 27.0009C25.3364 27.5516 24.8856 28.0001 24.3333 28.0001H7.66665C7.11437 28.0001 6.6636 27.5516 6.70559 27.0009C6.81481 25.5686 7.14155 24.168 7.5292 22.9362Z"
      stroke="#33363F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const LoginIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
    />
  </svg>
);

export const UserPlusIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4a3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2a1.91 1.91 0 0 1-2-2a1.91 1.91 0 0 1 2-2a1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"
    />
  </svg>
);

export const FeedbackIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793c.15-.15.339-.3.535-.458c.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"
    />
    <path
      fill="currentColor"
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"
    />
  </svg>
);

export const LanguagesIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 36 36"
  >
    <path
      fill="currentColor"
      d="M30 3H14v5h2V5h14c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H17v7h-5.3L8 27.9V25H5c-.6 0-1-.4-1-1V13c0-.6.4-1 1-1h13v-2H5c-1.7 0-3 1.3-3 3v11c0 1.7 1.3 3 3 3h1v5.1l6.3-5.1H19v-7h11c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3z"
      className="clr-i-outline clr-i-outline-path-1"
    />
    <path
      fill="currentColor"
      d="M6.2 22.9h2.4l.6-1.6h3.1l.6 1.6h2.4L11.9 14H9.5l-3.3 8.9zm4.5-6.4l1 3.1h-2l1-3.1z"
      className="clr-i-outline clr-i-outline-path-2"
    />
    <path
      fill="currentColor"
      d="M20 17c1.1 0 2.6-.3 4-1c1.4.7 3 1 4 1v-2s-1 0-2.1-.4c1.2-1.2 2.1-3 2.1-5.6V8h-3V6h-2v2h-3v2h5.9c-.2 1.8-1 2.9-1.9 3.6c-.6-.5-1.2-1.2-1.6-2.1h-2.1c.4 1.3 1 2.3 1.8 3.1c-1 .4-1.9.4-2.1.4v2z"
      className="clr-i-outline clr-i-outline-path-3"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);

export const EnglishIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 48 48"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <rect width="36" height="36" x="6" y="6" rx="3" />
      <path d="M13 31V17h8m-8 7h7.5M13 31h7.5m5.5 0V19m0 12v-6.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5V31" />
    </g>
  </svg>
);

export const VietnameseIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 64 64"
  >
    <path
      fill="#ec1c24"
      d="M64 44c0 6.075-3.373 11-10 11H10C3.373 55 0 50.075 0 44V22c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11v22"
    />
    <path
      fill="#f9cb38"
      d="m45.43 28.963l-9.997.015l-3.103-10.114l-3.08 10.114l-10.01-.015l8.106 6.157l-3.14 10.05l8.13-6.241l8.147 6.241l-3.147-10.05z"
    />
  </svg>
);

export const NotificationIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v.777a5.152 5.152 0 0 0 4.5 5.199A5.006 5.006 0 0 0 21 25v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707ZM19 25a3 3 0 0 1-6 0v-1h6Zm8-3H5v-1.586l2.707-2.707A1 1 0 0 0 8 17v-4a8 8 0 0 1 16 0v4a1 1 0 0 0 .293.707L27 20.414Z"
    />
  </svg>
);

export const OrdersIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z"
    />
    <path
      fill="currentColor"
      d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"
    />
  </svg>
);

export const HistoryIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 48 48"
  >
    <g fill="none" stroke="currentColor" strokeWidth="4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M42 24V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h15"
      />
      <circle cx="32" cy="32" r="6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m37 36l5 4M14 16h20m-20 8h8" />
    </g>
  </svg>
);

export const FavoriteIcon = ({ width = '28', height = '28', header, className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.93424 18.5442L15.3153 27.3567C15.6398 27.6615 15.802 27.8139 16 27.8139C16.198 27.8139 16.3602 27.6615 16.6847 27.3567L26.0658 18.5442C28.674 16.094 28.9907 12.0621 26.7971 9.23467L26.3846 8.70304C23.7604 5.32069 18.4928 5.88794 16.6489 9.75145C16.3884 10.2972 15.6116 10.2972 15.3511 9.75145C13.5072 5.88794 8.23964 5.32069 5.6154 8.70304L5.20293 9.23467C3.00927 12.0621 3.32601 16.094 5.93424 18.5442Z"
      stroke={header ? 'currentColor' : ''}
      strokeWidth="2"
    />
  </svg>
);

export const CommentIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 1024 1024"
  >
    <path
      fill="currentColor"
      d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40zm-280 0c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z"
    />
    <path
      fill="currentColor"
      d="M894 345c-48.1-66-115.3-110.1-189-130v.1c-17.1-19-36.4-36.5-58-52.1c-163.7-119-393.5-82.7-513 81c-96.3 133-92.2 311.9 6 439l.8 132.6c0 3.2.5 6.4 1.5 9.4c5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-.5.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6c17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408zM323 735l-12-5l-99 31l-1-104l-8-9c-84.6-103.2-90.2-251.9-11-361c96.4-132.2 281.2-161.4 413-66c132.2 96.1 161.5 280.6 66 412c-80.1 109.9-223.5 150.5-348 102zm505-17l-8 10l1 104l-98-33l-12 5c-56 20.8-115.7 22.5-171 7l-.2-.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l.6.4c23 16.5 44.1 37.1 62 62c72.6 99.6 68.5 235.2-8 330z"
    />
    <path
      fill="currentColor"
      d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40z"
    />
  </svg>
);

export const LogoutIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2V5Zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2h6.586Z"
    />
  </svg>
);

export const ArrowForwardIcon = ({ width = '16', height = '16' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.07666 13.4867L5.25666 14.6667L11.9233 8.00004L5.25666 1.33337L4.07666 2.51337L9.56333 8.00004L4.07666 13.4867Z"
      fill="black"
    />
  </svg>
);

export const NavigateNextIcon = ({ width = '24', height = '24', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
      fill="#626262"
    />
  </svg>
);

export const KeyboardArrowIcon = ({ width = '11', height = '16', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 11 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.933594 13.9459L6.77291 8.14601L0.933594 2.34609L2.7357 0.556152L10.3771 8.14601L2.7357 15.7359L0.933594 13.9459Z"
      fill="#251C17"
    />
    <path
      d="M0.933594 13.9459L6.77291 8.14601L0.933594 2.34609L2.7357 0.556152L10.3771 8.14601L2.7357 15.7359L0.933594 13.9459Z"
      fill="black"
      fillOpacity="0.2"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const FacebookIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.6895 22.2136L29.726 15.3883H23.242V10.9612C23.242 9.09345 24.1461 7.27184 27.0502 7.27184H30V1.46117C30 1.46117 27.3242 1 24.7671 1C19.4247 1 15.9361 4.26966 15.9361 10.1864V15.3883H10V22.2136H15.9361V38.7141C17.1279 38.9032 18.347 39 19.589 39C20.8311 39 22.0502 38.9032 23.242 38.7141V22.2136H28.6895Z"
      fill="#301C13"
    />
  </svg>
);

export const FacebookColorIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={width} height="40" rx="20" fill="#1877F2" />
    <path
      d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.668 23.8984 13.125 26.3828 13.125H28.9062V8.20312C28.9062 8.20312 26.6172 7.8125 24.4297 7.8125C19.8594 7.8125 16.875 10.582 16.875 15.5938V20H11.7969V25.7812H16.875V39.7578C17.8945 39.918 18.9375 40 20 40C21.0625 40 22.1055 39.918 23.125 39.7578V25.7812H27.7852Z"
      fill="white"
    />
  </svg>
);

export const GoogleColorIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.2 20.4546C39.2 19.0364 39.0727 17.6727 38.8364 16.3636H20V24.1H30.7636C30.3 26.6 28.8909 28.7182 26.7727 30.1364V35.1546H33.2364C37.0182 31.6727 39.2 26.5455 39.2 20.4546Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9999 39.9999C25.3999 39.9999 29.9272 38.209 33.2363 35.1545L26.7727 30.1363C24.9817 31.3363 22.6908 32.0454 19.9999 32.0454C14.7908 32.0454 10.3817 28.5272 8.80901 23.7999H2.1272V28.9817C5.41811 35.5181 12.1817 39.9999 19.9999 39.9999Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.80909 23.8C8.40909 22.6 8.18182 21.3182 8.18182 20C8.18182 18.6818 8.40909 17.4 8.80909 16.2V11.0182H2.12727C0.772727 13.7182 0 16.7727 0 20C0 23.2273 0.772727 26.2818 2.12727 28.9818L8.80909 23.8Z"
      fill="#FBBC05"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9999 7.95455C22.9363 7.95455 25.5727 8.96364 27.6454 10.9455L33.3817 5.20909C29.9181 1.98182 25.3908 0 19.9999 0C12.1817 0 5.41811 4.48182 2.1272 11.0182L8.80901 16.2C10.3817 11.4727 14.7908 7.95455 19.9999 7.95455Z"
      fill="#EA4335"
    />
  </svg>
);

export const TwitterIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.095 11.9679C35.1105 12.3199 35.1105 12.6559 35.1105 13.0079C35.1259 23.68 27.2851 36 12.9464 36C8.7173 36 4.56539 34.736 1 32.368C1.61738 32.448 2.23477 32.48 2.85215 32.48C6.35581 32.48 9.76686 31.264 12.5297 29.008C9.19578 28.944 6.2632 26.688 5.24452 23.392C6.41755 23.632 7.62145 23.584 8.76361 23.248C5.13647 22.512 2.52803 19.1999 2.51259 15.3439C2.51259 15.3119 2.51259 15.2799 2.51259 15.2479C3.59301 15.8719 4.81235 16.2239 6.04712 16.2559C2.63607 13.8879 1.57108 9.16791 3.63932 5.4719C7.60601 10.5279 13.4403 13.5839 19.7067 13.9199C19.0739 11.1199 19.9383 8.17591 21.9602 6.1919C25.0934 3.13589 30.0325 3.2959 32.9959 6.54391C34.7401 6.1919 36.4224 5.5199 37.9504 4.5759C37.3639 6.44791 36.1446 8.03191 34.524 9.03991C36.0674 8.84791 37.58 8.41591 39 7.77591C37.9504 9.40792 36.6231 10.8159 35.095 11.9679Z"
      fill="#301C13"
    />
  </svg>
);

export const InstagramIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_294_694)">
      <path
        d="M20 3.6046C25.3434 3.6046 25.9706 3.62842 28.0826 3.7237C30.0358 3.81104 31.0917 4.13656 31.7984 4.41445C32.7352 4.77967 33.4022 5.20842 34.1009 5.90711C34.7995 6.6058 35.2362 7.27273 35.5935 8.20961C35.8635 8.91624 36.1969 9.97221 36.2843 11.9254C36.3795 14.0373 36.4034 14.6645 36.4034 20.0079C36.4034 25.3513 36.3795 25.9786 36.2843 28.0905C36.1969 30.0437 35.8714 31.0996 35.5935 31.8063C35.2283 32.7432 34.7995 33.4101 34.1009 34.1088C33.4022 34.8075 32.7352 35.2441 31.7984 35.6014C31.0917 35.8714 30.0358 36.2048 28.0826 36.2922C25.9706 36.3875 25.3434 36.4113 20 36.4113C14.6566 36.4113 14.0294 36.3875 11.9174 36.2922C9.96428 36.2048 8.9083 35.8793 8.20167 35.6014C7.26479 35.2362 6.59786 34.8075 5.89917 34.1088C5.20048 33.4101 4.7638 32.7432 4.40651 31.8063C4.13657 31.0996 3.8031 30.0437 3.71576 28.0905C3.62049 25.9786 3.59667 25.3513 3.59667 20.0079C3.59667 14.6645 3.62049 14.0373 3.71576 11.9254C3.8031 9.97221 4.12863 8.91624 4.40651 8.20961C4.77174 7.27273 5.20048 6.6058 5.89917 5.90711C6.59786 5.20842 7.26479 4.77173 8.20167 4.41445C8.9083 4.1445 9.96428 3.81104 11.9174 3.7237C14.0294 3.62048 14.6646 3.6046 20 3.6046ZM20 0C14.5693 0 13.8865 0.023819 11.7507 0.119095C9.62287 0.214371 8.16992 0.555776 6.89957 1.04803C5.58158 1.55617 4.47003 2.24692 3.35848 3.35848C2.24692 4.47003 1.56411 5.58952 1.04804 6.89956C0.555776 8.16991 0.214371 9.62287 0.119095 11.7586C0.023819 13.8865 0 14.5693 0 20C0 25.4307 0.023819 26.1135 0.119095 28.2493C0.214371 30.3771 0.555776 31.8301 1.04804 33.1084C1.55617 34.4264 2.24692 35.5379 3.35848 36.6495C4.47003 37.761 5.58952 38.4438 6.89957 38.9599C8.16992 39.4522 9.62287 39.7936 11.7586 39.8888C13.8944 39.9841 14.5693 40.0079 20.008 40.0079C25.4466 40.0079 26.1215 39.9841 28.2573 39.8888C30.3851 39.7936 31.8381 39.4522 33.1163 38.9599C34.4343 38.4518 35.5459 37.761 36.6574 36.6495C37.769 35.5379 38.4518 34.4184 38.9679 33.1084C39.4601 31.838 39.8015 30.3851 39.8968 28.2493C39.9921 26.1135 40.0159 25.4387 40.0159 20C40.0159 14.5613 39.9921 13.8865 39.8968 11.7507C39.8015 9.62287 39.4601 8.16991 38.9679 6.89162C38.4597 5.57364 37.769 4.46209 36.6574 3.35054C35.5459 2.23898 34.4264 1.55617 33.1163 1.0401C31.846 0.547836 30.393 0.206431 28.2573 0.111155C26.1136 0.023819 25.4307 0 20 0Z"
        fill="#301C13"
      />
      <path
        d="M20 3.6046C25.3434 3.6046 25.9706 3.62842 28.0826 3.7237C30.0358 3.81104 31.0917 4.13656 31.7984 4.41445C32.7352 4.77967 33.4022 5.20842 34.1009 5.90711C34.7995 6.6058 35.2362 7.27273 35.5935 8.20961C35.8635 8.91624 36.1969 9.97221 36.2843 11.9254C36.3795 14.0373 36.4034 14.6645 36.4034 20.0079C36.4034 25.3513 36.3795 25.9786 36.2843 28.0905C36.1969 30.0437 35.8714 31.0996 35.5935 31.8063C35.2283 32.7432 34.7995 33.4101 34.1009 34.1088C33.4022 34.8075 32.7352 35.2441 31.7984 35.6014C31.0917 35.8714 30.0358 36.2048 28.0826 36.2922C25.9706 36.3875 25.3434 36.4113 20 36.4113C14.6566 36.4113 14.0294 36.3875 11.9174 36.2922C9.96428 36.2048 8.9083 35.8793 8.20167 35.6014C7.26479 35.2362 6.59786 34.8075 5.89917 34.1088C5.20048 33.4101 4.7638 32.7432 4.40651 31.8063C4.13657 31.0996 3.8031 30.0437 3.71576 28.0905C3.62049 25.9786 3.59667 25.3513 3.59667 20.0079C3.59667 14.6645 3.62049 14.0373 3.71576 11.9254C3.8031 9.97221 4.12863 8.91624 4.40651 8.20961C4.77174 7.27273 5.20048 6.6058 5.89917 5.90711C6.59786 5.20842 7.26479 4.77173 8.20167 4.41445C8.9083 4.1445 9.96428 3.81104 11.9174 3.7237C14.0294 3.62048 14.6646 3.6046 20 3.6046Z"
        fill="#301C13"
      />
      <path
        d="M20 9.73401C14.3311 9.73401 9.72607 14.3311 9.72607 20.0079C9.72607 25.6848 14.3231 30.2818 20 30.2818C25.6768 30.2818 30.2739 25.6848 30.2739 20.0079C30.2739 14.3311 25.6768 9.73401 20 9.73401ZM20 26.6693C16.316 26.6693 13.3307 23.684 13.3307 20C13.3307 16.316 16.316 13.3307 20 13.3307C23.684 13.3307 26.6693 16.316 26.6693 20C26.6693 23.684 23.684 26.6693 20 26.6693Z"
        fill="white"
      />
      <path
        d="M30.6788 11.7189C32.0031 11.7189 33.0766 10.6454 33.0766 9.32112C33.0766 7.99686 32.0031 6.92334 30.6788 6.92334C29.3546 6.92334 28.2811 7.99686 28.2811 9.32112C28.2811 10.6454 29.3546 11.7189 30.6788 11.7189Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_294_694">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TikTokIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
      fill="#301C13"
    />
    <path
      d="M26.3811 6H21.4485V25.0724C21.4485 27.3449 19.5515 29.2116 17.1906 29.2116C14.8297 29.2116 12.9325 27.3449 12.9325 25.0724C12.9325 22.8406 14.7875 21.0145 17.0641 20.9333V16.1449C12.0472 16.2261 8 20.1623 8 25.0724C8 30.0232 12.1315 34 17.2327 34C22.3339 34 26.4654 29.9826 26.4654 25.0724V15.2927C28.3204 16.5913 30.5969 17.3623 33 17.4029V12.6145C29.2901 12.4928 26.3811 9.57101 26.3811 6Z"
      fill="white"
    />
  </svg>
);

export const PinterestIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 42 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.7202 0C9.26016 0 0 8.95104 0 19.9918C0 28.4656 5.45718 35.7055 13.1655 38.6178C12.9779 37.0382 12.8244 34.603 13.2337 32.8754C13.6088 31.3122 15.6553 22.9371 15.6553 22.9371C15.6553 22.9371 15.0414 21.7359 15.0414 19.9753C15.0414 17.1946 16.7126 15.1214 18.7932 15.1214C20.5667 15.1214 21.4194 16.4048 21.4194 17.935C21.4194 19.6462 20.2939 22.2131 19.697 24.5989C19.2025 26.5899 20.7373 28.2188 22.7667 28.2188C26.4503 28.2188 29.2812 24.4673 29.2812 19.0704C29.2812 14.2822 25.717 10.942 20.6179 10.942C14.7173 10.942 11.2554 15.2036 11.2554 19.6133C11.2554 21.3246 11.9376 23.1674 12.7903 24.1711C12.9608 24.3686 12.9779 24.5496 12.9267 24.747C12.7732 25.3723 12.4151 26.738 12.3469 27.0177C12.2616 27.3797 12.0399 27.462 11.6477 27.281C9.0896 26.0962 7.48656 22.4434 7.48656 19.5146C7.48656 13.2127 12.2275 7.4208 21.1807 7.4208C28.3603 7.4208 33.9539 12.357 33.9539 18.9716C33.9539 25.8659 29.4517 31.411 23.2101 31.411C21.1124 31.411 19.1342 30.3579 18.4692 29.1074C18.4692 29.1074 17.4289 32.9247 17.1731 33.8626C16.7126 35.6068 15.4506 37.7787 14.5979 39.1115C16.5421 39.6874 18.5885 40 20.7373 40C32.1803 40 41.4575 31.049 41.4575 20.0082C41.4405 8.95104 32.1632 0 20.7202 0Z"
      fill="#301C13"
    />
  </svg>
);

export const MiniStarIcon = ({ width = '8', height = '8', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 0L5.08036 2.91964L8 4L5.08036 5.08036L4 8L2.91964 5.08036L0 4L2.91964 2.91964L4 0Z"
      fill="#6E5544"
    />
  </svg>
);

export const CloseIcon = ({ width = '32', height = '32', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 10.1834L21.8166 22M10 21.8166L21.8166 10" stroke="black" strokeWidth="1.5" />
  </svg>
);

export const BellRingIcon = ({ width = '24', height = '24', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 16 16"
    // viewBox={`0 0 ${width} ${height}`}
  >
    <path
      fill="current-color"
      d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7c0-2.42-1.72-4.44-4.005-4.901z"
    />
  </svg>
);

export const HomeIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 36 36"
  >
    <path
      fill="current-color"
      d="M33 19a1 1 0 0 1-.71-.29L18 4.41L3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z"
      className="clr-i-solid clr-i-solid-path-1"
    />
    <path
      fill="current-color"
      d="M18 7.79L6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"
      className="clr-i-solid clr-i-solid-path-2"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);

export const ProductIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="current-color"
      d="M21.993 7.95a.96.96 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074c-.021-.057-.04-.113-.07-.165c-.016-.027-.038-.049-.057-.075c-.032-.045-.063-.091-.102-.13c-.023-.022-.053-.04-.078-.061c-.039-.032-.075-.067-.12-.094c-.004-.003-.009-.003-.014-.006l-.008-.006l-8.979-4.99a1.002 1.002 0 0 0-.97-.001l-9.021 4.99c-.003.003-.006.007-.011.01l-.01.004c-.035.02-.061.049-.094.073c-.036.027-.074.051-.106.082c-.03.031-.053.067-.079.102c-.027.035-.057.066-.079.104c-.026.043-.04.092-.059.139c-.014.033-.032.064-.041.1a.975.975 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987l.001.001l.002.001l.02.011c.043.024.09.037.135.054c.032.013.063.03.097.039a1.013 1.013 0 0 0 .506 0c.033-.009.064-.026.097-.039c.045-.017.092-.029.135-.054l.02-.011l.002-.001l.001-.001l8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048zm-10.021 3.922L5.058 8.005L7.82 6.477l6.834 3.905l-2.682 1.49zm.048-7.719L18.941 8l-2.244 1.247l-6.83-3.903l2.153-1.191zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705l-7 3.89z"
    />
  </svg>
);

export const CategoryIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="current-color"
      d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4z"
    />
  </svg>
);

export const CustomerIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 1408 1664"
  >
    <path
      fill="current-color"
      d="m576 1536l96-448l-96-128l-128-64zm256 0l128-640l-128 64l-96 128zM992 526q-2-4-4-6q-10-8-96-8q-70 0-167 19q-7 2-21 2t-21-2q-97-19-167-19q-86 0-96 8q-2 2-4 6q2 18 4 27q2 3 7.5 6.5T435 570q2 4 7.5 20.5t7 20.5t7.5 17t8.5 17t9 14t12 13.5t14 9.5t17.5 8t20.5 4t24.5 2q36 0 59-12.5t32.5-30T669 619t11.5-29.5T698 577h12q11 0 17.5 12.5T739 619t14.5 34.5t32.5 30t59 12.5q13 0 24.5-2t20.5-4t17.5-8t14-9.5t12-13.5t9-14t8.5-17t7.5-17t7-20.5T973 570q2-7 7.5-10.5t7.5-6.5q2-9 4-27zm416 879q0 121-73 190t-194 69H267q-121 0-194-69T0 1405q0-61 4.5-118t19-125.5T61 1038t63.5-103.5T218 860l-90-220h214q-22-64-22-128q0-12 2-32q-194-40-194-96q0-57 210-99q17-62 51.5-134T460 37q32-37 76-37q30 0 84 31t84 31t84-31t84-31q44 0 76 37q36 42 70.5 114t51.5 134q210 42 210 99q0 56-194 96q7 81-20 160h214l-82 225q63 33 107.5 96.5T1371 1105t29 151.5t8 148.5z"
    />
  </svg>
);

export const OrderIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 640 512"
  >
    <path
      fill="current-color"
      d="M0 48C0 21.49 21.49 0 48 0h320c26.5 0 48 21.49 48 48v48h50.7c17 0 32.4 6.7 45.3 18.7l77.3 77.3c12 12 18.7 28.3 18.7 45.3V352c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32c0 53-43 96-96 96c-53.9 0-96-43-96-96H256c0 53-43 96-96 96c-53.9 0-96-43-96-96H48c-26.51 0-48-21.5-48-48V48zm544 208v-18.7L466.7 160H416v96h128zM160 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm320-96c-26.5 0-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48s-21.5-48-48-48zM256.1 95.03c-8.5-9.37-23.7-9.37-33.1 0c-9.3 9.37-9.3 24.57 0 33.07l39.1 39.9H96c-13.25 0-24 10.7-24 24s10.75 24 24 24h166.1L223 255c-9.3 9.4-9.3 24.6 0 33.1c9.4 10.2 24.6 10.2 33.1 0l80-80c10.2-8.5 10.2-23.7 0-33.1l-80-79.97z"
    />
  </svg>
);

export const MinusIcon = ({ width = '20', height = '4', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 20 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 2L2 2" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" />
    <path
      d="M18 2L2 2"
      stroke="currentColor"
      strokeOpacity="0"
      strokeWidth="2.66667"
      strokeLinecap="round"
    />
  </svg>
);

export const PlusIcon = ({ width = '32', height = '32', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 8L16 24" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" />
    <path
      d="M16 8L16 24"
      stroke="black"
      strokeOpacity="0"
      strokeWidth="2.66667"
      strokeLinecap="round"
    />
    <path d="M24 16L8 16" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" />
    <path
      d="M24 16L8 16"
      stroke="black"
      strokeOpacity="0"
      strokeWidth="2.66667"
      strokeLinecap="round"
    />
  </svg>
);

export const StarIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2534 15.3563L11.1865 14.6093L11.2534 15.3563ZM16.8462 11.1981L16.1501 10.9189V10.9189L16.8462 11.1981ZM8.94935 21.174L8.44463 21.7288L8.94935 21.174ZM10.8952 15.3884L10.9621 16.1354L10.8952 15.3884ZM11.6492 27.8833L10.917 27.7208L11.6492 27.8833ZM11.9979 24.7118L11.2697 24.8913L11.9979 24.7118ZM9.75315 21.9053L10.2579 21.3505H10.2579L9.75315 21.9053ZM11.866 24.296L12.5646 24.0229L11.866 24.296ZM16.2773 31.3074L16.7511 31.8888L16.2773 31.3074ZM11.9279 33.952L11.7305 34.6755L11.9279 33.952ZM11.538 28.3841L12.2702 28.5466L11.538 28.3841ZM11.1267 33.4578L10.5687 33.9589L11.1267 33.4578ZM23.7246 31.3074L23.2509 31.8888L23.7246 31.3074ZM20.5265 29.2814L20.4083 30.022L20.5265 29.2814ZM19.4754 29.2814L19.5936 30.022L19.4754 29.2814ZM28.4639 28.3841L27.7317 28.5466V28.5466L28.4639 28.3841ZM28.8753 33.4578L29.4333 33.9589L28.8753 33.4578ZM28.074 33.952L28.2715 34.6755L28.074 33.952ZM30.2488 21.9053L30.7535 22.4601L30.2488 21.9053ZM28.1359 24.296L28.8344 24.569L28.1359 24.296ZM28.3528 27.8833L29.085 27.7208V27.7208L28.3528 27.8833ZM28.004 24.7118L28.7322 24.8913L28.004 24.7118ZM29.1067 15.3884L29.0398 16.1354L29.1067 15.3884ZM31.0526 21.174L30.5479 20.6193L31.0526 21.174ZM23.1557 11.1981L22.4597 11.4773L23.1557 11.1981ZM28.7485 15.3563L28.8154 14.6093L28.7485 15.3563ZM23.0947 11.0459L23.7908 10.7667V10.7667L23.0947 11.0459ZM16.9072 11.0459L17.6033 11.3251V11.3251L16.9072 11.0459ZM20.001 6.14343V6.89343V6.14343ZM22.3986 11.3251L22.4597 11.4773L23.8518 10.9189L23.7908 10.7667L22.3986 11.3251ZM28.6816 16.1033L29.0398 16.1354L29.1736 14.6414L28.8154 14.6093L28.6816 16.1033ZM30.5479 20.6193L29.7441 21.3505L30.7535 22.4601L31.5573 21.7288L30.5479 20.6193ZM27.6206 28.0457L27.7317 28.5466L29.1961 28.2217L29.085 27.7208L27.6206 28.0457ZM12.2702 28.5466L12.3814 28.0457L10.917 27.7208L10.8059 28.2217L12.2702 28.5466ZM10.2579 21.3505L9.45406 20.6193L8.44463 21.7288L9.24843 22.4601L10.2579 21.3505ZM10.9621 16.1354L11.3203 16.1033L11.1865 14.6093L10.8283 14.6414L10.9621 16.1354ZM17.5423 11.4773L17.6033 11.3251L16.2112 10.7667L16.1501 10.9189L17.5423 11.4773ZM11.3203 16.1033C12.2959 16.0159 13.0837 15.9463 13.72 15.8227C14.3732 15.6959 14.9287 15.502 15.428 15.1308L14.533 13.9271C14.2775 14.117 13.9603 14.2481 13.434 14.3502C12.8908 14.4557 12.1925 14.5192 11.1865 14.6093L11.3203 16.1033ZM16.1501 10.9189C15.7741 11.8563 15.5122 12.5068 15.2547 12.9966C15.0053 13.4711 14.7885 13.7371 14.533 13.9271L15.428 15.1308C15.9272 14.7596 16.2729 14.2835 16.5825 13.6945C16.8841 13.1208 17.1777 12.3864 17.5423 11.4773L16.1501 10.9189ZM9.45406 20.6193C8.23112 19.5066 7.37778 18.7277 6.86161 18.1025C6.33204 17.4611 6.3543 17.2145 6.39457 17.0947L4.97283 16.6166C4.66614 17.5285 5.11702 18.3455 5.70491 19.0575C6.3062 19.7858 7.25917 20.6503 8.44463 21.7288L9.45406 20.6193ZM10.8283 14.6414C9.23203 14.7843 7.95036 14.8972 7.03117 15.1141C6.13247 15.3262 5.27952 15.7047 4.97283 16.6166L6.39457 17.0947C6.43484 16.975 6.56613 16.7651 7.37569 16.574C8.16475 16.3878 9.31535 16.2829 10.9621 16.1354L10.8283 14.6414ZM12.3814 28.0457C12.5571 27.2536 12.6998 26.6135 12.771 26.0769C12.8439 25.5266 12.8498 25.0342 12.7261 24.5324L11.2697 24.8913C11.3328 25.1472 11.3428 25.436 11.284 25.8797C11.2233 26.3371 11.0982 26.9038 10.917 27.7208L12.3814 28.0457ZM9.24843 22.4601C9.86744 23.0232 10.2963 23.4143 10.6095 23.7531C10.9133 24.0818 11.0716 24.3235 11.1675 24.569L12.5646 24.0229C12.3764 23.5415 12.0878 23.1425 11.711 22.7349C11.3436 22.3374 10.858 21.8966 10.2579 21.3505L9.24843 22.4601ZM12.7261 24.5324C12.6835 24.3592 12.6295 24.189 12.5646 24.0229L11.1675 24.569C11.2086 24.6741 11.2427 24.7818 11.2697 24.8913L12.7261 24.5324ZM15.8035 30.726C14.615 31.6945 13.7714 32.3806 13.1225 32.8036C12.4309 33.2546 12.1894 33.2459 12.1253 33.2284L11.7305 34.6755C12.4934 34.8837 13.2525 34.5095 13.9418 34.0601C14.6738 33.5829 15.5913 32.8339 16.7511 31.8888L15.8035 30.726ZM10.8059 28.2217C10.4818 29.6822 10.2242 30.8383 10.1262 31.7066C10.034 32.5243 10.0402 33.3705 10.5687 33.9589L11.6847 32.9566C11.6403 32.9072 11.5242 32.6953 11.6168 31.8749C11.7036 31.1052 11.9382 30.0433 12.2702 28.5466L10.8059 28.2217ZM12.1253 33.2284C11.9554 33.1821 11.8024 33.0877 11.6847 32.9566L10.5687 33.9589C10.879 34.3045 11.2824 34.5533 11.7305 34.6755L12.1253 33.2284ZM24.1984 30.726C23.4385 30.1068 22.8286 29.6088 22.2962 29.2528C21.7527 28.8893 21.2353 28.635 20.6448 28.5408L20.4083 30.022C20.703 30.0691 21.0137 30.1996 21.4624 30.4997C21.9222 30.8072 22.4689 31.2516 23.2509 31.8888L24.1984 30.726ZM16.7511 31.8888C17.5331 31.2516 18.0797 30.8072 18.5396 30.4997C18.9883 30.1996 19.2989 30.0691 19.5936 30.022L19.3571 28.5408C18.7667 28.635 18.2493 28.8893 17.7057 29.2528C17.1733 29.6088 16.5635 30.1068 15.8035 30.726L16.7511 31.8888ZM20.6448 28.5408C20.2183 28.4727 19.7837 28.4727 19.3571 28.5408L19.5936 30.022C19.8635 29.9789 20.1385 29.9789 20.4083 30.022L20.6448 28.5408ZM27.7317 28.5466C28.0638 30.0433 28.2983 31.1052 28.3852 31.8749C28.4778 32.6953 28.3616 32.9072 28.3173 32.9566L29.4333 33.9589C29.9617 33.3705 29.968 32.5243 29.8757 31.7066C29.7777 30.8383 29.5201 29.6822 29.1961 28.2217L27.7317 28.5466ZM23.2509 31.8888C24.4106 32.8339 25.3282 33.5829 26.0602 34.0601C26.7494 34.5095 27.5085 34.8837 28.2715 34.6755L27.8766 33.2284C27.8126 33.2459 27.5711 33.2546 26.8794 32.8036C26.2306 32.3806 25.3869 31.6945 24.1984 30.726L23.2509 31.8888ZM28.3173 32.9566C28.1996 33.0877 28.0466 33.1821 27.8766 33.2284L28.2715 34.6755C28.7196 34.5533 29.1229 34.3045 29.4333 33.9589L28.3173 32.9566ZM29.7441 21.3505C29.1439 21.8966 28.6584 22.3374 28.291 22.7349C27.9142 23.1425 27.6255 23.5415 27.4374 24.0229L28.8344 24.569C28.9304 24.3235 29.0886 24.0818 29.3925 23.7531C29.7056 23.4143 30.1345 23.0232 30.7535 22.4601L29.7441 21.3505ZM29.085 27.7208C28.9037 26.9038 28.7786 26.3371 28.718 25.8797C28.6591 25.436 28.6691 25.1472 28.7322 24.8913L27.2758 24.5324C27.1521 25.0342 27.158 25.5266 27.231 26.0769C27.3021 26.6135 27.4448 27.2536 27.6206 28.0457L29.085 27.7208ZM27.4374 24.0229C27.3724 24.189 27.3185 24.3592 27.2758 24.5324L28.7322 24.8913C28.7592 24.7818 28.7934 24.6741 28.8344 24.569L27.4374 24.0229ZM29.0398 16.1354C30.6866 16.2829 31.8372 16.3878 32.6263 16.574C33.4358 16.7651 33.5671 16.975 33.6074 17.0947L35.0291 16.6166C34.7224 15.7047 33.8695 15.3262 32.9708 15.1141C32.0516 14.8972 30.7699 14.7843 29.1736 14.6414L29.0398 16.1354ZM31.5573 21.7288C32.7428 20.6503 33.6957 19.7858 34.297 19.0575C34.8849 18.3455 35.3358 17.5285 35.0291 16.6166L33.6074 17.0947C33.6476 17.2145 33.6699 17.4611 33.1403 18.1025C32.6242 18.7277 31.7708 19.5066 30.5479 20.6193L31.5573 21.7288ZM22.4597 11.4773C22.8243 12.3864 23.1179 13.1208 23.4194 13.6945C23.729 14.2835 24.0747 14.7596 24.574 15.1308L25.469 13.9271C25.2135 13.7371 24.9966 13.4711 24.7472 12.9966C24.4897 12.5068 24.2278 11.8563 23.8518 10.9189L22.4597 11.4773ZM28.8154 14.6093C27.8094 14.5192 27.1111 14.4557 26.5679 14.3502C26.0417 14.2481 25.7244 14.117 25.469 13.9271L24.574 15.1308C25.0732 15.502 25.6288 15.6959 26.282 15.8227C26.9182 15.9463 27.7061 16.0159 28.6816 16.1033L28.8154 14.6093ZM23.7908 10.7667C23.1446 9.15577 22.6307 7.86974 22.1295 6.9959C21.6455 6.15213 21.0073 5.39343 20.001 5.39343V6.89343C20.1218 6.89343 20.375 6.95182 20.8283 7.74221C21.2644 8.50254 21.7338 9.66776 22.3986 11.3251L23.7908 10.7667ZM17.6033 11.3251C18.2682 9.66775 18.7375 8.50254 19.1736 7.74221C19.627 6.95182 19.8801 6.89343 20.001 6.89343V5.39343C18.9946 5.39343 18.3564 6.15212 17.8725 6.9959C17.3712 7.86974 16.8573 9.15577 16.2112 10.7667L17.6033 11.3251Z"
      fill="#6E5544"
    />
  </svg>
);

export const ChatPlusIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.0815 31.0809L30.5512 30.5506L31.0815 31.0809ZM31.4247 15.2578L30.6949 15.4308L31.4247 15.2578ZM24.7429 8.57597L24.5699 9.30575L24.7429 8.57597ZM30.9173 20V27.6667H32.4173V20H30.9173ZM27.6673 30.9167H20.0007V32.4167H27.6673V30.9167ZM20.0007 30.9167C17.4788 30.9167 16.3482 30.9116 15.4314 30.6943L15.0855 32.1539C16.2159 32.4218 17.5643 32.4167 20.0007 32.4167V30.9167ZM7.58398 20C7.58398 22.4363 7.57889 23.7848 7.8468 24.9152L9.30636 24.5693C9.08908 23.6525 9.08398 22.5219 9.08398 20H7.58398ZM15.4314 30.6943C12.3959 29.9749 10.0258 27.6048 9.30636 24.5693L7.8468 24.9152C8.69703 28.5026 11.4981 31.3037 15.0855 32.1539L15.4314 30.6943ZM30.9173 27.6667C30.9173 28.6307 30.9157 29.2783 30.8508 29.7613C30.7887 30.2228 30.6815 30.4203 30.5512 30.5506L31.6119 31.6113C32.0673 31.1558 32.253 30.589 32.3374 29.9612C32.4189 29.355 32.4173 28.5883 32.4173 27.6667H30.9173ZM27.6673 32.4167C28.5889 32.4167 29.3556 32.4183 29.9618 32.3368C30.5896 32.2524 31.1564 32.0667 31.6119 31.6113L30.5512 30.5506C30.4209 30.6809 30.2234 30.7881 29.7619 30.8502C29.2789 30.9151 28.6313 30.9167 27.6673 30.9167V32.4167ZM32.4173 20C32.4173 17.5637 32.4224 16.2153 32.1545 15.0849L30.6949 15.4308C30.9122 16.3476 30.9173 17.4782 30.9173 20H32.4173ZM20.0007 9.08337C22.5225 9.08337 23.6531 9.08847 24.5699 9.30575L24.9158 7.84619C23.7854 7.57828 22.437 7.58337 20.0007 7.58337V9.08337ZM32.1545 15.0849C31.3043 11.4974 28.5032 8.69642 24.9158 7.84619L24.5699 9.30575C27.6054 10.0252 29.9755 12.3953 30.6949 15.4308L32.1545 15.0849Z"
      fill="#6E5544"
    />
    <path
      d="M15 18.3333L25 18.3333"
      stroke="#6E5544"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.33398 13.3334L8.33398 3.33337"
      stroke="#6E5544"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.33398 8.33337L13.334 8.33337"
      stroke="#6E5544"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M20 25H25" stroke="#6E5544" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const DoneRingIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4507 16.0667C15.1193 15.8182 14.6492 15.8853 14.4007 16.2167C14.1521 16.5481 14.2193 17.0182 14.5507 17.2667L15.4507 16.0667ZM33.8984 8.82725C34.1712 8.51552 34.1396 8.0417 33.8279 7.76894C33.5161 7.49618 33.0423 7.52777 32.7696 7.8395L33.8984 8.82725ZM14.5507 17.2667L20.4754 21.7103L21.3754 20.5103L15.4507 16.0667L14.5507 17.2667ZM22.8424 21.4627L33.8984 8.82725L32.7696 7.8395L21.7136 20.4749L22.8424 21.4627ZM20.4754 21.7103C21.2078 22.2595 22.2396 22.1516 22.8424 21.4627L21.7136 20.4749C21.6275 20.5733 21.48 20.5887 21.3754 20.5103L20.4754 21.7103Z"
      fill="#6E5544"
    />
    <path
      d="M35 20C35 23.1342 34.0183 26.1896 32.1927 28.7372C30.3671 31.2848 27.7894 33.1965 24.8216 34.204C21.8538 35.2114 18.6449 35.2639 15.6457 34.3541C12.6465 33.4443 10.0077 31.6179 8.0997 29.1314C6.19175 26.6449 5.11058 23.6233 5.00803 20.4908C4.90548 17.3583 5.78671 14.2724 7.52796 11.6664C9.2692 9.0605 11.783 7.06542 14.7162 5.96141C17.6495 4.85741 20.8549 4.69993 23.8823 5.51111"
      stroke="#6E5544"
      strokeWidth="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const LampIcon = ({ width = '40', height = '40', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20.0007" cy="15" r="11.1667" stroke="#6E5544" />
    <path
      d="M18.3327 23.3334V16.25C18.3327 15.0994 17.3999 14.1667 16.2493 14.1667V14.1667C15.0988 14.1667 14.166 15.0994 14.166 16.25V16.25C14.166 17.4006 15.0988 18.3334 16.2493 18.3334H23.7493C24.8999 18.3334 25.8327 17.4006 25.8327 16.25V16.25C25.8327 15.0994 24.8999 14.1667 23.7493 14.1667V14.1667C22.5988 14.1667 21.666 15.0994 21.666 16.25V23.3334"
      stroke="#6E5544"
      strokeWidth="1.5"
      stroke-linecap="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 27.6062C25 27.4226 24.8084 27.3012 24.6399 27.3743C23.2179 27.9913 21.6489 28.3334 20 28.3334C18.3511 28.3334 16.7821 27.9913 15.3601 27.3743C15.1916 27.3012 15 27.4226 15 27.6062V30.8334C15 33.1346 16.8655 35.0001 19.1667 35.0001H20.8333C23.1345 35.0001 25 33.1346 25 30.8334V27.6062Z"
      fill="#6E5544"
    />
  </svg>
);

export const VisaIcon = ({ width = '64', height = '32', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 64 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6963 19.1463H22.5327L26.7866 10.9894H24.0291L21.1941 16.5114L20.0905 11.805C20.0117 11.3667 19.5387 10.9894 18.9081 10.9894H14.3389V11.2406C15.2848 11.3667 16.1519 11.6169 16.9388 11.9311C17.2541 12.0562 17.4684 12.3215 17.5694 12.6216L19.6963 19.1463ZM25.684 19.1463H28.3627L30.5685 10.9894H27.8897L25.684 19.1463ZM35.1389 12.5573C34.5871 12.5573 34.1141 12.8085 34.0353 13.2479C34.0353 13.6232 34.625 13.8687 35.3338 14.1637C36.4012 14.6081 37.7388 15.1649 37.7388 16.4471C37.7388 18.1413 35.9272 19.2701 33.0119 19.2081C32.066 19.2081 31.0426 19.082 30.0967 18.7688L30.5697 17.0115C31.4354 17.3258 32.3813 17.5139 33.3272 17.5139C34.1141 17.5139 34.9024 17.2627 34.9024 16.6983C34.9812 16.3221 34.5871 16.0709 33.5637 15.6946C32.6178 15.3173 31.2777 14.6909 31.2777 13.498C31.2777 11.9299 33.1696 10.8 35.7695 10.8C36.5564 10.8 37.4235 10.9262 38.2118 11.1774L37.7388 12.9336C36.9505 12.6204 36.006 12.4943 35.1389 12.5573ZM44.985 10.9894L47.112 19.1463H44.6697L44.3544 17.9544H40.9662L40.4158 19.1463H37.6583L41.5969 11.6169C41.7545 11.2406 42.2275 10.9894 42.7004 10.9894H44.985ZM43.8818 16.2593L43.095 13.1851L41.6761 16.2593H43.8818ZM41.8343 20.8H42.2988V22.0667H42.3093C42.475 21.8419 42.7734 21.7001 43.1896 21.7001C43.8353 21.7001 44.2834 22.1166 44.2834 22.7248C44.2834 23.4453 43.6965 23.8037 43.1202 23.8037C42.7469 23.8037 42.4476 23.6911 42.2505 23.4285H42.24L42.213 23.7578H41.8133C41.8238 23.6202 41.8343 23.4161 41.8343 23.2368V20.8ZM42.2988 22.9497C42.2988 22.9953 42.3039 23.0412 42.3198 23.0826C42.4056 23.3366 42.6826 23.5119 43.0244 23.5119C43.5209 23.5119 43.8083 23.1994 43.8083 22.7369C43.8083 22.3329 43.5419 21.9869 43.0353 21.9869C42.72 21.9869 42.4216 22.1622 42.3253 22.4369C42.3093 22.4829 42.2988 22.5328 42.2988 22.5912V22.9497ZM36.3222 20.9337C35.954 20.9337 35.6181 20.9586 35.3348 20.9961V23.7539C35.5693 23.7746 35.8413 23.787 36.178 23.787C36.8771 23.787 37.432 23.6452 37.7733 23.383C38.1037 23.1247 38.2908 22.7498 38.2908 22.2916C38.2908 21.8373 38.1037 21.5123 37.7784 21.2836C37.4639 21.0588 36.9885 20.9337 36.3222 20.9337ZM36.2684 23.4956C36.0872 23.4956 35.9166 23.4913 35.7993 23.4788V21.2583C35.922 21.2376 36.1037 21.2209 36.3432 21.2209C37.3252 21.2209 37.8053 21.6417 37.7998 22.3041C37.7998 23.0623 37.2664 23.4956 36.2684 23.4956ZM40.1708 23.5164C39.6958 23.5164 39.2956 23.3126 39.2851 22.8167V22.8163H41.099C41.1095 22.7746 41.115 22.7204 41.115 22.6453C41.115 22.2751 40.8959 21.7 40.0476 21.7C39.2956 21.7 38.837 22.1749 38.837 22.7828C38.837 23.3914 39.3116 23.804 40.1065 23.804C40.5172 23.804 40.8051 23.7331 40.9708 23.6746L40.8854 23.4124C40.7148 23.4705 40.5067 23.5164 40.1708 23.5164ZM40.0102 21.9629C40.5386 21.9629 40.6669 22.3249 40.6614 22.5544H40.6609H39.2897C39.3271 22.3004 39.5302 21.9629 40.0102 21.9629ZM45.2306 21.4007C45.4168 21.4007 45.5291 21.3009 45.5291 21.1759C45.5291 21.0469 45.4123 20.9468 45.2411 20.9468C45.0655 20.9468 44.9482 21.0512 44.9482 21.1759C44.9482 21.3006 45.0595 21.4007 45.2306 21.4007ZM45.0061 21.7424V23.7588H45.4757V21.7424H45.0061ZM46.9512 21.2634V21.7469H47.6233V22.0259H46.9512V23.113C46.9512 23.3628 47.042 23.5046 47.303 23.5046C47.4312 23.5046 47.5061 23.4964 47.575 23.4797L47.5964 23.7587C47.5056 23.784 47.3614 23.8089 47.1803 23.8089C46.9612 23.8089 46.7855 23.7505 46.6733 23.6546C46.5451 23.542 46.4917 23.3628 46.4917 23.1251V22.0256H46.0919V21.7466H46.4917V21.3714L46.9507 21.2631L46.9512 21.2634Z"
      fill="#172B85"
    />
  </svg>
);

export const MasterIcon = ({ width = '52', height = '32', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 52 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.3873 22.9847C22.5148 22.9819 22.6414 23.0067 22.7575 23.0572C22.8597 23.1034 22.9504 23.1701 23.0233 23.2527V22.1336H23.3346V24.7413H23.0233V24.5113C22.95 24.593 22.8594 24.659 22.7575 24.705C22.6414 24.7556 22.5148 24.7804 22.3873 24.7775C22.2654 24.7784 22.1446 24.7556 22.0323 24.7104C21.9245 24.6673 21.827 24.6039 21.7456 24.524C21.6632 24.4423 21.5984 24.346 21.5548 24.2405C21.4624 24.0089 21.4624 23.7531 21.5548 23.5216C21.5984 23.4162 21.6632 23.3199 21.7456 23.2382C21.827 23.1583 21.9245 23.0948 22.0323 23.0517C22.1446 23.0066 22.2654 22.9838 22.3873 22.9847ZM22.4234 23.2637C22.3357 23.2625 22.2487 23.2788 22.168 23.3116C22.0935 23.3421 22.0266 23.3872 21.9715 23.4438C21.9165 23.5008 21.874 23.5676 21.8462 23.6403C21.8167 23.7175 21.8019 23.799 21.8026 23.8811C21.8019 23.9633 21.817 24.0449 21.8472 24.1219C21.8755 24.1946 21.9183 24.2614 21.9734 24.3184C22.0287 24.3751 22.0956 24.4204 22.1699 24.4515C22.2498 24.4848 22.3362 24.5015 22.4234 24.5005C22.5094 24.5014 22.5947 24.4854 22.6739 24.4534C22.7479 24.4233 22.8145 24.3789 22.8695 24.323C22.9249 24.266 22.9681 24.1992 22.9967 24.1264C23.0575 23.9683 23.0575 23.7948 22.9967 23.6367C22.9679 23.5643 22.9247 23.4978 22.8695 23.441C22.8145 23.3852 22.7479 23.3408 22.6739 23.3108C22.5947 23.2788 22.5094 23.2627 22.4234 23.2637ZM24.7205 22.9847C24.8373 22.9836 24.953 23.0058 25.0603 23.0499C25.1621 23.092 25.2534 23.1544 25.3279 23.2328C25.405 23.315 25.4646 23.4106 25.5036 23.5144C25.5472 23.6303 25.5693 23.7526 25.5691 23.8757C25.5691 23.8951 25.5684 23.9141 25.5671 23.9327C25.5659 23.9514 25.5646 23.9692 25.5634 23.9861H24.1452C24.1541 24.0674 24.1782 24.1465 24.2164 24.2197C24.25 24.2831 24.2961 24.3396 24.3521 24.3863C24.4066 24.431 24.4698 24.4649 24.5382 24.486C24.6093 24.5079 24.6837 24.5189 24.7584 24.5186C24.8612 24.5193 24.9631 24.5008 25.0584 24.4642C25.152 24.428 25.2386 24.3772 25.3147 24.3139L25.4798 24.5167C25.4271 24.5641 25.3692 24.606 25.3071 24.6417C25.2495 24.6747 25.1884 24.7017 25.1248 24.7223C25.0631 24.742 24.9995 24.7563 24.935 24.7648C24.8702 24.7732 24.8048 24.7775 24.7394 24.7775C24.6131 24.7789 24.4878 24.7571 24.3701 24.7132C24.2612 24.6723 24.1626 24.61 24.0807 24.5303C23.9982 24.449 23.9339 24.3526 23.8917 24.2469C23.8019 24.0115 23.8019 23.7535 23.8917 23.5181C23.9335 23.4126 23.9971 23.3161 24.0787 23.2346C24.1593 23.1556 24.2559 23.0931 24.3626 23.0508C24.476 23.006 24.5977 22.9836 24.7205 22.9847ZM24.7147 23.2473C24.6408 23.2463 24.5673 23.2589 24.4983 23.2844C24.4357 23.308 24.3786 23.3431 24.3303 23.3877C24.2818 23.4332 24.2419 23.4865 24.2126 23.5451C24.1807 23.6089 24.1593 23.677 24.149 23.747H25.252C25.2432 23.6758 25.2231 23.6062 25.1922 23.5408C25.1646 23.482 25.126 23.4286 25.0783 23.3831C25.0321 23.3397 24.9772 23.3056 24.9169 23.2827C24.8525 23.2586 24.7839 23.2466 24.7147 23.2473ZM27.0044 22.9847C27.1259 22.9837 27.2464 23.0065 27.3583 23.0517C27.4656 23.095 27.5627 23.1585 27.6439 23.2382C27.7264 23.32 27.7916 23.4162 27.8358 23.5216C27.9294 23.7529 27.9294 24.0092 27.8358 24.2405C27.7916 24.3459 27.7265 24.4422 27.6439 24.524C27.5628 24.6038 27.4657 24.6672 27.3583 24.7104C27.2464 24.7557 27.126 24.7785 27.0044 24.7775C26.8762 24.7805 26.749 24.7557 26.6322 24.705C26.5306 24.6593 26.4406 24.5933 26.3683 24.5113V24.7413H26.0588V22.1336H26.3683V23.251C26.4406 23.169 26.5306 23.1029 26.6322 23.0572C26.749 23.0065 26.8762 22.9817 27.0044 22.9847ZM26.9682 23.2637C26.8821 23.2627 26.7967 23.2788 26.7174 23.3108C26.6436 23.3408 26.5771 23.3852 26.5222 23.441C26.467 23.4978 26.4238 23.5642 26.395 23.6367C26.334 23.7947 26.334 23.9684 26.395 24.1264C26.4235 24.1992 26.4667 24.266 26.5222 24.323C26.577 24.3789 26.6435 24.4234 26.7174 24.4534C26.7967 24.4854 26.8821 24.5014 26.9682 24.5005C27.0557 24.5016 27.1425 24.4849 27.2227 24.4515C27.2966 24.4202 27.3632 24.3749 27.4183 24.3184C27.4732 24.2614 27.5157 24.1946 27.5433 24.1219C27.573 24.0448 27.5879 23.9632 27.5872 23.8811C27.5878 23.7989 27.5727 23.7173 27.5426 23.6403C27.5141 23.5676 27.4712 23.5009 27.4161 23.4438C27.3613 23.3874 27.2948 23.3424 27.2209 23.3116C27.1411 23.2789 27.055 23.2626 26.9682 23.2637ZM28.5476 22.2042C28.6066 22.2041 28.6633 22.2262 28.7052 22.2658C28.726 22.2854 28.7425 22.3088 28.7536 22.3347C28.7647 22.3605 28.7703 22.3882 28.7699 22.4161C28.7701 22.4441 28.7642 22.4719 28.7528 22.4977C28.7417 22.5226 28.7255 22.5451 28.7051 22.5639C28.6847 22.5827 28.6606 22.5974 28.6341 22.6072C28.6066 22.6175 28.5772 22.6227 28.5476 22.6225C28.5184 22.6228 28.4894 22.6176 28.4623 22.6072C28.4364 22.5973 28.4128 22.5826 28.393 22.5638C28.3733 22.5448 28.3575 22.5224 28.3466 22.4977C28.335 22.4719 28.3292 22.4441 28.3294 22.4161C28.329 22.3875 28.3349 22.3591 28.3466 22.3327C28.3576 22.3079 28.3734 22.2852 28.393 22.2658C28.4131 22.2462 28.4372 22.2306 28.4638 22.22C28.4903 22.2095 28.5189 22.2041 28.5476 22.2042ZM28.7052 24.7413H28.3959V23.021H28.7052V24.7413ZM30.5561 23.2907H29.7986V24.1292C29.7972 24.186 29.8059 24.2426 29.8243 24.2966C29.839 24.3395 29.8633 24.3787 29.8955 24.4117C29.9254 24.4416 29.9621 24.4645 30.0028 24.4787C30.0463 24.4936 30.0922 24.5009 30.1384 24.5005C30.2051 24.5005 30.2713 24.4894 30.334 24.4679C30.3951 24.4472 30.4531 24.4192 30.5067 24.3845L30.653 24.6072C30.5792 24.6576 30.4988 24.6984 30.4137 24.7285C30.3171 24.7623 30.2148 24.7789 30.1119 24.7775C30.0229 24.7788 29.9343 24.7656 29.8499 24.7385C29.7755 24.7144 29.7081 24.6737 29.6534 24.6199C29.5972 24.5628 29.555 24.4945 29.53 24.4199C29.4997 24.3277 29.4852 24.2313 29.4873 24.1346V23.2907H29.1019V23.021H29.4873V22.4813H29.7986V23.021H30.5561V23.2907Z"
      fill="black"
    />
    <path d="M28.9324 8.57392H23.0364V18.6814H28.9324V8.57392Z" fill="#FF5F00" />
    <path
      d="M23.4254 13.6278C23.4245 12.6543 23.6558 11.6934 24.1018 10.8179C24.5479 9.94229 25.1969 9.17501 25.9998 8.57412C25.0057 7.82881 23.8118 7.36533 22.5545 7.23665C21.2973 7.10796 20.0275 7.31926 18.8902 7.84639C17.7529 8.37353 16.7941 9.19523 16.1233 10.2176C15.4524 11.2399 15.0967 12.4217 15.0967 13.6278C15.0967 14.8339 15.4524 16.0156 16.1233 17.038C16.7941 18.0603 17.7529 18.882 18.8902 19.4092C20.0275 19.9363 21.2973 20.1476 22.5545 20.0189C23.8118 19.8902 25.0057 19.4267 25.9998 18.6814C25.1969 18.0805 24.5479 17.3133 24.1018 16.4377C23.6558 15.5621 23.4245 14.6012 23.4254 13.6278Z"
      fill="#EB001B"
    />
    <path
      d="M36.2597 17.6106V17.4037H36.3472V17.3616H36.1245V17.4037H36.2121V17.6106H36.2597ZM36.6923 17.6106V17.3613H36.624L36.5454 17.5328L36.4669 17.3613H36.3987V17.6106H36.4468V17.4225L36.5203 17.5847H36.5705L36.6441 17.4221V17.6106H36.6923Z"
      fill="#F79E1B"
    />
    <path
      d="M30.1643 7.19996C28.6534 7.19772 27.1862 7.6819 25.9998 8.57412C26.802 9.17561 27.4504 9.94302 27.8964 10.8184C28.3423 11.6939 28.574 12.6545 28.574 13.6278C28.574 14.6011 28.3423 15.5617 27.8964 16.4371C27.4504 17.3125 26.802 18.0799 25.9998 18.6814C26.8444 19.3147 27.8352 19.7461 28.8901 19.9399C29.945 20.1336 31.0331 20.084 32.0638 19.7951C33.0945 19.5063 34.0379 18.9866 34.8153 18.2794C35.5926 17.5722 36.1815 16.6979 36.5327 15.7296C36.884 14.7612 36.9874 13.7268 36.8345 12.7126C36.6815 11.6984 36.2766 10.7337 35.6534 9.89907C35.0302 9.06442 34.2069 8.38398 33.252 7.91446C32.2972 7.44495 31.2385 7.19997 30.1643 7.19996Z"
      fill="#F79E1B"
    />
  </svg>
);

export const PaypalIcon = ({ width = '52', height = '32', className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 50 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.4838 15.2596C20.3934 15.9374 19.8512 15.9374 19.3542 15.9374H19.0831L19.309 14.6271C19.309 14.5367 19.3994 14.4916 19.4898 14.4916H19.6253C19.9868 14.4916 20.303 14.4916 20.4838 14.6723C20.4838 14.853 20.4838 15.0337 20.4838 15.2596ZM20.2579 13.4524H18.3151C18.1795 13.4524 18.0891 13.5428 18.044 13.6783L17.2759 18.6482C17.2759 18.7386 17.3211 18.829 17.4566 18.829H18.3602C18.4958 18.829 18.5861 18.7386 18.6313 18.6031L18.8572 17.2476C18.8572 17.1121 18.9928 17.0217 19.1283 17.0217H19.7609C21.0259 17.0217 21.7488 16.3892 21.9747 15.1693C22.0651 14.6271 21.9747 14.2205 21.7488 13.9042C21.3874 13.6331 20.8904 13.4524 20.2579 13.4524Z"
      fill="#263577"
    />
    <path
      d="M24.7307 17.0669C24.6403 17.6091 24.2337 17.9706 23.6915 17.9706C23.4204 17.9706 23.1945 17.8802 23.059 17.6995C22.9234 17.5187 22.8782 17.2928 22.9234 17.0669C23.0138 16.5248 23.4204 16.1633 23.9626 16.1633C24.2337 16.1633 24.4596 16.2537 24.5951 16.4344C24.6855 16.5699 24.7758 16.7958 24.7307 17.0669ZM25.9958 15.2597H25.0921C25.0018 15.2597 24.9566 15.3049 24.9114 15.3952L24.8662 15.6663L24.821 15.5759C24.6403 15.3049 24.1885 15.1693 23.7367 15.1693C22.6975 15.1693 21.8391 15.9374 21.6583 17.0217C21.568 17.5639 21.7035 18.0609 22.0198 18.4224C22.2909 18.7386 22.6975 18.8742 23.1945 18.8742C24.0078 18.8742 24.4596 18.332 24.4596 18.332L24.4144 18.6031C24.4144 18.6935 24.4596 18.7838 24.5951 18.7838H25.4084C25.5439 18.7838 25.6343 18.6935 25.6795 18.5579L26.1765 15.3952C26.1765 15.35 26.1313 15.2597 25.9958 15.2597Z"
      fill="#263577"
    />
    <path
      d="M30.9205 15.2596H29.9716C29.8813 15.2596 29.7909 15.3048 29.7457 15.3952L28.4807 17.2928L27.9385 15.4856C27.8933 15.35 27.8029 15.3048 27.6674 15.3048H26.7638C26.6734 15.3048 26.583 15.3952 26.6282 15.5307L27.6674 18.5127L26.7186 19.8681C26.6282 19.9585 26.7186 20.1392 26.8541 20.1392H27.8029C27.8933 20.1392 27.9837 20.094 28.0289 20.0037L31.1012 15.5307C31.1464 15.3952 31.056 15.2596 30.9205 15.2596Z"
      fill="#263577"
    />
    <path
      d="M34.2186 15.2596C34.1283 15.9374 33.5861 15.9374 33.0891 15.9374H32.818L33.0439 14.6271C33.0439 14.5367 33.1343 14.4916 33.2246 14.4916H33.3602C33.7216 14.4916 34.0379 14.4916 34.2186 14.6723C34.2638 14.853 34.2638 15.0337 34.2186 15.2596ZM33.9927 13.4524H32.0499C31.9144 13.4524 31.824 13.5428 31.7788 13.6783L31.0107 18.6482C31.0107 18.7386 31.0559 18.829 31.1915 18.829H32.1855C32.2758 18.829 32.3662 18.7838 32.3662 18.6482L32.5921 17.2476C32.5921 17.1121 32.7276 17.0217 32.8632 17.0217H33.4957C34.7608 17.0217 35.4837 16.3892 35.7096 15.1693C35.8 14.6271 35.7096 14.2205 35.4837 13.9042C35.1674 13.6331 34.6704 13.4524 33.9927 13.4524Z"
      fill="#2199D6"
    />
    <path
      d="M38.5109 17.0669C38.4206 17.6091 38.014 17.9706 37.4718 17.9706C37.2007 17.9706 36.9748 17.8802 36.8392 17.6995C36.7037 17.5187 36.6585 17.2928 36.7037 17.0669C36.794 16.5248 37.2007 16.1633 37.7429 16.1633C38.014 16.1633 38.2399 16.2537 38.3754 16.4344C38.4658 16.5699 38.5561 16.7958 38.5109 17.0669ZM39.776 15.2597H38.8724C38.782 15.2597 38.7368 15.3049 38.6917 15.3952L38.6465 15.6663L38.6013 15.5759C38.4206 15.3049 37.9688 15.1693 37.517 15.1693C36.4778 15.1693 35.6193 15.9374 35.4386 17.0217C35.3483 17.5639 35.4838 18.0609 35.8001 18.4224C36.0711 18.7386 36.4778 18.8742 36.9748 18.8742C37.788 18.8742 38.2398 18.332 38.2398 18.332L38.1947 18.6031C38.1947 18.6935 38.2399 18.7838 38.3754 18.7838H39.1887C39.3242 18.7838 39.4146 18.6935 39.4598 18.5579L39.9567 15.3952C39.9567 15.35 39.8664 15.2597 39.776 15.2597Z"
      fill="#2199D6"
    />
    <path
      d="M40.8601 13.5879L40.0469 18.6482C40.0469 18.7386 40.0921 18.829 40.2276 18.829H41.0409C41.1764 18.829 41.2668 18.7386 41.312 18.6031L42.08 13.6331C42.08 13.5428 42.0349 13.4524 41.8993 13.4524H40.9957C40.9505 13.4524 40.9053 13.5428 40.8601 13.5879Z"
      fill="#2199D6"
    />
    <path
      d="M9.23327 19.7778L9.36881 18.829H9.05254H7.47119L8.55555 11.9163C8.55555 11.9163 8.55554 11.8711 8.60073 11.8711H8.64591H11.3116C12.1701 11.8711 12.8026 12.0518 13.1189 12.4133C13.2544 12.594 13.3448 12.7747 13.39 12.9554C13.4351 13.1814 13.4351 13.4073 13.39 13.7235V13.9043L13.5255 13.9946C13.661 14.0398 13.7514 14.1302 13.8418 14.2205C13.9773 14.3561 14.0677 14.5368 14.0677 14.7627C14.1129 14.9886 14.1129 15.2597 14.0225 15.576C13.9321 15.9374 13.8418 16.2085 13.7062 16.4796C13.5707 16.7055 13.3899 16.8862 13.2092 17.067C13.0285 17.2025 12.7574 17.2929 12.5315 17.3832C12.2604 17.4284 11.9893 17.4736 11.6731 17.4736H11.4472C11.3116 17.4736 11.1761 17.5188 11.0405 17.6091C10.9502 17.6995 10.8598 17.835 10.8146 17.9706V18.0609L10.5435 19.7327V19.7778V19.823C10.5435 19.823 10.5435 19.823 10.4983 19.823H9.23327V19.7778Z"
      fill="#263577"
    />
    <path
      d="M13.7064 13.7235C13.7064 13.7687 13.7064 13.8139 13.6613 13.8591C13.2998 15.6663 12.1251 16.2537 10.5889 16.2537H9.82085C9.64012 16.2537 9.4594 16.3892 9.4594 16.5699L9.05276 19.1001L8.9624 19.823C8.9624 19.9585 9.05276 20.0489 9.14313 20.0489H10.5438C10.7245 20.0489 10.86 19.9134 10.86 19.7778V19.6875L11.1311 18.0609V17.9706C11.1763 17.7898 11.3118 17.6995 11.4474 17.6995H11.6733C13.0287 17.6995 14.0679 17.1573 14.339 15.5759C14.4745 14.8982 14.3842 14.3561 14.0679 13.9946C13.9775 13.9042 13.842 13.8139 13.7064 13.7235Z"
      fill="#2199D6"
    />
    <path
      d="M13.3451 13.5879C13.2999 13.5879 13.2547 13.5428 13.1643 13.5428C13.1192 13.5428 13.0288 13.4976 12.9836 13.4976C12.7577 13.4524 12.5318 13.4524 12.3059 13.4524H10.2276C10.1824 13.4524 10.1372 13.4524 10.092 13.4976C10.0016 13.5428 9.91129 13.6331 9.91129 13.7235L9.45947 16.5247V16.6151C9.50465 16.4344 9.64019 16.2988 9.82092 16.2988H10.589C12.1252 16.2988 13.2999 15.6663 13.6613 13.9042C13.6613 13.859 13.6613 13.8138 13.7065 13.7687C13.6162 13.7235 13.5258 13.6783 13.4354 13.6331C13.3902 13.5879 13.3451 13.5879 13.3451 13.5879Z"
      fill="#252C5E"
    />
    <path
      d="M9.91108 13.7235C9.91108 13.6331 10.0014 13.5428 10.0918 13.4976C10.137 13.4976 10.1822 13.4524 10.2273 13.4524H12.3057C12.5316 13.4524 12.8027 13.4524 12.9834 13.4976C13.0286 13.4976 13.119 13.4976 13.1641 13.5428C13.2093 13.5428 13.2545 13.588 13.3449 13.588C13.39 13.588 13.39 13.588 13.4352 13.6331C13.5256 13.6783 13.6159 13.7235 13.7063 13.7687C13.7967 13.091 13.7063 12.6391 13.3449 12.2325C12.9382 11.7807 12.2153 11.6 11.3117 11.6H8.646C8.46527 11.6 8.28455 11.7355 8.28455 11.9162L7.2002 18.8742C7.2002 19.0097 7.29056 19.1453 7.4261 19.1453H9.05263L9.45926 16.5247L9.91108 13.7235Z"
      fill="#263577"
    />
  </svg>
);

export const PhoneIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59a7.62 7.62 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43A15.28 15.28 0 0 0 6.3 17.7A15.28 15.28 0 0 0 16.57 22zM6 5.41L8.59 8L7.3 9.29a1 1 0 0 0-.3.91a10.12 10.12 0 0 0 2.3 4.5a10.08 10.08 0 0 0 4.5 2.3a1 1 0 0 0 .91-.27L16 15.41L18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7z"
    />
    <path fill="currentColor" d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z" />
  </svg>
);

export const EmailIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 36 36"
  >
    <path
      fill="currentColor"
      d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z"
      className="clr-i-outline clr-i-outline-path-1"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);

export const LockIcon = ({ width = '28', height = '28', className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 15 15"
  >
    <path
      fill="none"
      stroke="currentColor"
      d="M12.5 8.5v-1a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1m0-4h-4a2 2 0 1 0 0 4h4m0-4a2 2 0 1 1 0 4m-9-6v-3a3 3 0 0 1 6 0v3m2.5 4h1m-3 0h1m-3 0h1"
    />
  </svg>
);

export const CircleIcon = ({ width, height, cx1, cy1, r1, cx2, cy2, r2, className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {cx1 && <circle cx={cx1} cy={cy1} r={r1} fill="#B78D71" fillOpacity="0.15" />}
    {cx2 && <circle cx={cx2} cy={cy2} r={r2} fill="#B78D71" fillOpacity="0.1" />}
  </svg>
);
