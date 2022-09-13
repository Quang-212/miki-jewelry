export default function Badge({ badgeContent = '', children }) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-4 w-fit h-5 px-2 rounded-full text-center leading-5 bg-primary-2 text-neutral-5 caption">
        {badgeContent}
      </div>
      {children}
    </div>
  );
}
