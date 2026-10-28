import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainNav } from '../../patterns/MainNav';
import { navSampleItems, navSampleFooterItems } from '../../patterns/MainNav/sampleData';
import { useCurrentUser } from '../CurrentUser';
import SwitchUserModal from './SwitchUserModal';

// Main nav from the storybook (replaces the omni-boilerplate MiniSidebar).
// Conversations and Admin Panel navigate; the other icons do nothing yet.
const NAV_ROUTES = { conversations: '/', admin: '/admin-panel' };

// The avatar menu shows a single option.
const USER_MENU_ENTRIES = [{ id: 'switch-user', label: 'Switch user', icon: 'switchaccountavailability' }];

export default function AppMainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useCurrentUser();
  const [switching, setSwitching] = React.useState(false);
  const value = location.pathname === '/admin-panel' ? 'admin' : 'conversations';

  return (
    <>
      <MainNav
        items={navSampleItems}
        footerItems={navSampleFooterItems}
        value={value}
        onChange={(id) => NAV_ROUTES[id] && navigate(NAV_ROUTES[id])}
        user={{ initial: user.name.charAt(0), name: user.name, showStatus: true }}
        userMenu={{ name: user.name, email: user.email, entries: USER_MENU_ENTRIES }}
        onMenuSelect={(menu, id) => { if (menu === 'user' && id === 'switch-user') setSwitching(true); }}
      />
      {switching && <SwitchUserModal onClose={() => setSwitching(false)} />}
    </>
  );
}
