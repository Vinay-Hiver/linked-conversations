import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../components/Button';
import { Modal, ModalText } from '../../../components/Modal';
import './LinkConversationModal.css';
import '../modalMotion.css';
import { useModalExit } from '../modalMotion';

/** Confirms an unlink: the conversation leaves the whole group and is not deleted. */
export default function UnlinkConfirmModal({ onConfirm, onClose }) {
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
        <Modal
          title="Unlink conversation?"
          onClose={close}
          actions={(
            <>
              <Button variant="secondary" size="sm" onClick={close}>Cancel</Button>
              <Button variant="error" size="sm" onClick={() => exit(onConfirm)}>Unlink</Button>
            </>
          )}
        >
          {/* Says the unlink applies to the whole group (linked-conversations-context.md 5.2) */}
          <ModalText>This conversation will be unlinked from all conversations in this group. It won't be deleted.</ModalText>
        </Modal>
      </div>
    </div>,
    document.body
  );
}
