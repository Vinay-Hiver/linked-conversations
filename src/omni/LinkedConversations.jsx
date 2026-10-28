import React from 'react';

// Linked conversations are groups (linked-conversations-context.md, 5.2):
// - Bidirectional and transitive: link E1→E3, then E3→E2, and all three are one
//   group. Opening any of them lists the other two.
// - Unlink acts on the group: unlinking E2 removes it from the whole group, and
//   E1 and E3 stay linked. A group of one is dissolved.
// Shared by every user (it sits above CurrentUserProvider): links Michael makes show in Jim's view too.

const LinkedConversationsContext = React.createContext({
  linksOf: () => [],
  groupOf: () => [],
  link: () => {},
  unlink: () => {},
});

export const useLinkedConversations = () => React.useContext(LinkedConversationsContext);

export function LinkedConversationsProvider({ children }) {
  // Each group is an ordered array of conversation ids (in the order they were linked).
  const [groups, setGroups] = React.useState([]);

  const value = React.useMemo(() => {
    const groupOf = (id) => groups.find((g) => g.includes(String(id))) || [];
    return {
      /** Every conversation in this one's group. */
      groupOf,
      /** The other conversations in this one's group. */
      linksOf: (id) => groupOf(id).filter((x) => x !== String(id)),
      /** Links `id` and `otherIds`: their groups (if any) merge into one. */
      link: (id, otherIds) => setGroups((prev) => {
        const ids = [String(id), ...otherIds.map(String)];
        const touched = prev.filter((g) => g.some((x) => ids.includes(x)));
        const merged = [];
        [...touched.flat(), ...ids].forEach((x) => { if (!merged.includes(x)) merged.push(x); });
        return [...prev.filter((g) => !touched.includes(g)), merged];
      }),
      /** Removes `id` from its group; the rest of the group stays linked. */
      unlink: (id) => setGroups((prev) => prev
        .map((g) => g.filter((x) => x !== String(id)))
        .filter((g) => g.length > 1)),
    };
  }, [groups]);

  return <LinkedConversationsContext.Provider value={value}>{children}</LinkedConversationsContext.Provider>;
}
