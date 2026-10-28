import {
  UserIcon,
  TagIcon,
  ChevronDownIcon,
  BuildingIcon,
  GlobeIcon,
  ContactIcon,
  ClockIcon,
  WidgetsIcon,
  StatusDotIcon,
} from '../icons/Icon';
import './DetailsPanel.css';

function InboxTabIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16l-2 8H6L4 5z" />
      <path d="M4 5l1 12a2 2 0 002 2h10a2 2 0 002-2l1-12" />
    </svg>
  );
}

function FieldRow({ icon, label, value, placeholder }) {
  return (
    <div className="details-panel__field-row">
      <div className="details-panel__field-label">
        {icon}
        <span>{label}</span>
      </div>
      {value ? (
        <span className="details-panel__field-value">{value}</span>
      ) : (
        <span className="details-panel__field-placeholder">{placeholder ?? 'Empty'}</span>
      )}
    </div>
  );
}

function AccordionSection({ icon, title, children }) {
  return (
    <div className="details-panel__section">
      <button className="details-panel__section-header" type="button">
        {icon}
        <span className="details-panel__section-title">{title}</span>
        <ChevronDownIcon size={16} />
      </button>
      <div className="details-panel__section-body">{children}</div>
    </div>
  );
}

export default function DetailsPanel({ inboxName = 'My-WhatsApp-Inbox', conversation, channel = 'whatsapp' }) {
  const contactName = conversation?.title || '';
  const isPhone = channel === 'whatsapp';
  return (
    <div className="details-panel">
      <div className="details-panel__tabs">
        <div className="details-panel__tab details-panel__tab--active">
          <InboxTabIcon />
        </div>
      </div>

      <div className="details-panel__scroll">
        <div className="details-panel__inbox-header">
          <p className="details-panel__inbox-title">{inboxName}</p>
          <FieldRow icon={<UserIcon size={14} />} label="Assignee" value="Arnold" />
          <FieldRow
            icon={<StatusDotIcon />}
            label="Status"
            value="Open"
          />
          <FieldRow icon={<TagIcon size={14} />} label="Tags" />
        </div>

        <AccordionSection icon={<UserIcon size={16} />} title="Contact details">
          <FieldRow icon={<UserIcon size={14} />} label="Name" value={isPhone ? undefined : contactName} />
          <FieldRow icon={<UserIcon size={14} />} label="Email" />
          <FieldRow icon={<UserIcon size={14} />} label="Phone" value={isPhone ? contactName : undefined} />
          <FieldRow icon={<UserIcon size={14} />} label="Username" value={isPhone ? '@username' : undefined} />
        </AccordionSection>

        <AccordionSection icon={<UserIcon size={16} />} title="Previous Conversations">
          <p className="details-panel__empty-note">
            There are no other chats associated to this contact
          </p>
        </AccordionSection>

        <AccordionSection icon={<BuildingIcon size={16} />} title="Account details">
          <FieldRow icon={<BuildingIcon size={14} />} label="Account" value="-" />
          <FieldRow icon={<GlobeIcon size={14} />} label="Domain" value="-" />
          <FieldRow icon={<ContactIcon size={14} />} label="Contact" value="-" />
        </AccordionSection>

        <AccordionSection icon={<ClockIcon size={16} />} title="Conversation details">
          <FieldRow icon={<ClockIcon size={14} />} label="Initiated at" value="Jun 30, 2026 10:14 AM" />
        </AccordionSection>

        <div className="details-panel__footer">
          <button className="details-panel__widgets-btn" type="button">
            <WidgetsIcon size={14} />
            Customize widgets
          </button>
        </div>
      </div>
    </div>
  );
}
