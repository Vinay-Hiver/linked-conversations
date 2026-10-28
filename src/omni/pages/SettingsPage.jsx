import React, { useState, useEffect } from 'react';
import AppMainNav from '../components/AppMainNav';
import { ADMIN_TOP_ITEM, ADMIN_SECTIONS } from './admin/adminData';
import { ADMIN_PAGES } from './admin/AdminPages';
import './SettingsPage.css';

// id -> label lookup for the browser tab title.
const ADMIN_LABELS = [ADMIN_TOP_ITEM, ...ADMIN_SECTIONS.flatMap((s) => s.items)]
  .reduce((map, item) => ({ ...map, [item.id]: item.label }), {});

const SettingsPage = () => {
  const [selected, setSelected] = useState('shared-inbox');

  useEffect(() => {
    document.title = `AI Prototype - ${ADMIN_LABELS[selected] || 'Settings'}`;
  }, [selected]);

  const renderItem = (item) => (
    <button
      key={item.id}
      type="button"
      className={`admin-item ${selected === item.id ? 'active' : ''}`}
      onClick={() => setSelected(item.id)}
    >
      <span
        className="admin-item-icon"
        style={{ '--admin-icon': `url(${item.icon})` }}
        aria-hidden="true"
      />
      <span className="admin-item-label">{item.label}</span>
    </button>
  );

  return (
    <div className="settings-page-root">
      <AppMainNav />

      <aside className="admin-panel">
        <div className="admin-panel-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-panel-nav">
          {renderItem(ADMIN_TOP_ITEM)}

          {ADMIN_SECTIONS.map((section) => (
            <div className="admin-section" key={section.title}>
              <div className="admin-section-title">{section.title}</div>
              <div className="admin-section-items">
                {section.items.map(renderItem)}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="ap-root">
        {ADMIN_PAGES[selected] || null}
      </div>
    </div>
  );
};

export default SettingsPage;
