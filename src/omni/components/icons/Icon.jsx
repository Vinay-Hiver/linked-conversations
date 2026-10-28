import { Icon as HotIcon } from '../../../icons/Icon';
import whatsappIconUrl from '../../icons/whatsapp.svg';
import singleTickUrl from '../../icons/single-tick.svg';
import doubleTickUrl from '../../icons/double-tick.svg';
import readTickUrl from '../../icons/read-tick.svg';

function Svg({ size = 16, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon({ size = 16 }) {
  return <img src={whatsappIconUrl} width={size} height={size} alt="" />;
}

export function UserIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </Svg>
  );
}

export function TagIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M11 4h-4l-4 4v4l9 9 8-8-9-9z" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function SingleTickIcon({ size = 14 }) {
  return <img src={singleTickUrl} width={size} height={size} alt="sent" />;
}

export function DoubleTickIcon({ size = 14 }) {
  return <img src={doubleTickUrl} width={size} height={size} alt="delivered" />;
}

export function ReadTickIcon({ size = 14 }) {
  return <img src={readTickUrl} width={size} height={size} alt="read" />;
}

export function CheckIcon({ size = 14 }) {
  return <ReadTickIcon size={size} />;
}

export function SmileIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01" />
      <path d="M8 14c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
    </Svg>
  );
}

export function PaperclipIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M8 12.5l6.5-6.5a3 3 0 014.2 4.2L11 18a5 5 0 01-7-7l7-7" />
    </Svg>
  );
}

export function WhatsAppTemplateIcon({ size = 16 }) {
  return (
    <Svg size={size} viewBox="0 0 16 16" strokeWidth="1.3">
      <path d="M7.90625 2.01172C6.44517 2.03579 5.04309 2.59225 3.96314 3.57667C2.88319 4.56108 2.19961 5.90577 2.0407 7.35839C1.88178 8.81101 2.25844 10.2717 3.1 11.4663L2 13.9997L5.36667 13.3997C6.67908 14.0422 8.1809 14.1838 9.59026 13.7977C10.9996 13.4117 12.2197 12.5245 13.0214 11.3028C13.8231 10.0811 14.1515 8.60883 13.9448 7.16223M6 6.66634C6 6.75475 6.03512 6.83953 6.09763 6.90204C6.16014 6.96455 6.24493 6.99967 6.33333 6.99967C6.42174 6.99967 6.50652 6.96455 6.56904 6.90204C6.63155 6.83953 6.66667 6.75475 6.66667 6.66634V5.99967C6.66667 5.91127 6.63155 5.82648 6.56904 5.76397C6.50652 5.70146 6.42174 5.66634 6.33333 5.66634C6.24493 5.66634 6.16014 5.70146 6.09763 5.76397C6.03512 5.82648 6 5.91127 6 5.99967V6.66634ZM6 6.66634C6 7.55039 6.35119 8.39824 6.97631 9.02336C7.60143 9.64848 8.44928 9.99967 9.33333 9.99967M9.33333 9.99967H10C10.0884 9.99967 10.1732 9.96455 10.2357 9.90204C10.2982 9.83953 10.3333 9.75475 10.3333 9.66634C10.3333 9.57793 10.2982 9.49315 10.2357 9.43064C10.1732 9.36812 10.0884 9.33301 10 9.33301H9.33333C9.24493 9.33301 9.16014 9.36812 9.09763 9.43064C9.03512 9.49315 9 9.57793 9 9.66634C9 9.75475 9.03512 9.83953 9.09763 9.90204C9.16014 9.96455 9.24493 9.99967 9.33333 9.99967Z" />
      <path d="M10.25 3.33301H13.75M12 1.58301V5.08301" />
    </Svg>
  );
}

export function TemplateIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </Svg>
  );
}

export function ExternalLinkIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 14v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5" />
    </Svg>
  );
}

export function BuildingIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <rect x="4" y="3" width="12" height="18" rx="1" />
      <path d="M8 7h4M8 11h4M8 15h4" />
      <path d="M16 10h4v11h-4" />
    </Svg>
  );
}

export function GlobeIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </Svg>
  );
}

export function ContactIcon({ size = 14 }) {
  return <UserIcon size={size} />;
}

export function ClockIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

export function WidgetsIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </Svg>
  );
}

export function PhoneIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
    </Svg>
  );
}

export function CopyIcon({ size = 14 }) {
  return (
    <Svg size={size}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </Svg>
  );
}

export function ImageIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </Svg>
  );
}

export function VideoIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <rect x="2" y="6" width="15" height="12" rx="2" />
      <path d="M22 8.5l-5 3.5 5 3.5v-7z" />
    </Svg>
  );
}

export function DocumentIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v5h5" />
    </Svg>
  );
}

export function LocationIcon({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  );
}

export function CloseIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  );
}

export function ArrowLeftIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Svg>
  );
}

export function StatusDotIcon({ size = 8, color = '#E96C28' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export function HiverLogoIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#276CF0" />
      <path d="M8 7v10M16 7v10M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </Svg>
  );
}

export function ListViewIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </Svg>
  );
}

export function SplitViewIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M12 4v16" />
    </Svg>
  );
}

export function BriefcaseIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M3 12h18" />
    </Svg>
  );
}

export function BoltIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M13 3L5 13h6l-1 8 8-11h-6l1-7z" />
    </Svg>
  );
}

export function QueueIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  );
}

export function BellIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" />
      <path d="M10 19a2 2 0 004 0" />
    </Svg>
  );
}

export function CustomersIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 6.5-5s6.5 2 6.5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 20c.3-2.3 2-4 4.5-4.3" />
    </Svg>
  );
}

export function AnalyticsIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M5 20V10M12 20V4M19 20v-7" />
    </Svg>
  );
}

export function SettingsIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 00-2-1.2L14.2 3H9.8l-.4 2.6a7 7 0 00-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 002-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" />
    </Svg>
  );
}

export function SlackIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="4" height="9" rx="2" fill="#36C5F0" />
      <rect x="13" y="9" width="4" height="9" rx="2" transform="rotate(90 13 9)" fill="#2EB67D" />
      <rect x="11" y="13" width="4" height="9" rx="2" fill="#ECB22E" />
      <rect x="7" y="13" width="4" height="9" rx="2" transform="rotate(90 7 13)" fill="#E01E5A" />
    </svg>
  );
}

export function ChatBubbleIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </Svg>
  );
}

// Returns the glyph for a Shared Inbox channel — used in the chat topbar,
// conversation-list avatar, etc. (swaps the WhatsApp logo per the design ask).
export function ChannelGlyph({ channel, size = 16 }) {
  if (channel === 'whatsapp') return <WhatsAppIcon size={size} />;
  if (channel === 'slack') return <SlackIcon size={size} />;
  if (channel === 'sms') return <HotIcon name="sms" size={size} />;
  if (channel === 'voice') return <HotIcon name="voice" size={size} />;
  return <ChatBubbleIcon size={size} />;
}

export function MailIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  );
}

export function SendIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </Svg>
  );
}

export function DraftIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 21l4-1 11-11-3-3L5 17l-1 4z" />
    </Svg>
  );
}

export function CircleIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}
