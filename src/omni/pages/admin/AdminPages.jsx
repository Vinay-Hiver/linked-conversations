import React, { useState } from 'react';
import {
  SHARED_INBOX_TABS, EMAIL_INBOXES, USERS, WEB_FORMS, PORTALS, API_KEYS, SETTINGS_TABS,
} from './adminData';
import './adminPages.css';

// ---- Small building blocks ----

const PageHeader = ({ title, action }) => (
  <div className="ap-header">
    <h1 className="ap-title">{title}</h1>
    {action && <button type="button" className="ap-btn-primary">{action}</button>}
  </div>
);

const Avatar = ({ name }) => (
  <span className="ap-avatar">{(name || '?').trim().charAt(0).toUpperCase()}</span>
);

// A left sub-navigation column (used by Shared Inbox + Settings pages).
const SubNav = ({ title, tabs, active, onChange }) => (
  <div className="ap-subnav">
    <div className="ap-subnav-title">{title}</div>
    <div className="ap-subnav-items">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          className={`ap-subnav-item ${active === t ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  </div>
);

// ---- Shared Inbox ----

const inboxActionButton = (action) => {
  if (action === 'reauthorize') return <button type="button" className="ap-link-btn">Reauthorize</button>;
  if (action === 'fix') return <button type="button" className="ap-chip ap-chip-warning">Fix Setup</button>;
  if (action === 'complete') return <button type="button" className="ap-chip ap-chip-danger">Complete Setup</button>;
  return null;
};

const SharedInboxPage = () => {
  const [tab, setTab] = useState('Email Inboxes');
  return (
    <div className="ap-with-subnav">
      <SubNav title="Shared Inboxes" tabs={SHARED_INBOX_TABS} active={tab} onChange={setTab} />
      <div className="ap-main">
        <PageHeader title={tab} action={tab === 'Email Inboxes' ? 'Create Email Inbox' : `Create ${tab.replace(' Inboxes', ' Inbox')}`} />
        <div className="ap-body">
          {tab === 'Email Inboxes' ? (
            <div className="ap-table-card">
              <table className="ap-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Account Type</th></tr>
                </thead>
                <tbody>
                  {EMAIL_INBOXES.map((r) => (
                    <tr key={r.email}>
                      <td><div className="ap-cell-icon"><span className="ap-mini-mail" />{r.name}</div></td>
                      <td className="ap-muted">{r.email}</td>
                      <td>
                        <div className="ap-type-cell">
                          <span>{r.type}</span>
                          {inboxActionButton(r.action)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyBlock label={`No ${tab.toLowerCase()} yet.`} />
          )}
        </div>
      </div>
    </div>
  );
};

// ---- Users ----

const roleClass = (role) => {
  if (role === 'Admin') return 'ap-badge ap-badge-blue';
  if (role === 'Inbox Admin') return 'ap-badge ap-badge-violet';
  return 'ap-badge ap-badge-slate';
};

const UsersPage = () => (
  <div className="ap-main ap-main-full">
    <PageHeader title="All Users" action="Add User" />
    <div className="ap-body">
      <div className="ap-table-card">
        <table className="ap-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email}>
                <td>
                  <div className="ap-cell-icon">
                    <Avatar name={u.name} />
                    <span>{u.name}{u.invited && <span className="ap-invited"> (Invited)</span>}</span>
                  </div>
                </td>
                <td className="ap-muted">{u.email}</td>
                <td><span className={roleClass(u.role)}>{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ---- Web Forms ----

const WebFormsPage = () => (
  <div className="ap-main ap-main-full">
    <PageHeader title="Web Forms" action="Create Web Form" />
    <div className="ap-body">
      <div className="ap-table-card">
        <table className="ap-table">
          <thead><tr><th>Form name</th><th>Inbox</th><th>Created on</th><th>Status</th></tr></thead>
          <tbody>
            {WEB_FORMS.map((f, i) => (
              <tr key={`${f.name}-${i}`}>
                <td><div className="ap-cell-icon"><span className="ap-mini-form" />{f.name}</div></td>
                <td className="ap-muted">{f.inbox}</td>
                <td className="ap-muted">{f.created}</td>
                <td><span className="ap-badge ap-badge-green">Published</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ---- Customer Portal ----

const CustomerPortalPage = () => (
  <div className="ap-main ap-main-full">
    <PageHeader title="Customer Portal" action="Create Portal" />
    <p className="ap-subtitle">Create and manage your portals.</p>
    <div className="ap-body">
      <div className="ap-table-card">
        <table className="ap-table">
          <thead><tr><th>Name</th><th>URL</th><th>Status</th></tr></thead>
          <tbody>
            {PORTALS.map((p, i) => (
              <tr key={`${p.name}-${i}`}>
                <td>{p.name}</td>
                <td className="ap-muted"><a href={p.url} className="ap-url" onClick={(e) => e.preventDefault()}>{p.url}</a></td>
                <td>
                  {p.status === 'Portal'
                    ? <span className="ap-badge ap-badge-green">Live</span>
                    : <span className="ap-badge ap-badge-red">Verification failed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ---- Developer ----

const DeveloperPage = () => (
  <div className="ap-main ap-main-full">
    <PageHeader title="Developer" action="Create API Key" />
    <div className="ap-body">
      <div className="ap-table-card">
        <table className="ap-table">
          <thead><tr><th>API Key Name</th><th>API Key</th><th>Created On</th></tr></thead>
          <tbody>
            {API_KEYS.map((k) => (
              <tr key={k.name}>
                <td>{k.name}</td>
                <td className="ap-muted ap-mono">{k.key}</td>
                <td className="ap-muted">{k.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ---- Schedule ----

const SchedulePage = () => {
  const [tab, setTab] = useState('Shifts');
  return (
    <div className="ap-main ap-main-full">
      <div className="ap-tabs-row">
        {['Shifts', 'Business Hours'].map((t) => (
          <button key={t} type="button" className={`ap-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className="ap-body">
        {tab === 'Shifts' ? (
          <>
            <div className="ap-shift-head">
              <div>
                <h2 className="ap-section-h">Shifts</h2>
                <p className="ap-subtitle-tight">
                  If a member is going away on planned leave, remove them from any shifts they're
                  scheduled for. Otherwise, Hiver will mark them as available when the shift starts.
                </p>
              </div>
              <button type="button" className="ap-btn-primary">Add shift</button>
            </div>
            <div className="ap-shift-card">
              <div className="ap-shift-card-head">
                <div>
                  <div className="ap-shift-title">Morning shift</div>
                  <div className="ap-subtitle-tight">India Standard Time - Kolkata · Accounts Recievables</div>
                </div>
                <button type="button" className="ap-link-btn">Edit shift</button>
              </div>
              <div className="ap-shift-meta">Mon – Fri: 9AM – 5PM</div>
              <div className="ap-cell-icon"><Avatar name="Akshaya s" /> Akshaya s</div>
            </div>
          </>
        ) : (
          <EmptyBlock label="Configure your organization's business hours here." />
        )}
      </div>
    </div>
  );
};

// ---- Settings (inner) ----

const SettingsInnerPage = () => {
  const [tab, setTab] = useState('Identity & Access');
  return (
    <div className="ap-with-subnav">
      <SubNav title="Settings" tabs={SETTINGS_TABS} active={tab} onChange={setTab} />
      <div className="ap-main">
        <PageHeader title={tab} />
        <div className="ap-body">
          {tab === 'Identity & Access' ? (
            <div className="ap-cards">
              <div className="ap-setting-card">
                <div className="ap-setting-info">
                  <h3>Single Sign-On (SSO)</h3>
                  <p>Log in to Hiver using your company's identity provider. No separate passwords
                    needed and access is granted and revoked automatically as your team changes.</p>
                </div>
                <button type="button" className="ap-btn-secondary">Enable SSO</button>
              </div>
              <div className="ap-setting-card">
                <div className="ap-setting-info">
                  <h3>User Provisioning</h3>
                  <p>Automatically create, update, and deactivate Hiver users based on your identity
                    provider. Keep your team roster in sync without manual admin work.</p>
                </div>
                <button type="button" className="ap-btn-secondary">Enable Provisioning</button>
              </div>
            </div>
          ) : (
            <EmptyBlock label={`${tab} settings`} />
          )}
        </div>
      </div>
    </div>
  );
};

// ---- Help Center (external widget in the real app) + generic empty ----

const EmptyBlock = ({ label }) => (
  <div className="ap-empty">{label}</div>
);

const HelpCenterPage = () => (
  <div className="ap-main ap-main-full">
    <PageHeader title="Help Center" />
    <div className="ap-body"><EmptyBlock label="Loading…" /></div>
  </div>
);

const PlaceholderPage = ({ title }) => (
  <div className="ap-main ap-main-full">
    <PageHeader title={title} />
    <div className="ap-body"><EmptyBlock label={`${title} — coming soon.`} /></div>
  </div>
);

// ---- Router: map Admin Panel item id -> page ----

export const ADMIN_PAGES = {
  'shared-inbox': <SharedInboxPage />,
  'users': <UsersPage />,
  'web-forms': <WebFormsPage />,
  'customer-portal': <CustomerPortalPage />,
  'developer': <DeveloperPage />,
  'schedule': <SchedulePage />,
  'settings': <SettingsInnerPage />,
  'help-center': <HelpCenterPage />,
  'hiver-ai': <PlaceholderPage title="Hiver AI" />,
  'knowledge-hub': <PlaceholderPage title="Knowledge Hub" />,
  'custom-objects': <PlaceholderPage title="Custom Objects" />,
  'apps': <PlaceholderPage title="Apps" />,
};
