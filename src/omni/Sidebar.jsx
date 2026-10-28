import React from 'react';
import './Sidebar.css';
import AppMainNav from './components/AppMainNav';
import MainSidebarPanel from './components/MainSidebarPanel';

const Sidebar = ({ activeFilter, onFilterChange, activeRole }) => {
  return (
    <div className="sidebar-root">
      <AppMainNav />
      <MainSidebarPanel
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        activeRole={activeRole}
      />
    </div>
  );
};

export default Sidebar;
