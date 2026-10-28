import { VOICE_INBOXES, voiceInboxTotal, voiceViewCount } from './voiceCalls';

// Dummy chat conversations per channel Shared Inbox, grouped by view
// (Unassigned / Assigned to Bot / Mine / All Assigned / Closed). Each view has
// a few conversations; the sidebar shows the per-view count and the inbox total.

export const CHANNEL_BY_INBOX = {
  'Chat Support 01': 'chat',
  'Chat Support 02': 'chat',
  'Slack Support 01': 'slack',
  'Slack Support 02': 'slack',
  'WhatsApp Support 01': 'whatsapp',
  'WhatsApp Support 02': 'whatsapp',
  'SMS Support 01': 'sms',
  'SMS Support 02': 'sms',
};

// Slack #channel chip per inbox.
const SLACK_CHANNEL = {
  'Slack Support 01': 'support',
  'Slack Support 02': 'escalations',
};

// The customer's first message in each conversation, per inbox (Unassigned first, then Mine).
const PREVIEWS_BY_INBOX = {
  'Chat Support 01': [
    'The chat widget is not loading on mobile',
    'Is the pro plan available monthly?',
    'Can we get a demo for our team next week?',
    'How do I reset my password?',
  ],
  'Chat Support 02': [
    'How do I export my reports to CSV?',
    'The dashboard filters are not saving',
    'Can I add a custom field to contacts?',
    'Where do I find the API keys?',
  ],
  'Slack Support 01': [
    'Our SSO login is failing for new users',
    'Can someone help us set up the Salesforce sync?',
    'We need two more seats added to our workspace',
    'Webhooks stopped firing since this morning',
  ],
  'Slack Support 02': [
    'URGENT: production dashboard is down for our team',
    'Data from last week is missing in reports',
    'Customer is threatening to churn over the outage',
    'Invoice shows the wrong plan, needs review today',
  ],
  'WhatsApp Support 01': [
    'Hi, I cannot log in to the app',
    'My payment failed but money was deducted',
    'How do I change my delivery address?',
    'Is there a warranty on this product?',
  ],
  'WhatsApp Support 02': [
    'Where is my order #48213?',
    'I received the wrong size, can I exchange it?',
    'Can I cancel my order placed today?',
    'The package arrived damaged',
  ],
  'SMS Support 01': [
    'Need help resetting my account PIN',
    'Please call me back about my ticket',
    'STOP sending promo messages',
    'Is the store open on Sunday?',
  ],
  'SMS Support 02': [
    'My delivery was marked done but I got nothing',
    'Can the driver leave it at the front desk?',
    'Reschedule my delivery to Friday please',
    'What time will the courier arrive?',
  ],
};

const NAMES = [
  'Priya Nair', 'Marcus Lee', 'Sofia Reyes', 'Daniel Kim', 'Grace Okafor',
  'Tom Becker', 'Hana Sato', 'Liam Walsh', 'Ava Patel', 'Noah Khan',
  'Arlene McCoy', 'Guy Hawkins', 'Courtney Henry', 'Darlene Robertson', 'Eleanor Pena',
  'Floyd Miles', 'Jerome Bell', 'Devon Lane', 'Kathryn Murphy', 'Jacob Jones',
  'Kristin Watson', 'Cody Fisher', 'Jane Cooper', 'Wade Warren', 'Esther Howard',
  'Leslie Alexander', 'Jenny Wilson', 'Robert Fox', 'Albert Flores', 'Bessie Cooper',
  'Ralph Edwards', 'Cameron Williamson', 'Brooklyn Simmons', 'Theresa Webb', 'Marvin McKinney',
  'Savannah Nguyen', 'Annette Black', 'Ronald Richards', 'Dianne Russell', 'Ralph Johnson',
];
const COLORS = ['#7b8bd4', '#d96d71', '#caaed1', '#98d2c5', '#e0b83a', '#8b7fd4', '#f19192'];
const PREVIEWS = [
  'Is the pro plan available monthly?',
  'The chat widget is not loading on mobile',
  'Can we get a demo for our team next week?',
  'Interested in upgrading to the enterprise tier',
  'Need help with account setup',
  'My order has been delayed, can you check?',
  'Following up on my previous ticket',
  'Thanks for the quick help earlier!',
  'How do I reset my password?',
  'Please rate the chat',
];
const DATES = ['Jul 23', 'Jul 22', 'Jul 21', 'Jul 20', 'Jul 19'];

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');

let globalNameIdx = 0;

const makeConvos = (inbox, channel, view, count, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const idx = globalNameIdx++;
    const name = NAMES[idx % NAMES.length];
    const preview = PREVIEWS_BY_INBOX[inbox]?.[offset + i] ?? PREVIEWS[idx % PREVIEWS.length];
    const color = COLORS[idx % COLORS.length];
    const date = DATES[idx % DATES.length];
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    const phone = `+1 (555) 01${(10 + (idx % 90)).toString().padStart(2, '0')}`;
    return {
      id: `${slug(inbox)}-${slug(view)}-${i}`,
      view,
      name,
      email,
      phone,
      title: name,
      avatarInitial: name.charAt(0),
      avatarColor: color,
      channel: SLACK_CHANNEL[inbox] || 'support',
      date,
      preview,
      messages: [
        { kind: 'incoming', text: preview, time: `${date}, 10:0${i + 1} AM` },
        { kind: 'agent-text', text: 'Sure, happy to help with that!', time: `${date}, 10:0${i + 2} AM`, sender: 'Arnold' },
      ],
    };
  });

const buildInbox = (inbox, channel) => {
  const views = [['Unassigned', 2], ['Mine', 2]];
  let out = [];
  views.forEach(([view, count]) => {
    out = out.concat(makeConvos(inbox, channel, view, count, out.length));
  });
  return out;
};

export const CHANNEL_CHATS = Object.fromEntries(
  Object.entries(CHANNEL_BY_INBOX).map(([inbox, channel]) => [inbox, buildInbox(inbox, channel)])
);

// Views that carry a conversation count in the sidebar.
const COUNTED_VIEWS = new Set(['Unassigned', 'Assigned to Bot', 'Mine', 'All Assigned', 'Closed']);
export const isCountedView = (view) => COUNTED_VIEWS.has(view);
export const channelViewCount = (inbox, view) =>
  VOICE_INBOXES.includes(inbox) ? voiceViewCount(inbox, view) : (CHANNEL_CHATS[inbox] || []).filter((c) => c.view === view).length;
export const channelInboxTotal = (inbox) => (VOICE_INBOXES.includes(inbox) ? voiceInboxTotal(inbox) : (CHANNEL_CHATS[inbox] || []).length);
