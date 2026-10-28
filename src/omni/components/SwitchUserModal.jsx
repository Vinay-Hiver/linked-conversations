import React from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../../components/Modal';
import { ListAvatar, ListItem } from '../../components/List';
import { USERS, useCurrentUser } from '../CurrentUser';
import './link/LinkConversationModal.css';
import './modalMotion.css';
import { useModalExit } from './modalMotion';

// The HOT Modal has no backdrop of its own; this uses the same dimmed, centred backdrop as the link modals.

/** Lists the people you can view the prototype as; picking one enters their view. */
export default function SwitchUserModal({ onClose }) {
  const { user, switchUser } = useCurrentUser();
  const [closing, exit] = useModalExit();
  const close = () => exit(onClose);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  return createPortal(
    <div className={`lc-backdrop${closing ? ' is-closing' : ''}`} onClick={close}>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal title="Switch user" onClose={close}>
          {USERS.map((u) => (
            <ListItem
              key={u.id}
              label={u.name}
              description={u.email}
              leading={<ListAvatar initial={u.name.charAt(0)} color={u.color} />}
              rightElement={u.id === user.id}
              trailing="check"
              onClick={() => {
                exit(() => {
                  onClose();
                  if (u.id !== user.id) switchUser(u.id);
                });
              }}
            />
          ))}
        </Modal>
      </div>
    </div>,
    document.body
  );
}
