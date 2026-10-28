import React from 'react';
import { Icon } from '../../icons/Icon';
import './InboxIcon.css';

// The channel icon shown before the name on conversation list cards, in every
// inbox (the Voice list's format), at 16px: [inbox icon] [name or number]. Tickets use the ticket icon.
const ICONS = { email: 'emailinbox', chat: 'chatinbox', whatsapp: 'whatsapp', sms: 'sms', slack: 'slack', voice: 'voice', ticket: 'ticket' };

export default function InboxIcon({ channel, ticket }) {
  return (
    <span className="inbox-icon" aria-hidden="true">
      <Icon name={ICONS[ticket ? 'ticket' : channel] || 'emailinbox'} size={16} />
    </span>
  );
}
