import React from 'react';
import './SlackConversationList.css';
import InboxIcon from '../InboxIcon';

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12.5l6.5-6.5a3 3 0 014.2 4.2L11 18a5 5 0 01-7-7l7-7" />
    </svg>
  );
}

// Slack conversation list (Figma node 3017:24579): avatar + name + unread
// badge + date, a preview line, and a #channel chip.
export default function SlackConversationList({ conversations = [], selectedId, onSelect, title = 'Mine' }) {
  return (
    <div className="slack-list">
      <div className="slack-list__header">
        <PersonIcon />
        <span>{title}</span>
      </div>
      {conversations.map((c) => (
        <button
          key={c.id}
          type="button"
          className="slack-list__item"
          onClick={() => onSelect(c.id)}
        >
          <div className={`slack-list__inner ${c.id === selectedId ? 'is-selected' : ''}`}>
            <div className="slack-list__top">
              {/* [inbox icon] [name], the same format as the Voice list */}
              <InboxIcon channel="slack" />
              <span className="slack-list__name">{c.name}</span>
              {c.unread && <span className="slack-list__badge">{c.unread}</span>}
              <span className="slack-list__date">{c.date}</span>
            </div>
            <div className="slack-list__preview">
              {c.attachment && <span className="slack-list__clip"><PaperclipIcon /></span>}
              <span className={c.attachment ? 'slack-list__preview-strong' : ''}>{c.preview}</span>
            </div>
            {c.channel && <span className="slack-list__chip">#{c.channel}</span>}
          </div>
        </button>
      ))}
    </div>
  );
}
