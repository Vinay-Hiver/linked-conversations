// Admin Panel navigation + page datasets.
// Structure mirrors the real Hiver app (from the saved HTML dumps): the
// Organization section is Users / Schedule / Settings.

import sharedInboxIcon from '../../assets/icons/admin/shared-inbox.svg';
import hiverAiIcon from '../../assets/icons/admin/hiver-ai.svg';
import knowledgeHubIcon from '../../assets/icons/admin/knowledge-hub.svg';
import helpCenterIcon from '../../assets/icons/admin/help-center.svg';
import webFormsIcon from '../../assets/icons/admin/web-forms.svg';
import customerPortalIcon from '../../assets/icons/admin/customer-portal.svg';
import customObjectsIcon from '../../assets/icons/admin/custom-objects.svg';
import appsIcon from '../../assets/icons/admin/apps.svg';
import developerIcon from '../../assets/icons/admin/developer.svg';
import usersIcon from '../../assets/icons/admin/users.svg';
import scheduleIcon from '../../assets/icons/admin/business-hours.svg';
import settingsIcon from '../../assets/icons/admin/settings.svg';

export const ADMIN_TOP_ITEM = { id: 'shared-inbox', label: 'Shared Inbox', icon: sharedInboxIcon };

export const ADMIN_SECTIONS = [
  {
    title: 'AI',
    items: [
      { id: 'hiver-ai', label: 'Hiver AI', icon: hiverAiIcon },
      { id: 'knowledge-hub', label: 'Knowledge Hub', icon: knowledgeHubIcon },
    ],
  },
  {
    title: 'Self service',
    items: [
      { id: 'help-center', label: 'Help Center', icon: helpCenterIcon },
      { id: 'web-forms', label: 'Web Forms', icon: webFormsIcon },
      { id: 'customer-portal', label: 'Customer Portal', icon: customerPortalIcon },
    ],
  },
  {
    title: 'Data & Integrations',
    items: [
      { id: 'custom-objects', label: 'Custom Objects', icon: customObjectsIcon },
      { id: 'apps', label: 'Apps', icon: appsIcon },
      { id: 'developer', label: 'Developer', icon: developerIcon },
    ],
  },
  {
    title: 'Organization',
    items: [
      { id: 'users', label: 'Users', icon: usersIcon },
      { id: 'schedule', label: 'Schedule', icon: scheduleIcon },
      { id: 'settings', label: 'Settings', icon: settingsIcon },
    ],
  },
];

// ---- Datasets (from the saved HTML dumps) ----

export const SHARED_INBOX_TABS = [
  'Email Inboxes', 'Slack Inboxes', 'Chat Inboxes', 'WhatsApp Inboxes', 'Voice Inboxes',
];

export const EMAIL_INBOXES = [
  { name: 'Accounts Recievables', email: 'accountsreceivable@hiverhq.co.in', type: 'Outlook User Account' },
  { name: 'Arunav Dosm01', email: 'arunav.dosm01@hiverhq.co.in', type: 'Outlook Shared Mailbox' },
  { name: 'Customer Success', email: 'ob.usm1@hiverhq.co.in', type: 'Outlook User Account', action: 'reauthorize' },
  { name: 'Devosm3', email: 'devosm3@hiverhq.co.in', type: 'Outlook Shared Mailbox' },
  { name: 'Latestdl', email: 'latestdl@hiverhq.co.in', type: 'Distribution List or Microsoft 365 Group', action: 'fix' },
  { name: 'Omni Group2', email: 'omni.group2@hiver.space', type: 'Google Group', action: 'fix' },
  { name: 'otherprovider.sm01', email: 'otherprovider.sm01@forwardingaccount.hiverhq.co.in', type: 'Forwarding Mailbox' },
  { name: 'scarlsdfsdfett', email: 'scarlsdfsdfett@hiverre.com', type: 'Forwarding Mailbox', action: 'complete' },
  { name: 'testingfordemo', email: 'testingfordemo@hiverhq.co.in', type: 'Forwarding Mailbox', action: 'complete' },
];

export const USERS = [
  { name: 'Abhay', email: 'abhay.ai@hiverhq.co.in', role: 'Admin' },
  { name: 'Abhishek P', email: 'abhishek@hiverhq.co.in', role: 'Inbox Admin' },
  { name: 'Aishwarya test sm 2', email: 'aishwaryatestsm@hot-demo.net', role: 'Admin' },
  { name: 'Akash M', email: 'akash@hiverhq.co.in', role: 'Admin' },
  { name: 'Akash Mishra', email: 'prem.akash1210@gmail.com', role: 'Member' },
  { name: 'akash.thecatalyst@gmail.com', email: 'akash.thecatalyst@gmail.com', role: 'Member', invited: true },
  { name: 'Akshaya s', email: 'akshaya.s@hiverhq.co.in', role: 'Admin' },
  { name: 'Aman M', email: 'aman.m@hot-demo.net', role: 'Admin' },
  { name: 'Amit Agarwal', email: 'amit.a@hiverhq.co.in', role: 'Admin' },
  { name: 'amitoj.c@hiverhq.co.in', email: 'amitoj.c@hiverhq.co.in', role: 'Admin', invited: true },
  { name: 'Amshika', email: 'anshika@hiverhq.co.in', role: 'Admin' },
  { name: 'Ankita T', email: 'ankita@hiverhq.co.in', role: 'Admin' },
  { name: 'Ankit Kanoria', email: 'ankit@grexit.com', role: 'Admin' },
  { name: 'Anurag M', email: 'anurag@hiverhq.co.in', role: 'Admin' },
  { name: 'Arun Nayak', email: 'arun.n@hiverhq.co.in', role: 'Admin' },
  { name: 'Ashuthosh Dubey', email: 'ashuthosh.d@grexit.com', role: 'Admin' },
];

export const WEB_FORMS = [
  { name: 'amans webformm', inbox: 'Customer Success', created: '21 May, 2026' },
  { name: 'AR', inbox: 'Accounts Recievables', created: '18 Jun, 2026' },
  { name: 'Contact us', inbox: 'Accounts Recievables', created: '08 May, 2026' },
  { name: 'Creating webform', inbox: 'Accounts Recievables', created: '25 May, 2026' },
  { name: 'Customer Support Request', inbox: 'Customer Success', created: '10 Jul, 2026' },
  { name: 'Default customer query form', inbox: 'Accounts Recievables', created: '03 Jul, 2026' },
  { name: 'Demo Form', inbox: 'Accounts Recievables', created: '08 Sep, 2026' },
  { name: 'final check', inbox: 'Devosm3', created: '04 Sep, 2026' },
  { name: 'Form 3', inbox: 'Accounts Recievables', created: '16 Jun, 2026' },
  { name: 'General Query', inbox: 'Accounts Recievables', created: '05 May, 2026' },
  { name: 'new form', inbox: 'Customer Success', created: '08 Jun, 2026' },
  { name: 'Onboarding requests', inbox: 'Accounts Recievables', created: '14 Aug, 2026' },
  { name: 'Report a bug', inbox: '20702', created: '10 May, 2026' },
  { name: 'Sales enquiry', inbox: 'Customer Success', created: '10 May, 2026' },
  { name: 'Submit feature request', inbox: 'Latestdl', created: '10 May, 2026' },
  { name: 'Test 1234', inbox: 'Accounts Recievables', created: '30 Jun, 2026' },
];

export const PORTALS = [
  { name: 'Test234', url: 'https://test234.portal.hiverhq.com', status: 'Portal' },
  { name: 'Praveen', url: 'https://praveen.portal.hiverhq.com', status: 'Portal' },
  { name: 'Acme1234', url: 'https://acme1234.portal.hiverhq.com', status: 'Portal' },
  { name: 'SWETHA123', url: 'https://swetha123.portal.hiverhq.com', status: 'Portal' },
  { name: 'SWETHA', url: 'https://swetha.portal.hiverhq.com', status: 'Portal' },
  { name: 'Inboxraider', url: 'https://inboxraider.portal.hiverhq.com', status: 'Portal' },
  { name: 'Workre', url: 'https://workre.portal.hiverhq.com', status: 'Portal' },
  { name: 'Untitled Draft', url: 'https://fbdfbhfd.dfjdf.com', status: 'Verification failed' },
  { name: 'Vertika', url: 'https://vertika.portal.hiverhq.com', status: 'Portal' },
  { name: 'Akashsupport', url: 'https://akashsupport.portal.hiverhq.com', status: 'Portal' },
  { name: 'Untitled Draft', url: 'https://www.hiversupport.com', status: 'Verification failed' },
  { name: 'Cp Test2', url: 'https://cp-test2.portal.hiverhq.com', status: 'Portal' },
  { name: 'Cp Test1', url: 'https://cp-test1.portal.hiverhq.com', status: 'Portal' },
  { name: 'Hooli Support', url: 'https://test123.portal.hiverhq.com', status: 'Portal' },
  { name: 'Hiver Support', url: 'https://hiverhq-co-in-1.portal.hiverhq.com', status: 'Portal' },
];

export const API_KEYS = [
  { name: 'Omni API Key', key: 'Qsjh...2MHF', created: 'Feb 26, 2026' },
  { name: 'Omni API Test', key: 'V1oA...eUnS', created: 'Feb 26, 2026' },
  { name: 'OMNI TEST', key: 'c1Kw...VCJZ', created: 'Feb 26, 2026' },
];

export const SETTINGS_TABS = ['Identity & Access', 'Deliverability', 'Plans & Billing', 'Account'];
