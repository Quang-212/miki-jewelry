import { NAV_USER_ITEMS } from './nav-user-config';
import NavItem from './NavItem';
import NavSidebar from './NavSidebar';
import NavSidebarHeader from './NavSidebarHeader';

export default function UserSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <NavSidebar>
        <NavSidebarHeader />
        <ul className="flex flex-col mt-2">
          {NAV_USER_ITEMS.map((navItem, index) => (
            <li key={index}>
              <NavItem data={navItem} />
            </li>
          ))}
        </ul>
      </NavSidebar>
    </aside>
  );
}
