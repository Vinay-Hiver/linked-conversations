import React, { useState, useRef, useEffect } from 'react';
import AppMainNav from '../components/AppMainNav';
import './MySettingsPage.css';

// Icons
import editIcon from '../assets/icons/new-conversation.svg';
import inboxIcon from '../assets/icons/inbox-icon.svg';
import bellIcon from '../assets/icons/notification.svg';
import { Plus, Pencil, Trash2, ChevronDown } from 'lucide-react';

const UNDO_TIMERS = ['Send immediately (Undo)', '5 seconds', '10 seconds', '20 seconds', '30 seconds'];

const MySettingsPage = () => {
  const [isDirty, setIsDirty] = useState(false);

  const [signatures, setSignatures] = useState([
    { id: 1, name: 'Untitled' },
    { id: 2, name: 'Signature-Sania' },
  ]);
  const [primarySignatureId, setPrimarySignatureId] = useState(null);
  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);

  const [undoTimer, setUndoTimer] = useState(UNDO_TIMERS[0]);
  const [showUndoDropdown, setShowUndoDropdown] = useState(false);

  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] = useState(true);
  const [appearance, setAppearance] = useState('light');
  const [messageOrder, setMessageOrder] = useState('newest_first');
  const [timeFormat, setTimeFormat] = useState('12h');

  const nextSignatureId = useRef(3);

  useEffect(() => { document.title = 'AI Prototype - My Settings'; }, []);

  const handleAddSignature = () => {
    const id = nextSignatureId.current++;
    setSignatures((prev) => [...prev, { id, name: 'Untitled' }]);
    setIsDirty(true);
  };

  const handleRenameSignature = (id) => {
    const current = signatures.find((s) => s.id === id);
    const name = window.prompt('Signature name', current ? current.name : '');
    if (!name || !name.trim()) return;
    setSignatures((prev) => prev.map((s) => (s.id === id ? { ...s, name: name.trim() } : s)));
    setIsDirty(true);
  };

  const handleDeleteSignature = (id) => {
    setSignatures((prev) => prev.filter((s) => s.id !== id));
    if (primarySignatureId === id) setPrimarySignatureId(null);
    setIsDirty(true);
  };

  const primarySignatureName = signatures.find((s) => s.id === primarySignatureId)?.name || 'None';

  return (
    <div className="settings-page-root">
      <AppMainNav />

      <div className="settings-layout">
        <aside className="settings-subnav">
          <div className="subnav-header">
            <h2>My Settings</h2>
          </div>
          <div className="subnav-items">
            <div className="subnav-item active">
               <img src={editIcon} alt="" width="16" height="16" />
               <span>Basic Settings</span>
            </div>
            {/* Not built yet — visible for context, not navigable */}
            <div className="subnav-item disabled">
               <img src={inboxIcon} alt="" width="16" height="16" />
               <span>Personal Inbox</span>
            </div>
            <div className="subnav-item disabled">
               <img src={bellIcon} alt="" width="16" height="16" />
               <span>Notifications Settings</span>
            </div>
          </div>
        </aside>

        <div className="settings-content-wrapper">
          <main className="settings-main-content">
            <header className="content-header">
              <h1>Basic Settings</h1>
            </header>

            <section className="settings-section settings-section-wide">
              <div className="section-header-row">
                <div className="section-header">
                  <h3 className="section-title">Signature</h3>
                  <p className="section-desc">Create and manage email signatures for different inboxes.</p>
                </div>
                <button type="button" className="btn-secondary-filled" onClick={handleAddSignature}>
                  <Plus size={14} />
                  <span>New Signature</span>
                </button>
              </div>

              <div className="signature-table-wrap">
                <table className="signature-table">
                  <thead>
                    <tr>
                      <th>Signature name</th>
                      <th>Default for</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatures.map((sig) => (
                      <tr key={sig.id} className="signature-table-row">
                        <td>{sig.name}</td>
                        <td className="signature-default-for">—</td>
                        <td>
                          <div className="signature-row-actions">
                            <button type="button" title="Rename" onClick={() => handleRenameSignature(sig.id)}>
                              <Pencil size={14} />
                            </button>
                            <button type="button" title="Delete" onClick={() => handleDeleteSignature(sig.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {signatures.length === 0 && (
                      <tr>
                        <td colSpan={3} className="signature-empty-row">No signatures yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="primary-signature-card">
                <div className="primary-signature-text">
                  <label>Primary signature</label>
                  <p>Primary signature is used when no default signature is assigned for an inbox</p>
                </div>
                <div className="primary-signature-select-wrap">
                  <div
                    className="primary-signature-select"
                    onClick={() => setShowPrimaryDropdown((v) => !v)}
                  >
                    <span>{primarySignatureName}</span>
                    <ChevronDown size={14} className={showPrimaryDropdown ? 'chevron-up' : ''} />
                  </div>
                  {showPrimaryDropdown && (
                    <div className="primary-signature-dropdown">
                      <div
                        className={`primary-signature-option ${primarySignatureId === null ? 'selected' : ''}`}
                        onClick={() => { setPrimarySignatureId(null); setShowPrimaryDropdown(false); setIsDirty(true); }}
                      >
                        None
                      </div>
                      {signatures.map((sig) => (
                        <div
                          key={sig.id}
                          className={`primary-signature-option ${primarySignatureId === sig.id ? 'selected' : ''}`}
                          onClick={() => { setPrimarySignatureId(sig.id); setShowPrimaryDropdown(false); setIsDirty(true); }}
                        >
                          {sig.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="settings-section settings-section-divided">
              <div className="section-header">
                <h3 className="section-title">Undo Send</h3>
                <p className="section-desc">Undo email sending within your preferred timeframe after pressing Send.</p>
              </div>

              <div className="undo-timer-field">
                <label className="undo-timer-label">Select Undo timer</label>
                <div className="select-box" onClick={() => setShowUndoDropdown((v) => !v)}>
                  <span>{undoTimer}</span>
                  <ChevronDown size={14} className={showUndoDropdown ? 'chevron-up' : ''} />
                </div>
                {showUndoDropdown && (
                  <div className="undo-timer-dropdown">
                    {UNDO_TIMERS.map((t) => (
                      <div
                        key={t}
                        className={`undo-timer-option ${undoTimer === t ? 'selected' : ''}`}
                        onClick={() => { setUndoTimer(t); setShowUndoDropdown(false); setIsDirty(true); }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="settings-section settings-section-divided">
              <div className="keyboard-shortcuts-row">
                <div className="keyboard-shortcuts-text">
                  <h3 className="section-title">Keyboard Shortcuts</h3>
                  <p className="section-desc">Enable keyboard shortcuts</p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="view-all-link">View all</a>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${keyboardShortcutsEnabled ? 'on' : ''}`}
                  role="switch"
                  aria-checked={keyboardShortcutsEnabled}
                  onClick={() => { setKeyboardShortcutsEnabled((v) => !v); setIsDirty(true); }}
                >
                  <span className="toggle-switch-handle" />
                </button>
              </div>
            </section>

            <section className="settings-section settings-section-divided">
              <div className="appearance-row">
                <div className="appearance-text">
                  <h3 className="section-title">Appearance</h3>
                  <p className="section-desc">Choose how Hiver looks on this device.</p>
                </div>
                <div className="appearance-pill-tabs">
                  {['light', 'dark', 'system'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`appearance-pill-tab ${appearance === mode ? 'active' : ''}`}
                      onClick={() => { setAppearance(mode); setIsDirty(true); }}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="settings-section settings-section-divided">
              <div className="section-header">
                <h3 className="section-title">Message order in emails and tickets</h3>
                <p className="section-desc">Choose where the newest message appears in email conversations and tickets.</p>
              </div>
              <div className="message-order-options">
                <label className={`message-order-card ${messageOrder === 'newest_first' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="thread_sort_order"
                    checked={messageOrder === 'newest_first'}
                    onChange={() => { setMessageOrder('newest_first'); setIsDirty(true); }}
                  />
                  <div className="message-order-preview">
                    <span className="message-order-preview-rail" />
                    <span className="message-order-preview-bar highlighted" />
                    <span className="message-order-preview-bar" />
                    <span className="message-order-preview-bar" />
                  </div>
                  <span className="message-order-label">Newest on top</span>
                </label>
                <label className={`message-order-card ${messageOrder === 'oldest_first' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="thread_sort_order"
                    checked={messageOrder === 'oldest_first'}
                    onChange={() => { setMessageOrder('oldest_first'); setIsDirty(true); }}
                  />
                  <div className="message-order-preview">
                    <span className="message-order-preview-rail" />
                    <span className="message-order-preview-bar" />
                    <span className="message-order-preview-bar" />
                    <span className="message-order-preview-bar highlighted" />
                  </div>
                  <span className="message-order-label">Newest on bottom</span>
                </label>
              </div>
            </section>

            <section className="settings-section settings-section-divided">
              <div className="time-format-row">
                <div className="time-format-text">
                  <h3 className="section-title">Time format</h3>
                  <p className="section-desc">Choose how time is displayed in Hiver.</p>
                  <p className="time-format-preview">
                    Example:{' '}
                    <span className="time-format-preview-value">
                      {timeFormat === '24h' ? '13:00' : '01:00 PM'}
                    </span>
                  </p>
                </div>
                <div className="time-format-tabs">
                  {[{ id: '12h', label: '12-hour' }, { id: '24h', label: '24-hour' }].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`time-format-tab ${timeFormat === opt.id ? 'active' : ''}`}
                      onClick={() => { setTimeFormat(opt.id); setIsDirty(true); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <footer className="settings-footer">
            <button className="btn-save" disabled={!isDirty} onClick={() => setIsDirty(false)}>Save</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MySettingsPage;
