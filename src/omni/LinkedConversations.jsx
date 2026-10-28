import React from 'react';

// Linked conversations are groups (linked-conversations-context.md, 5.2):
// - Listed newest link first (conversations linked together keep the order they were ticked in).
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
  // Each group is an array of conversation ids.
  const [groups, setGroups] = React.useState([]);
  // When each conversation joined its group: the link action it came in (higher = newer) and its
  // position in that action (the order it was ticked in the modal).
  const [linkedAt, setLinkedAt] = React.useState({});
  const batch = React.useRef(0);

  const value = React.useMemo(() => {
    const groupOf = (id) => groups.find((g) => g.includes(String(id))) || [];
    // Newest link first; conversations linked together keep the order they were ticked in.
    const newestFirst = (a, b) => {
      const x = linkedAt[a] || { batch: 0, index: 0 };
      const y = linkedAt[b] || { batch: 0, index: 0 };
      return y.batch - x.batch || x.index - y.index;
    };
    return {
      /** Every conversation in this one's group. */
      groupOf,
      /** The other conversations in this one's group, newest link first. */
      linksOf: (id) => groupOf(id).filter((x) => x !== String(id)).sort(newestFirst),
      /** Links `id` and `otherIds`: their groups (if any) merge into one. */
      link: (id, otherIds) => {
        const anchor = String(id);
        const others = otherIds.map(String);
        const n = ++batch.current;
        setLinkedAt((prev) => {
          const next = { ...prev };
          // The open conversation joins in this action too, unless it was already linked.
          if (!next[anchor]) next[anchor] = { batch: n, index: -1 };
          others.forEach((x, index) => { if (!next[x]) next[x] = { batch: n, index }; });
          return next;
        });
        setGroups((prev) => {
          const ids = [anchor, ...others];
          const touched = prev.filter((g) => g.some((x) => ids.includes(x)));
          const merged = [];
          [...touched.flat(), ...ids].forEach((x) => { if (!merged.includes(x)) merged.push(x); });
          return [...prev.filter((g) => !touched.includes(g)), merged];
        });
      },
      /** Removes `id` from its group; the rest of the group stays linked. */
      unlink: (id) => {
        setGroups((prev) => {
          const next = prev.map((g) => g.filter((x) => x !== String(id))).filter((g) => g.length > 1);
          // Anyone left alone by this unlink no longer has a link time.
          const stillLinked = new Set(next.flat());
          setLinkedAt((times) => Object.fromEntries(Object.entries(times).filter(([x]) => stillLinked.has(x))));
          return next;
        });
      },
    };
  }, [groups, linkedAt]);

  return <LinkedConversationsContext.Provider value={value}>{children}</LinkedConversationsContext.Provider>;
}
