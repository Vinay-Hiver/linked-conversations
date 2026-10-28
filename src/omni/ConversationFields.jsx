import React from 'react';
import { sampleAssignees } from '../patterns/RightPanel/data/options';
import { conversationById } from './data/conversationIndex';

// Each conversation's Assignee and Status, as set in the top section of its right panel.
// One value per conversation: the right panel shows and edits it, and linked conversation
// cards and link search results read it, so they always match the conversation.
// Shared by every user (it sits above CurrentUserProvider): these are data, not per-viewer settings.
//
// Starting values: Unassigned conversations have no assignee ("none"), everything else belongs to
// the first person in the list (Michael Scott). Conversations in a Closed view start Closed, the rest Open.

const NONE = 'none';

const ConversationFieldsContext = React.createContext({
  assigneeOf: () => NONE,
  assigneeNameOf: () => undefined,
  setAssignee: () => {},
  statusOf: () => 'open',
  setStatus: () => {},
});

export const useConversationFields = () => React.useContext(ConversationFieldsContext);

const defaultAssignee = (id) => (conversationById(id)?.view === 'Unassigned' ? NONE : sampleAssignees[0].value);
const defaultStatus = (id) => (conversationById(id)?.view === 'Closed' ? 'closed' : 'open');

export function ConversationFieldsProvider({ children }) {
  const [assignees, setAssignees] = React.useState({}); // id -> assignee value, once changed
  const [statuses, setStatuses] = React.useState({}); // id -> 'open' | 'pending' | 'closed', once changed

  const value = React.useMemo(() => {
    const assigneeOf = (id) => assignees[String(id)] ?? defaultAssignee(id);
    return {
      /** The assignee's value (`none` when unassigned). */
      assigneeOf,
      /** The assignee's name without "(Me)", or undefined when unassigned. */
      assigneeNameOf: (id) => {
        const person = sampleAssignees.find((p) => p.value === assigneeOf(id));
        return person ? person.label.replace(/ \(Me\)$/, '') : undefined;
      },
      setAssignee: (id, next) => setAssignees((prev) => ({ ...prev, [String(id)]: next })),
      /** The status: open, pending or closed. */
      statusOf: (id) => statuses[String(id)] ?? defaultStatus(id),
      setStatus: (id, next) => setStatuses((prev) => ({ ...prev, [String(id)]: next })),
    };
  }, [assignees, statuses]);

  return <ConversationFieldsContext.Provider value={value}>{children}</ConversationFieldsContext.Provider>;
}
