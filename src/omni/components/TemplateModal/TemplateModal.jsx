import { CloseIcon } from '../icons/Icon';
import TemplatePicker from './TemplatePicker';
import './TemplateModal.css';

export default function TemplateModal({ open, onClose, onSend }) {
  if (!open) return null;

  return (
    <div className="template-modal__overlay" onClick={onClose}>
      <div className="template-modal" onClick={(e) => e.stopPropagation()}>
        <div className="template-modal__header">
          <div className="template-modal__header-row">
            <p className="template-modal__title">Choose a WhatsApp template</p>
            <button type="button" className="template-modal__close" onClick={onClose}>
              <CloseIcon size={16} />
            </button>
          </div>
          <p className="template-modal__subtitle">
            Select a template on the left to preview and fill it. The customer sees it exactly as
            previewed.
          </p>
        </div>

        <TemplatePicker onSend={onSend} onDone={onClose} />
      </div>
    </div>
  );
}
