import React from 'react';
import { ChannelRightPanel, LinkedConversationsView } from '../../../patterns/RightPanel/ChannelRightPanel';
import { conversationById, iconFor } from '../../data/conversationIndex';
import { useLinkedConversations } from '../../LinkedConversations';
import { useCurrentUser } from '../../CurrentUser';
import LinkConversationModal, { CHANNEL_ICON } from './LinkConversationModal';
import UnlinkConfirmModal from './UnlinkConfirmModal';
import { useConversationViewer } from '../viewer/viewerContext';
import { useConversationFields } from '../../ConversationFields';

/**
 * The storybook right panel plus the link flow: "Link" opens the Link
 * conversations modal; linked conversations show as cards (two, then "View all",
 * which swaps the panel for the full list). Links are groups: unlinking removes a
 * conversation from the whole group, after a confirmation.
 */
export default function LinkedRightPanel({ conversationId, ...panelProps }) {
  const { linksOf, link, unlink } = useLinkedConversations();
  const { user } = useCurrentUser();
  const viewer = useConversationViewer();
  const { assigneeOf, assigneeNameOf, setAssignee, statusOf, setStatus } = useConversationFields();
  const [open, setOpen] = React.useState(false);
  const [viewAll, setViewAll] = React.useState(false);
  const [unlinking, setUnlinking] = React.useState(null); // id of the conversation to unlink
  const id = conversationId != null ? String(conversationId) : undefined;
  const linkedIds = id ? linksOf(id) : [];

  // Opening another conversation goes back to the normal panel.
  React.useEffect(() => setViewAll(false), [id]);

  const linkedConversations = linkedIds
    .map(conversationById)
    .filter(Boolean)
    .map((c) => ({
      id: c.id,
      name: c.name,
      subject: c.subject,
      date: c.date,
      // From the Status field of that conversation's right panel, so it updates when that changes.
      status: statusOf(c.id),
      // From the Assignee field of that conversation's right panel; no chip when it is None.
      assignee: assigneeNameOf(c.id),
      inbox: c.inbox,
      icon: iconFor(c, CHANNEL_ICON),
      ticketId: c.ticketId,
      restricted: !!user.hiddenInboxes?.includes(c.inbox),
      openable: viewer.canOpen(c.id),
    }));

  const openModal = id ? () => setOpen(true) : undefined;

  return (
    <>
      {viewAll ? (
        <LinkedConversationsView linked={linkedConversations} onBack={() => setViewAll(false)} onLinkClick={openModal} onUnlink={setUnlinking} onOpenConversation={viewer.open} />
      ) : (
        <ChannelRightPanel
          {...panelProps}
          conversationId={id}
          assignee={id ? assigneeOf(id) : undefined}
          onAssigneeChange={id ? (value) => setAssignee(id, value) : undefined}
          status={id ? statusOf(id) : undefined}
          onStatusChange={id ? (value) => setStatus(id, value) : undefined}
          onLinkClick={openModal}
          linkedConversations={linkedConversations}
          onViewAll={() => setViewAll(true)}
          onUnlink={setUnlinking}
          onOpenConversation={viewer.open}
        />
      )}
      {open && (
        <LinkConversationModal
          conversationId={id}
          inboxName={panelProps.inboxName}
          alreadyLinked={linkedIds}
          onClose={() => setOpen(false)}
          onLink={(ids) => { link(id, ids); setOpen(false); }}
        />
      )}
      {unlinking && (
        <UnlinkConfirmModal
          onClose={() => setUnlinking(null)}
          onConfirm={() => {
            unlink(unlinking);
            setUnlinking(null);
            // The view-all list closes once fewer than three are left to show.
            if (linkedIds.length - 1 <= 2) setViewAll(false);
          }}
        />
      )}
    </>
  );
}
