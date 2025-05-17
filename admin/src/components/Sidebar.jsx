import { NavLink } from 'react-router-dom';
import { PlusCircle, ListChecks, ClipboardList } from 'lucide-react';

const navItems = [
  {
    to: '/add-items',
    label: 'Add Items',
    icon: PlusCircle,
  },
  {
    to: '/list',
    label: 'List Items',
    icon: ListChecks,
  },
  {
    to: '/orders',
    label: 'Orders',
    icon: ClipboardList,
  },
];

const Sidebar = () => {
  const baseLinkClasses =
    'flex items-center border p-2 rounded-[1px] transition-all duration-200 hover:bg-gray-100 border-[#D9D9D9]';

  const responsiveClasses = 'flex-col justify-center sm:flex-row sm:justify-start sm:gap-2';

  return (
    <aside className="w-16 sm:w-64 bg-white border-r border-gray-200 p-2 sm:p-4 mt-4">
      <nav className="flex flex-col gap-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${baseLinkClasses} ${responsiveClasses} ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
