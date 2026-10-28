// WhatsApp template definitions — modeled from whatsapp-template-spec.md (15 templates).
//
// body.text / header.text use WhatsApp formatting markers (*bold* _italic_ ~strike~ ```mono```)
// and variable tokens: {{1}}/{{2}}/... (positional) or {{name}} (named). Exactly one format
// per template, never mixed. Unfilled variables render as a blue "[ Label ]" placeholder.
//
// header.type: 'text' | 'image' | 'video' | 'document' | 'location' | null
// buttons[].type: 'quick_reply' | 'url' | 'phone' | 'copy_code' | 'calling_permission'

export const TEMPLATES = [
  {
    id: '01_plain_body',
    name: '01_plain_body',
    category: 'MARKETING',
    status: 'APPROVED',
    header: null,
    body: {
      text: "Hello! This is a message from our customer support team. We're here to help with any questions about your account or orders. Feel free to reply to this message anytime and a member of our team will assist you.",
      variables: [],
    },
    footer: null,
    buttons: [],
  },
  {
    id: '02_body_with_variables_and_footer',
    name: '02_body_with_variables_and_footer',
    category: 'MARKETING',
    status: 'APPROVED',
    header: null,
    body: {
      text: 'Hello {{1}}, this is an update from the *Hiver team*. Your request _{{2}}_ has been updated to status *{{3}}*. You can reply to this message if you have any questions about this update.',
      variables: [
        { key: '1', label: 'Customer name', sample: 'Ron Swanson' },
        { key: '2', label: 'Request ID', sample: '#4521' },
        { key: '3', label: 'Status', sample: 'Resolved' },
      ],
    },
    footer: 'Sent by the Hiver team',
    buttons: [],
  },
  {
    id: '03_text_header_with_named_variables',
    name: '03_text_header_with_named_variables',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'text', text: 'Update on your request' },
    body: {
      text: 'Hello {{customer_name}}, the *Hiver team* has an update for you. Your request {{ticket_id}} was reviewed on {{review_date}} and our team has shared a response. Please check your conversation for the details.',
      variables: [
        { key: 'customer_name', label: 'Customer name', sample: 'Ron Swanson' },
        { key: 'ticket_id', label: 'Ticket ID', sample: '#4521' },
        { key: 'review_date', label: 'Review date', sample: '21 July' },
      ],
    },
    footer: null,
    buttons: [],
  },
  {
    id: '04_variable_in_text_header',
    name: '04_variable_in_text_header',
    category: 'MARKETING',
    status: 'APPROVED',
    header: {
      type: 'text',
      text: 'Update for request {{header_1}}',
      variable: { key: 'header_1', label: 'Request ID', sample: '#4521' },
    },
    body: {
      text: 'Hello, this is the *Hiver team*. We have shared an update on your request and it is ready for your review. Reply to this message if anything needs further attention.',
      variables: [],
    },
    footer: null,
    buttons: [],
  },
  {
    id: '05_image_header_with_url_button',
    name: '05_image_header_with_url_button',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'image' },
    body: {
      text: 'Hello! The *Hiver team* has shared a resource that may help with your recent request. You can view it using the button below, or reply here if you would like our team to walk you through it.',
      variables: [],
    },
    footer: null,
    buttons: [{ type: 'url', label: 'View resource', url: 'https://hiverhq.com/help', dynamic: false }],
  },
  {
    id: '06_video_header',
    name: '06_video_header',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'video' },
    body: {
      text: 'Hello! The Hiver team has prepared a short video walkthrough related to your recent request. Watch it above, and reply to this message if you have any questions after viewing it.',
      variables: [],
    },
    footer: null,
    buttons: [],
  },
  {
    id: '07_document_header',
    name: '07_document_header',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'document' },
    body: {
      text: 'Hello! The Hiver team has attached a document with the details of your recent request. Download it above and reply to this message if anything in the document needs clarification.',
      variables: [],
    },
    footer: null,
    buttons: [],
  },
  {
    id: '08_location_header_with_quick_reply',
    name: '08_location_header_with_quick_reply',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'location' },
    body: {
      text: 'Hello! The Hiver team has shared a location with you related to your recent request. Tap the map above to open it in your maps app. Let us know once you have found it.',
      variables: [],
    },
    footer: null,
    buttons: [{ type: 'quick_reply', label: 'Found it' }],
  },
  {
    id: '09_two_quick_replies_with_footer',
    name: '09_two_quick_replies_with_footer',
    category: 'MARKETING',
    status: 'APPROVED',
    header: null,
    body: {
      text: 'Hello! The Hiver team occasionally shares product updates and helpful resources over WhatsApp. Use the buttons below to tell us whether you would like to keep receiving these messages.',
      variables: [],
    },
    footer: 'You can change this preference anytime',
    buttons: [
      { type: 'quick_reply', label: 'Keep me updated' },
      { type: 'quick_reply', label: 'Unsubscribe' },
    ],
  },
  {
    id: '10_dynamic_url_and_phone_buttons',
    name: '10_dynamic_url_and_phone_buttons',
    category: 'MARKETING',
    status: 'APPROVED',
    header: null,
    body: {
      text: 'Hello {{customer_name}}, the Hiver team has an update on your request {{ticket_id}}. You can view the full details using the button below, or call us directly if you would like to discuss it.',
      variables: [
        { key: 'customer_name', label: 'Customer name', sample: 'Ron Swanson' },
        { key: 'ticket_id', label: 'Ticket ID', sample: '#4521' },
      ],
    },
    footer: null,
    buttons: [
      {
        type: 'url',
        label: 'View details',
        url: 'https://hiverhq.com/requests/',
        dynamic: true,
        sampleSuffix: '4521',
      },
      { type: 'phone', label: 'Call Hiver team', number: '+918012345678' },
    ],
  },
  {
    id: '11_coupon_copy_code_button',
    name: '11_coupon_copy_code_button',
    category: 'MARKETING',
    status: 'APPROVED',
    header: null,
    body: {
      text: 'Hello! As a thank you from the Hiver team, here is a discount code for your next renewal. Tap the button below to copy it, and apply it at checkout before it expires.',
      variables: [],
    },
    footer: null,
    buttons: [{ type: 'copy_code', label: 'Copy offer code', sample: 'HIVER20' }],
  },
  {
    id: '12_all_components_combined',
    name: '12_all_components_combined',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'image' },
    body: {
      text: 'Hello {{1}}, the *Hiver team* has published a new guide that relates to your request _{{2}}_. Take a look using the button below, or reply here and our team will help you directly.',
      variables: [
        { key: '1', label: 'Customer name', sample: 'Ron Swanson' },
        { key: '2', label: 'Request ID', sample: '#4521' },
      ],
    },
    footer: 'Sent by the Hiver team',
    buttons: [
      { type: 'quick_reply', label: 'Talk to the team' },
      { type: 'url', label: 'Read the guide', url: 'https://hiverhq.com/guides', dynamic: false },
    ],
  },
  {
    id: '13_utility_document_header_named_variables',
    name: '13_utility_document_header_named_variables',
    category: 'UTILITY',
    status: 'APPROVED',
    header: { type: 'document' },
    body: {
      text: 'Hello {{customer_name}}, your invoice {{invoice_number}} from the Hiver team is attached above as a PDF. Reply to this message if any detail on the invoice looks incorrect.',
      variables: [
        { key: 'customer_name', label: 'Customer name', sample: 'Ron Swanson' },
        { key: 'invoice_number', label: 'Invoice number', sample: 'INV-2041' },
      ],
    },
    footer: 'Sent by the Hiver team',
    buttons: [],
  },
  {
    id: '14_utility_variable_with_static_url_button',
    name: '14_utility_variable_with_static_url_button',
    category: 'UTILITY',
    status: 'APPROVED',
    header: null,
    body: {
      text: 'Hello, this is the Hiver team. Your account request {{1}} has been processed and the details are ready for your review. Use the button below to view the current status.',
      variables: [{ key: '1', label: 'Request ID', sample: '#4521' }],
    },
    footer: null,
    buttons: [{ type: 'url', label: 'View status', url: 'https://hiverhq.com/status', dynamic: false }],
  },
  {
    id: '15_calling_permission_request',
    name: '15_calling_permission_request',
    category: 'MARKETING',
    status: 'APPROVED',
    header: { type: 'text', text: 'Call from the Hiver team' },
    body: {
      text: 'Hello {{1}}, the Hiver team would like to call you on WhatsApp to resolve your recent request faster. Please use the option below to let us know if that is okay.',
      variables: [{ key: '1', label: 'Customer name', sample: 'Ron Swanson' }],
    },
    footer: 'You can withdraw this permission anytime',
    buttons: [],
  },
];

export function getVariableCount(template) {
  return template.body.variables.length + (template.header?.variable ? 1 : 0);
}

// Derives the exact set of send-time input slots for a template (spec section 1.5):
// one field per dynamic component, none for static components.
export function getSendTimeSlots(template) {
  const slots = [];

  if (template.header?.type === 'text' && template.header.variable) {
    // Unprefixed: this key must match header.variable.key exactly so the preview's
    // variable substitution (keyed by variable.key) picks it up directly.
    slots.push({
      key: template.header.variable.key,
      label: template.header.variable.label,
      placeholder: template.header.variable.sample,
    });
  } else if (template.header?.type === 'image') {
    slots.push({ key: 'header.media', label: 'Image', kind: 'file' });
  } else if (template.header?.type === 'video') {
    slots.push({ key: 'header.media', label: 'Video', kind: 'file' });
  } else if (template.header?.type === 'document') {
    slots.push({ key: 'header.media', label: 'Document', kind: 'file' });
    slots.push({ key: 'header.filename', label: 'Filename', placeholder: 'e.g. invoice.pdf' });
  } else if (template.header?.type === 'location') {
    slots.push({ key: 'location.lat', label: 'Latitude', placeholder: 'e.g. 12.9716' });
    slots.push({ key: 'location.lng', label: 'Longitude', placeholder: 'e.g. 77.5946' });
    slots.push({ key: 'location.name', label: 'Location name', placeholder: 'e.g. Hiver Office' });
    slots.push({ key: 'location.address', label: 'Address', placeholder: 'Street, city' });
  }

  template.body.variables.forEach((v) => {
    // Unprefixed: must match v.key exactly for the same reason as above.
    slots.push({ key: v.key, label: v.label, placeholder: v.sample });
  });

  template.buttons.forEach((btn, i) => {
    if (btn.type === 'url' && btn.dynamic) {
      slots.push({
        key: `button.${i}.suffix`,
        label: `${btn.label} — URL suffix`,
        placeholder: btn.sampleSuffix,
      });
    }
    if (btn.type === 'copy_code') {
      slots.push({
        key: `button.${i}.code`,
        label: `${btn.label} — code`,
        placeholder: btn.sample,
      });
    }
  });

  return slots;
}
