import InboxIcon from '../InboxIcon';
import { ViewTypeIcon } from '../viewIcons';
import './ConversationList.css';

// Maps a view name (the active submenu item) to a header glyph.
const VIEW_ICON = {
  Unassigned: 'unassigned', Mine: 'mine', 'All Assigned': 'team',
  Pending: 'pending', Closed: 'closed',
};

// [inbox icon] [name or number], the same format as the Voice list.
function ConversationAvatar({ channel }) {
  return <InboxIcon channel={channel} />;
}

function ConversationItem({ conversation, channel, selected, onSelect }) {
  return (
    <div className="conversation-list__item-wrap">
      <div
        className={'conversation-list__item' + (selected ? ' conversation-list__item--selected' : '')}
        onClick={() => onSelect(conversation.id)}
      >
        <div className="conversation-list__row">
          <ConversationAvatar conversation={conversation} channel={channel} />
          <span className="conversation-list__title">{conversation.title}</span>
          <span className="conversation-list__date">{conversation.date}</span>
        </div>
        <p className="conversation-list__preview">{conversation.preview}</p>
      </div>
    </div>
  );
}

export default function ConversationList({ channel, conversations = [], selectedId, onSelect, title = 'Mine' }) {
  return (
    <div className="conversation-list">
      <div className="conversation-list__header">
        <ViewTypeIcon icon={VIEW_ICON[title] || 'mine'} />
        <span>{title}</span>
      </div>
      <div className="conversation-list__body">
        {conversations.map((conversation, index) => (
          <div key={conversation.id}>
            <ConversationItem
              conversation={conversation}
              channel={channel}
              selected={conversation.id === selectedId}
              onSelect={onSelect}
            />
            {index < conversations.length - 1 && <div className="conversation-list__divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
