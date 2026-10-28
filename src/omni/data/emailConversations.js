// Dummy email conversations for the Email Shared Inboxes (moved out of App.jsx so
// the link-conversation search can index them).
export const conversationsData = [
  // --- Email: Mine (2) ---
  {
    id: 1,
    inbox: 'Email Support',
    type: 'Mine',
    sender: 'John Smith',
    initial: 'J',
    avatarColor: 'var(--pastelRedBorderDefault)',
    time: 'Feb 4, 02:45 PM',
    subject: 'Issue with the app',
    preview: 'I am seeing a blank screen after login.',
    threadCount: 3,
    messages: [
      {
        id: 'm1',
        sender: 'John Smith',
        email: 'john.smith@gmail.com',
        time: 'Feb 4, 01:20 PM',
        initial: 'J',
        avatarColor: 'var(--pastelRedBorderDefault)',
        body: 'Hi Support,\n\nI am experiencing a blank screen after logging in to the mobile app. Can you please help?'
      },
      {
        id: 'm2',
        sender: 'Ruben Geidt',
        email: 'ruben@acme.com',
        time: 'Feb 4, 02:00 PM',
        initial: 'R',
        avatarColor: 'var(--pastelLightBlueBorderDefault)',
        body: 'Hello John,\n\nI am looking into this. Could you let me know which device you are using?'
      },
      {
        id: 'm3',
        sender: 'John Smith',
        email: 'john.smith@gmail.com',
        time: 'Feb 4, 02:45 PM',
        initial: 'J',
        avatarColor: 'var(--pastelRedBorderDefault)',
        body: 'I am using an iPhone 15 Pro with the latest iOS update.'
      }
    ]
  },
  {
    id: 2,
    ticketId: 'TKT#3', // a ticket: email conversation with the ticket right panel
    inbox: 'Email Support',
    type: 'Mine',
    sender: 'Alice Johnson',
    initial: 'A',
    avatarColor: 'var(--pastelVioletBorderDefault)',
    time: 'Feb 4, 11:30 AM',
    subject: 'Refund status',
    preview: 'Has the refund been processed yet?',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'Alice Johnson',
        email: 'alice.j@outlook.com',
        time: 'Feb 4, 10:00 AM',
        initial: 'A',
        avatarColor: 'var(--pastelVioletBorderDefault)',
        body: 'Hello,\n\nI requested a refund last week but haven\'t seen it in my account yet. Any updates?'
      },
      {
        id: 'm2',
        sender: 'Ruben Geidt',
        email: 'ruben@acme.com',
        time: 'Feb 4, 11:30 AM',
        initial: 'R',
        avatarColor: 'var(--pastelLightBlueBorderDefault)',
        body: 'Hi Alice,\n\nI\'ve checked the status and the refund was approved yesterday. It should appear in your account within 3-5 business days.'
      }
    ]
  },

  // --- Email: Unassigned (2) ---
  {
    id: 4,
    inbox: 'Email Support',
    type: 'Unassigned',
    sender: 'Emily Watson',
    initial: 'E',
    avatarColor: 'var(--pastelOrangeSurfaceDefault)',
    time: 'Feb 4, 05:10 PM',
    subject: 'Billing inquiry',
    preview: 'Why was I charged twice this month?',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'Emily Watson',
        email: 'emily.w@designcorp.com',
        time: 'Feb 4, 04:00 PM',
        initial: 'E',
        avatarColor: 'var(--pastelOrangeSurfaceDefault)',
        body: 'Hi,\n\nI noticed two separate charges from your service on my bank statement this morning. Can you please explain why?'
      },
      {
        id: 'm2',
        sender: 'System Bot',
        email: 'no-reply@acme.com',
        time: 'Feb 4, 04:05 PM',
        initial: 'S',
        avatarColor: '#94a3b8',
        body: 'Thank you for your inquiry. A support representative will be with you shortly to look into this billing discrepancy.'
      }
    ]
  },
  {
    id: 5,
    ticketId: 'TKT#7', // a ticket: email conversation with the ticket right panel
    inbox: 'Email Support',
    type: 'Unassigned',
    sender: 'David Chen',
    initial: 'D',
    avatarColor: 'var(--pastelPurpleTextBody)',
    time: 'Feb 4, 01:20 PM',
    subject: 'API documentation question',
    preview: 'How do I authenticate with the latest version?',
    threadCount: 3,
    messages: [
      {
        id: 'm1',
        sender: 'David Chen',
        email: 'david.chen@tech.io',
        time: 'Feb 4, 10:00 AM',
        initial: 'D',
        avatarColor: 'var(--pastelPurpleTextBody)',
        body: 'Hello,\n\nI\'m migrating to version 2 of your API but I\'m getting an auth error. The docs seem to only cover version 1.'
      },
      {
        id: 'm2',
        sender: 'Support Bot',
        email: 'support-bot@acme.com',
        time: 'Feb 4, 10:05 AM',
        initial: 'S',
        avatarColor: '#94a3b8',
        body: 'We have received your message. A technical support specialist will review your inquiry about API v2 authentication.'
      },
      {
        id: 'm3',
        sender: 'David Chen',
        email: 'david.chen@tech.io',
        time: 'Feb 4, 01:20 PM',
        initial: 'D',
        avatarColor: 'var(--pastelPurpleTextBody)',
        body: 'Any update on this? I\'m currently blocked on my development task.'
      }
    ]
  },

  // --- Billing & Refunds: Mine (2) ---
  {
    id: 21,
    inbox: 'Billing & Refunds',
    type: 'Mine',
    sender: 'George Baker',
    initial: 'G',
    avatarColor: 'var(--pastelVioletTextBody)',
    time: 'Feb 4, 10:20 AM',
    subject: 'Double charge refund',
    preview: 'I see a duplicate charge on my statement.',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'George Baker',
        email: 'george@baker.com',
        time: 'Feb 4, 09:00 AM',
        initial: 'G',
        avatarColor: 'var(--pastelVioletTextBody)',
        body: 'Hello,\n\nI was charged twice for my subscription this month. Can you please refund the second one?'
      },
      {
        id: 'm2',
        sender: 'Ruben Geidt',
        email: 'ruben@acme.com',
        time: 'Feb 4, 10:20 AM',
        initial: 'R',
        avatarColor: 'var(--pastelLightBlueBorderDefault)',
        body: 'Hi George,\n\nI\'ve processed the refund for the duplicate charge. It should reach your account in 3-5 days.'
      }
    ]
  },
  {
    id: 22,
    ticketId: 'TKT#12', // a ticket: email conversation with the ticket right panel
    inbox: 'Billing & Refunds',
    type: 'Mine',
    sender: 'Emma Stone',
    initial: 'E',
    avatarColor: 'var(--pastelPurpleTextBody)',
    time: 'Feb 3, 04:15 PM',
    subject: 'Return shipping refund',
    preview: 'Can I get a refund for the return labels?',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'Emma Stone',
        email: 'emma@stone.com',
        time: 'Feb 3, 02:00 PM',
        initial: 'E',
        avatarColor: 'var(--pastelPurpleTextBody)',
        body: 'Hi,\n\nI had to pay for return shipping because the item was faulty. Can this be reimbursed?'
      },
      {
        id: 'm2',
        sender: 'Ruben Geidt',
        email: 'ruben@acme.com',
        time: 'Feb 3, 04:15 PM',
        initial: 'R',
        avatarColor: 'var(--pastelLightBlueBorderDefault)',
        body: 'Yes Emma. Please upload the receipt and I will issue a credit to your account.'
      }
    ]
  },

  // --- Billing & Refunds: Unassigned (2) ---
  {
    id: 23,
    inbox: 'Billing & Refunds',
    type: 'Unassigned',
    sender: 'Customer Care',
    initial: 'C',
    avatarColor: 'var(--pastelGreenBorderDefault)',
    time: 'Feb 4, 11:00 AM',
    subject: 'Escalated refund request',
    preview: 'Customer is unhappy with the product.',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'Customer Care',
        email: 'care@acme.com',
        time: 'Feb 4, 08:30 AM',
        initial: 'C',
        avatarColor: 'var(--pastelGreenBorderDefault)',
        body: 'Team,\n\nCustomer #9928 wants a full refund. They say the item doesn\'t match the description. Please review.'
      },
      {
        id: 'm2',
        sender: 'Refund Bot',
        email: 'refunds@acme.com',
        time: 'Feb 4, 08:35 AM',
        initial: 'R',
        avatarColor: '#94a3b8',
        body: 'Request received. Analyzing product return history.'
      }
    ]
  },
  {
    id: 24,
    ticketId: 'TKT#15', // a ticket: email conversation with the ticket right panel
    inbox: 'Billing & Refunds',
    type: 'Unassigned',
    sender: 'Liam Neeson',
    initial: 'L',
    avatarColor: 'var(--pastelLightBlueTextBody)',
    time: 'Feb 4, 03:20 PM',
    subject: 'Membership cancellation refund',
    preview: 'I want a pro-rated refund for my annual plan.',
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'Liam Neeson',
        email: 'liam@neeson.com',
        time: 'Feb 4, 01:00 PM',
        initial: 'L',
        avatarColor: 'var(--pastelLightBlueTextBody)',
        body: 'Hi,\n\nI am cancelling my service halfway through the year. I\'d like a refund for the remaining 6 months.'
      },
      {
        id: 'm2',
        sender: 'System Bot',
        email: 'support@acme.com',
        time: 'Feb 4, 01:05 PM',
        initial: 'S',
        avatarColor: '#94a3b8',
        body: 'Your cancellation and refund request has been logged.'
      }
    ]
  },

  // --- More tickets: 3 per Email inbox ---
  {
    id: 31,
    ticketId: 'TKT#18', // a ticket: email conversation with the ticket right panel
    inbox: "Email Support",
    type: "Mine",
    sender: "Nina Patel",
    initial: "N",
    avatarColor: "var(--pastelGreenBorderDefault)",
    time: "Feb 4, 03:05 PM",
    subject: "Export to CSV fails",
    preview: "The CSV export stops at 1,000 rows.",
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: "Nina Patel",
        email: "nina.patel@brightlane.io",
        time: "Feb 4, 03:05 PM",
        initial: "N",
        avatarColor: "var(--pastelGreenBorderDefault)",
        body: "Hi Support,\n\nWhen I export our contacts to CSV, the file stops at 1,000 rows. We have around 4,200 contacts. Is there a limit?"
      },
      {
        id: 'm2',
        sender: "Ruben Geidt",
        email: "ruben@acme.com",
        time: "Feb 4, 03:05 PM",
        initial: "R",
        avatarColor: "var(--pastelLightBlueBorderDefault)",
        body: "Hi Nina,\n\nThanks for flagging this. I have raised a ticket with engineering and will update you as soon as the fix is out."
      }
    ]
  },
  {
    id: 32,
    ticketId: 'TKT#21', // a ticket: email conversation with the ticket right panel
    inbox: "Email Support",
    type: "Mine",
    sender: "Omar Haddad",
    initial: "O",
    avatarColor: "var(--pastelOrangeBorderDefault)",
    time: "Feb 3, 05:40 PM",
    subject: "Two-factor codes not arriving",
    preview: "I am not receiving the 2FA codes by SMS.",
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: "Omar Haddad",
        email: "omar@haddadlabs.com",
        time: "Feb 3, 05:40 PM",
        initial: "O",
        avatarColor: "var(--pastelOrangeBorderDefault)",
        body: "Hello,\n\nSince yesterday I am not receiving two-factor codes by SMS, so I cannot sign in. My number has not changed."
      },
      {
        id: 'm2',
        sender: "Ruben Geidt",
        email: "ruben@acme.com",
        time: "Feb 3, 05:40 PM",
        initial: "R",
        avatarColor: "var(--pastelLightBlueBorderDefault)",
        body: "Hi Omar,\n\nI have switched your account to email-based codes for now so you can sign in. We are checking the SMS provider."
      }
    ]
  },
  {
    id: 33,
    ticketId: 'TKT#24', // a ticket: email conversation with the ticket right panel
    inbox: "Email Support",
    type: "Unassigned",
    sender: "Clara Jensen",
    initial: "C",
    avatarColor: "var(--pastelVioletBorderDefault)",
    time: "Feb 4, 09:12 AM",
    subject: "Dashboard loads very slowly",
    preview: "The analytics dashboard takes over a minute to load.",
    threadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: "Clara Jensen",
        email: "clara.jensen@northpeak.co",
        time: "Feb 4, 09:12 AM",
        initial: "C",
        avatarColor: "var(--pastelVioletBorderDefault)",
        body: "Hi,\n\nOur analytics dashboard takes more than a minute to load every morning. It was fast last week. Can you take a look?"
      }
    ]
  },
  {
    id: 34,
    ticketId: 'TKT#27', // a ticket: email conversation with the ticket right panel
    inbox: "Billing & Refunds",
    type: "Mine",
    sender: "Hugo Martins",
    initial: "H",
    avatarColor: "var(--pastelPurpleBorderDefault)",
    time: "Feb 4, 02:30 PM",
    subject: "Invoice address is wrong",
    preview: "Our invoices still show our old office address.",
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: "Hugo Martins",
        email: "hugo@martinsco.com",
        time: "Feb 4, 02:30 PM",
        initial: "H",
        avatarColor: "var(--pastelPurpleBorderDefault)",
        body: "Hello,\n\nOur last three invoices still show our old office address. We updated it in settings in January. Can you reissue them?"
      },
      {
        id: 'm2',
        sender: "Ruben Geidt",
        email: "ruben@acme.com",
        time: "Feb 4, 02:30 PM",
        initial: "R",
        avatarColor: "var(--pastelLightBlueBorderDefault)",
        body: "Hi Hugo,\n\nI have corrected the billing address and reissued the three invoices. You should have them in your inbox now."
      }
    ]
  },
  {
    id: 35,
    ticketId: 'TKT#30', // a ticket: email conversation with the ticket right panel
    inbox: "Billing & Refunds",
    type: "Mine",
    sender: "Priya Raman",
    initial: "P",
    avatarColor: "var(--pastelRedBorderDefault)",
    time: "Feb 3, 01:15 PM",
    subject: "Charged after cancelling",
    preview: "I cancelled last month but was charged again.",
    threadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: "Priya Raman",
        email: "priya.raman@corvid.ai",
        time: "Feb 3, 01:15 PM",
        initial: "P",
        avatarColor: "var(--pastelRedBorderDefault)",
        body: "Hi,\n\nI cancelled our subscription on January 12, but we were charged again on February 1. Please refund this charge."
      },
      {
        id: 'm2',
        sender: "Ruben Geidt",
        email: "ruben@acme.com",
        time: "Feb 3, 01:15 PM",
        initial: "R",
        avatarColor: "var(--pastelLightBlueBorderDefault)",
        body: "Hi Priya,\n\nYou are right, the cancellation did not go through. I have refunded the February charge and closed the subscription."
      }
    ]
  },
  {
    id: 36,
    ticketId: 'TKT#33', // a ticket: email conversation with the ticket right panel
    inbox: "Billing & Refunds",
    type: "Unassigned",
    sender: "Sam Okoro",
    initial: "S",
    avatarColor: "var(--pastelLightBlueBorderDefault)",
    time: "Feb 4, 11:48 AM",
    subject: "Need a VAT invoice",
    preview: "We need invoices with our VAT number on them.",
    threadCount: 1,
    messages: [
      {
        id: 'm1',
        sender: "Sam Okoro",
        email: "sam.okoro@tidewater.org",
        time: "Feb 4, 11:48 AM",
        initial: "S",
        avatarColor: "var(--pastelLightBlueBorderDefault)",
        body: "Hello,\n\nOur finance team needs invoices that include our VAT number. Could you add it to our account and resend January's invoice?"
      }
    ]
  }
];
