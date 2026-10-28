import React from 'react';

// The people you can view the prototype as. Michael's view is the default.
// Jim's view is a replica of Michael's, except that Jim is not a member of some
// inboxes (`hiddenInboxes`, 4 of the 12, at least one left per channel).
export const USERS = [
  { id: 'michael', name: 'Michael Scott', email: 'michael.scott@hiverhq.co.in', color: 'red', hiddenInboxes: [] },
  {
    id: 'jim',
    name: 'Jim Halpert',
    email: 'jim.halpert@hiverhq.co.in',
    color: 'lightBlue',
    hiddenInboxes: ['Product Help Chat', 'WhatsApp Support', 'Billing Hotline', 'Email Support'],
  },
];

const CurrentUserContext = React.createContext({ user: USERS[0], switchUser: () => {} });

export const useCurrentUser = () => React.useContext(CurrentUserContext);

export function CurrentUserProvider({ children }) {
  const [userId, setUserId] = React.useState(USERS[0].id);
  const user = USERS.find((u) => u.id === userId) || USERS[0];
  const value = React.useMemo(() => ({ user, switchUser: setUserId }), [user]);
  return (
    <CurrentUserContext.Provider value={value}>
      {/* Keyed by user, so switching enters that person's view fresh (selection, open sections, etc. reset). */}
      <React.Fragment key={user.id}>{children}</React.Fragment>
    </CurrentUserContext.Provider>
  );
}
